
# Introduction

Sendgrid application is responsible for sending emails to the customers. It is connected to the Saleor API via webhooks, which notify the application about the events. The messages are delivered by external providers configured in the application.


:::info

Sendgrid account is required. You can create one [here](https://signup.sendgrid.com/).

:::

Sendgrid is a cloud-based email delivery and management platform that provides businesses with a solution for sending transactional and marketing emails. It offers a set of tools and APIs that enable developers to integrate email functionality into their applications, websites, or software products.

## Configuration

Before you start using the App, configure your Sendgrid Account:

- Generate [**API key**](https://docs.sendgrid.com/for-developers/sending-email/brite-verify#creating-a-new-api-key)

- Create [**Sender**](https://docs.sendgrid.com/ui/sending-email/senders)

- For every event message you want to send to the customers, create a [**Dynamic template**](https://docs.sendgrid.com/ui/sending-email/how-to-send-an-email-with-dynamic-templates#design-a-dynamic-template)

:::tip

Want to test messages? Working on the application code? See the [testing](#testing) section.

:::

Now you can configure the app:

1. Open the Sendgrid app in Saleor Dashboard
2. Click on `Add first configuration`
4. Provide configuration name and API key and click on `Save provider`
5. Application will redirect automatically to the configuration details
6. Navigate to _Sender_ section and choose sender. Save the changes
7. In the events section, assign dynamic templates to events. Save the changes

The application is now configured.

## Testing

Using a Gmail account for testing may not be possible due to security restrictions. To test the application, you can test the mailbox at [MailSlurp](https://www.mailslurp.com/).

1. Create an account at [MailSlurp](https://www.mailslurp.com/)
2. Create [a new inbox in MailSlurp](https://www.mailslurp.com/guides/creating-inboxes/)
3. Use the inbox address to [create a new sender in Sendgrid]https://docs.sendgrid.com/ui/sending-email/senders)
4. Confirm the sender by clicking on the link in the MailSlurp inbox
5. Configure the provider in the Emails and Messages app to use the new sender

:::caution

Unless a sandbox mode is enabled in the provider configuration, the emails will be sent to the customers. Make sure to use a test account.

:::



## Supported events

### Account confirmation

A message containing an account activation token after registration. To activate the account, your storefront should perform an API call according to [the documentation](../../../users#registration-with-email-confirmation).

If you don't want to use the email confirmation, you can disable it in the Saleor dashboard:

1. Open the Saleor dashboard
2. Navigate to the Configuration page
3. Click on the Site settings card
4. Update the `User registration` form

The event has been implemented using the `NOTIFY_USER` webhook.

### Account password reset

Message sent after requesting a password change. The payload contains a token that has to be attached to the request to the Saleor API to change the password. To implement a storefront interface for password change, follow [the documentation](../../../users#resetting-the-password).

The event has been implemented using the `NOTIFY_USER` webhook.

### Account password reset for staff-created accounts

As in the previous event, but for accounts created by Staff users in the Saleor Dashboard.

The event has been implemented using the `NOTIFY_USER` webhook.

### Account email address change

Message sent on the email address change request. Follow the [documentation](../../../users#changing-the-email-address) for more details.

The event has been implemented using the `NOTIFY_USER` webhook.

### Account email change confirmation

Confirmation is sent to the new address after following instructions from the previous message.

The event has been implemented using the `NOTIFY_USER` webhook.

### Account deletion request

A message with a token that's used for account deletion. To implement a storefront interface for account deletion, follow [the documentation](../../../users#deleting-the-account).

The event has been implemented using the `NOTIFY_USER` webhook.

### Invoice sent

The event is triggered when the Staff users use the `Sent invoice` action. The message contains a link to the invoice.

The event has been implemented using the `INVOICE_SENT` webhook.

### Order confirmation

Sends a message when the order is confirmed.

The event has been implemented using the `ORDER_CONFIRMED` webhook.

### Order has been fulfilled

Sends a message when the order status is changed to `FULFILLED`.

The event has been implemented using the `ORDER_FULFILLED` webhook.

### Order has been fully paid

Sends a message when the order is fully paid.

The event has been implemented using the `ORDER_FULLY_PAID` webhook.

### Order has been canceled

Sends a message when the order is canceled.

The event has been implemented using the `ORDER_CANCELLED` webhook.

### Sent gift card

Sends a message when the gift card is sent to the customer.

The event has been implemented using the `GIFT_CARD_SENT` webhook.

## Configuration

The application can use multiple Sendgrid configuration at the same time. This way, you'll be able to:

- create test configurations before using them in production
- use different configuration for different events
- use different configuration for different channels

### Multichannel

Each provider can be configured to work with specific channels. The configurations are used for all the channels by default. It can be changed in the configuration details to:

- use only the specific channels
- use all channels except the specific ones

## Development

To run the application locally, follow the [documentation](../../../extending/apps/developing-apps/app-examples#saleor-apps).

## Known limitations and issues

- When the application has multiple active configurations and one of them fails, it may result in duplicated email deliveries. [Issue link](https://github.com/saleor/apps/issues/725)
- Emails use the default language of the Saleor instance. Using translations is not supported yet. [Issue link](https://github.com/saleor/apps/issues/726)
- The order refunded event is not supported yet. [Issue link](https://github.com/saleor/apps/issues/728)
- The fulfillment updated event is not supported yet. [Issue link](https://github.com/saleor/apps/issues/729)
