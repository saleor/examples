import { type AuthData } from "@saleor/app-sdk/APL";
import { createServerClient } from "@/lib/create-graphq-client";
import {
  Migration_01_FetchWebhookIdsDocument,
  Migration_01_UpdateWebhookDocument,
  UntypedTransactionInitializeSessionDocument,
  WebhookEventTypeSyncEnum,
} from "generated/graphql";
import { gqlAstToString } from "@/lib/gql-ast-to-string";
import { type PaymentAppConfigurator } from "@/modules/payment-app-configuration/payment-app-configuration";

export const requiredSaleorVersion = "3.13";

export async function migrate(authData: AuthData, _configurator: PaymentAppConfigurator) {
  const client = createServerClient(authData.saleorApiUrl, authData.token);
  const { data: fetchWebhookData } = await client
    .query(Migration_01_FetchWebhookIdsDocument, {})
    .toPromise();

  const webhook = fetchWebhookData?.app?.webhooks?.find((webhook) =>
    webhook.syncEvents.find(
      (syncEvent) => syncEvent.eventType === WebhookEventTypeSyncEnum.TransactionInitializeSession,
    ),
  );

  if (!webhook) {
    throw new Error("No webhook to update");
  }

  const webhookId = webhook.id;

  const { data: updateWebhookData, error } = await client
    .mutation(Migration_01_UpdateWebhookDocument, {
      newQuery: gqlAstToString(UntypedTransactionInitializeSessionDocument),
      webhookId,
    })
    .toPromise();

  if (error || !updateWebhookData?.webhookUpdate?.webhook?.id) {
    throw new Error("Error while updating webhook");
  }
}
