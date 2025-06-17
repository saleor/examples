import { type PaymentGatewayInitializeSessionResponse } from "@/schemas/PaymentGatewayInitializeSession/PaymentGatewayInitializeSessionResponse.mjs";
import { type PaymentGatewayInitializeSessionEventFragment } from "generated/graphql";
import { invariant } from "@/lib/invariant";
import { createLogger } from "@/lib/logger";

export const PaymentGatewayInitializeSessionWebhookHandler = async (
  event: PaymentGatewayInitializeSessionEventFragment,
  {}: { saleorApiUrl: string; baseUrl: string },
): Promise<PaymentGatewayInitializeSessionResponse> => {
  const logger = createLogger(
    {},
    { msgPrefix: "[PaymentGatewayInitializeSessionWebhookHandler] " },
  );

  const app = event.recipient;
  invariant(app, "Missing event.recipient!");

  logger.info({}, "Processing Payment Gateway Initialize request");
  const paymentGatewayInitializeSessionResponse: PaymentGatewayInitializeSessionResponse = {
    data: {},
  };
  return paymentGatewayInitializeSessionResponse;
};
