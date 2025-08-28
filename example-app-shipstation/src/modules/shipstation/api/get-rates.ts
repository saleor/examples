// Generated based on the ShipStation API documentation:

import { z } from "zod";
import { ShipStationApiClient } from "./shipstation-api-client";
import { createLogger } from "../../../lib/logger";
import { Dimensions, Weight } from "../types";

// https://www.shipstation.com/docs/api/shipments/get-rates/
export type GetRatesRequest = {
  /**  Returns rates for the specified carrier. */
  carrierCode: string;
  /** Returns rates for the specified shipping service. */
  serviceCode?: any;
  /** Returns rates for the specified package type. */
  packageCode?: any;
  /** Originating postal code. */
  fromPostalCode: string;
  /** Originating city. */
  fromCity?: string;
  /** Originating state. */
  fromState?: string;
  /**
   * Originating warehouse ID.
   * The fromCity and fromState fields will take precedence over the fromWarehouseId field if all three are entered.
   */
  fromWarehouseId?: string;
  /** Destination State/Province. Please use two-character state/province abbreviation */
  toState?: string;
  /** Destination Country. Please use the two-letter ISO Origin Country code. */
  toCountry: string;
  /** Destination Postal Code. */
  toPostalCode: string;
  /** Destination City. */
  toCity?: string;
  /** Weight of the order. */
  weight: Weight;
  /** Dimensions of the order. */
  dimensions?: Dimensions;
  /** The type of delivery confirmation that is to be used once the shipment is created.
   * Possible values: none, delivery, signature, adult_signature, and direct_signature. The option for direct_signature is available for FedEx only.
   */
  confirmation?: string;
  /** Carriers may return different rates based on whether or not the address is commercial (false) or residential (true). Default value: false */
  residential?: boolean;
};

const shipStationRateSchema = z.object({
  serviceCode: z.string(),
  serviceName: z.string(),
  shipmentCost: z.number(),
  otherCost: z.number(),
});

const getRatesResponseSchema = z.array(shipStationRateSchema);

export type GetRatesResponse = z.infer<typeof getRatesResponseSchema>;

export class GetRatesClient {
  private logger = createLogger("GetRatesClient");
  constructor(private apiClient: ShipStationApiClient) {}

  async getRates(input: GetRatesRequest) {
    try {
      this.logger.debug({ input }, "Getting rates with following input: ");
      const response = await this.apiClient.query("/shipments/getrates", {
        method: "POST",
        body: input,
      });

      const parseResult = getRatesResponseSchema.safeParse(response);

      if (!parseResult.success) {
        this.logger.warn(
          { json: response },
          "Failed to provide detailed error message from ShipStation API."
        );

        throw new Error("The response from ShipStation API is in unexpected shape.");
      }

      return parseResult.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Failed to get rates for carrier code: ${input.carrierCode}. ${error.message}`
        );
      }

      throw error;
    }
  }
}
