# Klarna app

This app integrates Saleor with [Klarna](https://www.klarna.com/pl/) payment gateway.

Required Saleor version: **3.15**

> [!NOTE]
> This is an example implementation. Only community support is available.

## Development

### Prerequisites

#### Software

- Node.js 20

- pnpm 8.14.2

#### Access

You need to have a Klarna playground account to run this app. You can create one [here](https://docs.klarna.com/resources/test-environment/before-you-test/).

### Installation

1. Copy `.env.example` to `.env` and fill in the required values.
2. `pnpm install`

### Usage

> [!IMPORTANT]
> The app needs to be [tunneled](https://docs.saleor.io/docs/3.x/developer/extending/apps/developing-with-tunnels) in local development.

To run the app on port 3000, use the following command:

```bash
pnpm dev
```

Each time you modify a `.graphql` file, you have to run:

```bash
pnpm generate
```

to regenerate the GraphQL types.

### Running storefront example

This app comes with a simple storefront example. To run it, follow these steps:

1. Clone [the repository](https://github.com/saleor/example-nextjs-klarna).
2. Copy `.env.example` to `.env` and fill in the required values.
3. `pnpm install`
4. `pnpm dev`

Each time you modify a `.graphql` file, you have to run:

```bash
pnpm generate
```

### Vendor software

The app implements the [Hosted Payment Page flow](https://docs.klarna.com/hosted-payment-page/get-started/accept-klarna-payments-using-hosted-payment-page/) through a custom Klarna API client. The client is located in `generated/klarna.ts`. 

## Overview

### Features

- ✅ [Authorize transactions](https://docs.saleor.io/docs/3.x/developer/payments#authorization_success)
- ✅ [Charge transactions](https://docs.saleor.io/docs/3.x/developer/payments#charge_success)
- ✅ [Refund transactions](https://docs.saleor.io/docs/3.x/api-reference/webhooks/enums/webhook-event-type-sync-enum#code-style-fontweight-normal-webhookeventtypesyncenumbtransaction_refund_requestedbcode)
- ❌ [Cancel transactions](https://docs.saleor.io/docs/3.x/api-reference/webhooks/enums/webhook-event-type-sync-enum#code-style-fontweight-normal-webhookeventtypesyncenumbtransaction_cancelation_requestedbcode)
- ✅ [Initialize payment gateway](https://docs.saleor.io/docs/3.x/developer/payments#initialize-payment-gateway)
- ❌ [Saved payment methods](https://docs.saleor.io/docs/3.x/developer/payments#stored-payment-methods)
- ✅ [Storing config in metadata](https://docs.saleor.io/docs/3.x/developer/extending/apps/developing-apps/apps-patterns/persistence-with-metadata-manager)
- ✅ Two way webhook synchronization (Saleor → Klarna → Saleor)
- ✅ Front-end example (in [external repository](https://github.com/saleor/example-nextjs-klarna))

#### Payment methods

- Klarna (credit card)

### Payment flow

1. Execute `checkoutCreate` mutation from the front-end.
2. Execute `transactionInitialize` mutation from the front-end. In the app, the `transaction-initialize-session.ts` handler creates a session in Klarna. Depending on the chosen `TransactionFlowStrategyEnum`, it will respond with either `AUTHORIZATION_ACTION_REQUIRED` or `CHARGE_ACTION_REQUIRED`. `transaction-initialize-session` returns the `data` needed to render the Klarna component.
3. Render the Klarna component in the front-end.
4. Once the payment process is finished, execute the `transactionProcess` mutation from the front-end. In the app, the `transaction-process-session.ts` handler creates an order in Klarna.

## Configuration

You will need to provide the following configuration:

- Username - your Klarna username
- Password - your Klarna password

Now, save the configuration and assign it to the channel you want to use it with.
