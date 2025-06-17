# saleor-app-payment-template

## 0.4.3

### Patch Changes

- a56cb71: Refactored the way validation errors are thrown. Instead of throwing a raw Zod error, the app will now wrap it with a custom error and a message.

## 0.4.2

### Patch Changes

- 8e65ded: Make sure user is logged in when fetching their customer profile from Authorize.net
- 4b26f36: Fixed the bug with Authorize.net returning errors when the line item name is longer than the db field restrictions. The app will now slice the name.
- 02b7b58: Fixed the bug with the app not throwing an error when neither `VERCEL_URL` nor `APP_API_BASE_URL` was provided.
- 02b7b58: The app will now show a warn log that provides more context about possible reasons for the `TransactionEventReportMutationError`. It should help debug the root cause of the error.
- 0f36810: Remove = char from serialization of IDs

## 0.4.1

### Patch Changes

- a769ed1: Fixed the issue with unclear error trace. Now, the capture helper doesn't include logging.

## 0.4.0

### Minor Changes

- 36882c9: Added the implementation of `PAYMENT_GATEWAY_INITIALIZE_SESSION` webhook which returns all the implemented payment methods with data needed to render them. Then, the transaction must be created with `TRANSACTION_INITIALIZE_SESSION`. The process requires an extra step for Accept Hosted payment method. To render the payment form, you must first call the `TRANSACTION_INITIALIZE_SESSION`, which returns result `AUTHORIZATION_ACTION_REQUIRED` with `data` needed to render the Accept Hosted form. Then, `TRANSACTION_PROCESS_SESSION` must be called.

### Patch Changes

- 4312802: Fixed the pnpm version in the failing GitHub action.
- ee61aed: Fixed the evaluation of webhook signature. It now uses `timingSafeEqual`.

## 0.3.0

### Minor Changes

- 08dd303: Synchronized the following new fields from Saleor to Authorize transaction: billing address, shipping address, order number, line details.
- c6e645a: Added registering and handling Authorize.net webhooks. Enclosing the two-way synchronization between Saleor and Authorize.net transactions. Known issues: hard-coded channels, skipped webhook body verification. Both will be addressed in the next release.
- f3f6562: Added support for priorAuthCapture.created and void.created Authorize events.
- 2c4af92: Remove billing address from Accept Hosted form. The address is expected to be placed outside of Accept Hosted.
- b76b9a5: Removed unused channel x configuration connection mapping. The app now gets its configuration from environment variables.

### Patch Changes

- 391632c: Fixed the missing argument TypeScript issue in `webhook-manager-service.ts`.

## 0.2.0

### Minor Changes

- d60a0b2: Added support for the `TRANSACTION_CANCELATION_REQUESTED` webhook that voids the transaction in Authorize.

  Added support for the `TRANSACTION_REFUND_REQUESTED` webhook that refunds the transaction in Authorize.

  The app now also saves the Authorize transaction id in the transaction metadata.

  The frontend `example` allows you to complete the checkout and turn it into an order.

- 3152374: Added app configuration. It is specified in `AppConfig` that consists of `channels` and `providers`. The entire application state is managed in `AppConfigurator` class.
- b2a5677: Changed the Authorize.net flow to use Accept Hosted payment form. The process is now the following:

  1. Send `TransactionInitializeMutation` from the `example` frontend to initialize the transaction.
  2. The app responds to it in the `transaction_initialize_session` webhook handler. The handler does the following:

     1. Looks for stored user payment methods (`customerProfileId`).
     2. If `customerProfileId` is found, it is passed to the transaction used in `getHostedPaymentPageRequest`. This call returns the `formToken` needed to render the Accept Hosted payment form.
     3. Retrieves the `environment` (sandbox or production) from the app config.
     4. Returns the `formToken` and `environment` to the `example` frontend in the `data` field.

  3. Render the Accept Hosted form in the `example` frontend using the `formToken` and `environment` obtained in step 2.
  4. The Authorize transaction is created in the Accept Hosted payment form. The `example` frontend listens to the callback `onTransactionResponse`. When it arrives, it means the transaction was created.
  5. Send `TransactionProcessMutation` from the `example` frontend to process the transaction. Pass `transactionId` in the `data` field.
  6. The app responds to it in the `transaction_process_payment` webhook handler. The handler does the following:

     1. Retrieves the `transactionId` from the `data` field.
     2. Calls `getTransactionDetailsRequest` with the `transactionId` and `environment` to get the transaction details.
     3. The handler maps the state of the authorize transaction to a Saleor transaction result.

  7. Based on the status of the transaction, the `example` frontend renders the appropriate message to the user.

- 3152374: The app now gets its config from either the metadata or environment variables. The latter is suggested for local development, if you don't want to recreate the providers when reinstalling the app.
- bedc9d3: Added support for reading the full `AppConfig` from `.env`, not just the provider configuration. In order to initialize the app with env config, you must now provide `AUTHORIZE_SALEOR_CHANNEL_SLUG` environment variable with the slug of the channel.

## 0.1.0

### Minor Changes

- 23f24e2: Added basic scaffolding for Authorize.net payment app. Implemented two dummy webhook handlers: `payment-gateway-initialize-session` and `transaction-initialize-session`. Both return mocked values. Created dummy front-end checkout app under the "/example" directory. It triggers the `transaction-initialize-session` and completes the checkout after the transaction.
- 9e26ef1: The app now creates a transaction in Authorize.net on `TRANSACTION_INITIALIZE_SESSION` webhook call. The `data` payload object is expected to contain the `opaqueData`: `dataDescriptor` and `dataValue`. The Authorize.net `payment` object is then built based on the `opaqueData`. This means the webhook handler can be unaware of the chosen payment method.
- 3c8f656: Implement the `payment-gateway-initialize-session` logic. It now returns the data needed to start communication with Authorize.net on in the checkout UI.
- da0eada: Modified the UI flow in the `example` app. It now consists of: product page, cart page, pay page, and success page. The pay page contains a credit card form. The credit card data is sent straight to Authorize.net.

## 0.0.1

### Patch Changes

- 4756c82: Fixes tests that were failing from the template
