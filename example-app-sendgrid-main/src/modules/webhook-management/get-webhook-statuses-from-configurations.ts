import { SendgridConfiguration } from "../sendgrid/configuration/sendgrid-config-schema";
import { AppWebhook, eventToWebhookMapping } from "./webhook-management-service";
import { webhookStatusesFactory } from "./webhook-status-dict";

/*
 * Returns dictionary of webhook statuses based on passed configurations.
 * Webhook is marked as active (true) if at least one event related event is marked as active.
 */
export const getWebhookStatusesFromConfigurations = ({
  sendgridConfigurations,
}: {
  sendgridConfigurations: SendgridConfiguration[];
}) => {
  // TODO: this dict should be generated in one place instead of manually edited
  const statuses: Record<AppWebhook, boolean> = webhookStatusesFactory({});


  sendgridConfigurations.forEach(async (config) => {
    if (!config.active) {
      return;
    }
    config.events.forEach(async (event) => {
      if (event.active) {
        statuses[eventToWebhookMapping[event.eventType]] = true;
      }
    });
  });

  return statuses;
};
