import { CheckoutLineFragment } from "../generated/graphql";
import { createLogger } from "./lib/logger";
import { SaleorShippingMethod } from "./lib/types";
import { GetRatesClient } from "./modules/shipstation/api/get-rates";
import { ShipStationApiClient } from "./modules/shipstation/api/shipstation-api-client";
import { saleorToShipstation } from "./modules/shipstation/saleor-to-shipstation";
import { shipstationToSaleor } from "./modules/shipstation/shipstation-to-saleor";

export class CheckoutShippingMethodService {
  private logger = createLogger("CheckoutShippingMethodService");
  constructor(private apiClient: ShipStationApiClient) {}

  /**
   * Get shipping methods for a checkout
   * @param toCountryCode The country code of the destination
   * @param lines The lines in the checkout
   * @param carrierCodes The carrier codes to get rates for
   * @param fromPostalCode The postal code of the origin
   * @param toPostalCode The postal code of the destination
   */
  async getShippingMethodsForCheckout({
    toCountryCode,
    lines,
    carrierCodes,
    fromPostalCode,
    toPostalCode,
  }: {
    carrierCodes: string[];
    fromPostalCode: string;
    toCountryCode: string;
    toPostalCode: string;
    lines: CheckoutLineFragment[];
  }): Promise<SaleorShippingMethod[]> {
    this.logger.debug("Getting rates for the following carrier codes: %o", carrierCodes);

    const client = new GetRatesClient(this.apiClient);

    const getShippingMethodsFromAllCarriers = carrierCodes.map((carrierCode) => {
      return client.getRates({
        carrierCode: carrierCode,
        serviceCode: null,
        packageCode: null,
        fromPostalCode,
        toCountry: toCountryCode,
        toPostalCode,
        weight: saleorToShipstation.mapSaleorLinesToWeight(lines),
        dimensions: saleorToShipstation.mapSaleorLinesToPackageDimensions(lines),
      });
    });

    const allCarriersResponse = await Promise.all(getShippingMethodsFromAllCarriers);

    this.logger.debug({ allCarriersResponse }, "Shipping methods from all carriers: ");

    const flatAllCarriersResponse = allCarriersResponse.flatMap((methods) => methods);

    this.logger.trace({ flatAllCarriersResponse }, "Flat all carriers response: ");

    const saleorMethods = shipstationToSaleor.mapShipstationRates(flatAllCarriersResponse);

    return saleorMethods;
  }
}
