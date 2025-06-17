import { expect, describe, it } from "vitest";
import { getWebhookStatusesFromConfigurations } from "./get-webhook-statuses-from-configurations";
import { SendgridConfiguration } from "../sendgrid/configuration/sendgrid-config-schema";
import { webhookStatusesFactory } from "./webhook-status-dict";


const nonActiveSendgridConfiguration: SendgridConfiguration = {
  id: "1685343953413npk9p",
  active: false,
  name: "Best name",
  sandboxMode: false,
  apiKey: "SG.123",
  channels: {
    override: false,
    channels: [],
    mode: "restrict",
  },
  events: [
    {
      active: false,
      eventType: "ORDER_CREATED",
      template: "1",
    },
    {
      active: false,
      eventType: "ORDER_FULFILLED",
      template: undefined,
    },
    {
      active: false,
      eventType: "ORDER_CONFIRMED",
      template: undefined,
    },
    {
      active: false,
      eventType: "ORDER_CANCELLED",
      template: undefined,
    },
    {
      active: false,
      eventType: "ORDER_FULLY_PAID",
      template: undefined,
    },
    {
      active: false,
      eventType: "INVOICE_SENT",
      template: undefined,
    },
    {
      active: false,
      eventType: "ACCOUNT_CONFIRMATION",
      template: undefined,
    },
    {
      active: false,
      eventType: "ACCOUNT_PASSWORD_RESET",
      template: undefined,
    },
    {
      active: false,
      eventType: "ACCOUNT_CHANGE_EMAIL_REQUEST",
      template: undefined,
    },
    {
      active: false,
      eventType: "ACCOUNT_CHANGE_EMAIL_CONFIRM",
      template: undefined,
    },
    {
      active: false,
      eventType: "ACCOUNT_DELETE",
      template: undefined,
    },
  ],
  sender: "1",
  senderEmail: "no-reply@example.com",
  senderName: "Sender Name",
};

describe("getWebhookStatusesFromConfigurations", function () {
  it("Statuses should be set to false, when no configurations passed", async () => {
    expect(
      getWebhookStatusesFromConfigurations({
        sendgridConfigurations: [],
      })
    ).toStrictEqual(webhookStatusesFactory({}));
  });

  it("Statuses should be set to false, when no active configurations passed", async () => {
    expect(
      getWebhookStatusesFromConfigurations({
        sendgridConfigurations: [nonActiveSendgridConfiguration],
      })
    ).toStrictEqual(webhookStatusesFactory({}));
  });

  it("Statuses should be set to false, when configuration is not active even if events were activated", async () => {
    expect(
      getWebhookStatusesFromConfigurations({
        sendgridConfigurations: [nonActiveSendgridConfiguration],
      })
    ).toStrictEqual(webhookStatusesFactory({}));
  });

  it("Status of the event should be set to true, when at least one active configuration has activated it", async () => {
    expect(
      getWebhookStatusesFromConfigurations({
        sendgridConfigurations: [nonActiveSendgridConfiguration],
      })
    ).toStrictEqual(webhookStatusesFactory({ enabledWebhooks: ["invoiceSentWebhook"] }));
  });

  it("Status of the NOTIFY webhooks should be set to true, when at least one active configuration has activated one of its related events", async () => {
    expect(
      getWebhookStatusesFromConfigurations({
        sendgridConfigurations: [nonActiveSendgridConfiguration],
      })
    ).toStrictEqual(webhookStatusesFactory({ enabledWebhooks: ["notifyWebhook"] }));
  });
});
