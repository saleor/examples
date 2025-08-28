import { z } from "zod";
import { createLogger, logger } from "../../../lib/logger";

type ShippingApiCredentials = {
  apiKey: string;
  apiSecret: string;
};

const API_URL = "https://ssapi.shipstation.com";

const shipStationErrorSchema = z.object({
  Message: z.string(),
  ExceptionMessage: z.string(),
});

function getBasicAuthHeader({ apiKey, apiSecret }: ShippingApiCredentials) {
  return "Basic " + btoa(`${apiKey}:${apiSecret}`);
}

export class ShipStationApiClient {
  private logger = createLogger("ShipStationApiClient");

  constructor(private shipstationApiCredentials: ShippingApiCredentials) {}

  private parseAndThrowShipStationError(errorJson: unknown) {
    const parseResult = shipStationErrorSchema.safeParse(errorJson);

    if (!parseResult.success) {
      logger.warn(
        { json: errorJson },
        "Failed to provide detailed error message from ShipStation API."
      );

      throw new Error("The response from ShipStation API is in unexpected shape.");
    }

    const shipStationErrorBody = parseResult.data;

    throw new Error(
      `ShipStation API error: ${shipStationErrorBody.Message} ${shipStationErrorBody.ExceptionMessage}`
    );
  }

  async query(path: string, { method, body }: { method?: string; body?: Record<string, unknown> }) {
    this.logger.trace("Querying ShipStation API on path %s", path);

    const response = await fetch(API_URL + path, {
      method: method ?? "POST",
      body: JSON.stringify(body ?? {}),
      headers: {
        "Content-Type": "application/json",
        Authorization: getBasicAuthHeader(this.shipstationApiCredentials),
      },
    });

    this.logger.trace("ShipStation API response status: %d", response.status);

    const json = await response.json();

    if (!response.ok) {
      this.logger.trace("ShipStation API error response: %o", json);
      this.parseAndThrowShipStationError(json);
    }

    this.logger.trace("ShipStation API success response: %o", json);

    return json;
  }
}
