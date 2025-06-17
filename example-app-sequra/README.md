# Example seQura App

This app integrates Saleor with [seQura](https://en.sequra.com/) payment gateway.

Required Saleor version: **3.16**

> [!NOTE]
> This is an example implementation. Only community support is available.

## Development

### Prerequisites

#### Software

- Node.js 20

- pnpm 8.14.2

#### Access

A seQura account is required to run the app. Only seQura staff can create the account.

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

1. Clone [the repository](https://github.com/saleor/example-nextjs-sequra).
2. Copy `.env.example` to `.env` and fill in the required values.
3. `pnpm install`
4. `pnpm dev`

Each time you modify a `.graphql` file, you have to run:

```bash
pnpm generate
```

### Deployment

When deploying to Vercel, additionally add the following environmental variable:

```
APL=vercel-kv
```

Moreover, make sure to configure Vercel KV storage in the Vercel Dashboard.

### Vendor software

The app uses a custom implementation of seQura API client. The client is located in `src/modules/sequra/sequra-api.ts`.

## Overview

### Features

- ✅ [Authorize transactions](https://docs.saleor.io/docs/3.x/developer/payments#authorization_success)
- ✅ [Charge transactions](https://docs.saleor.io/docs/3.x/developer/payments#charge_success)
- ⏳ [Refund transactions](https://docs.saleor.io/docs/3.x/api-reference/webhooks/enums/webhook-event-type-sync-enum#code-style-fontweight-normal-webhookeventtypesyncenumbtransaction_refund_requestedbcode)
- ❌ [Cancel transactions](https://docs.saleor.io/docs/3.x/api-reference/webhooks/enums/webhook-event-type-sync-enum#code-style-fontweight-normal-webhookeventtypesyncenumbtransaction_cancelation_requestedbcode)
- ✅ [Initialize payment gateway](https://docs.saleor.io/docs/3.x/developer/payments#initialize-payment-gateway)
- ❌ [Saved payment methods](https://docs.saleor.io/docs/3.x/developer/payments#stored-payment-methods)
- ✅ [Storing config in metadata](https://docs.saleor.io/docs/3.x/developer/extending/apps/developing-apps/apps-patterns/persistence-with-metadata-manager)
- ✅ Two way webhook synchronization (Saleor → Service → Saleor)
- ✅ Front-end example (in [external repository](https://github.com/saleor/example-nextjs-sequra))

#### Payment methods

- Credit card
- Buy now, pay later
- Installments

### Payment flow

1. Execute `checkoutCreate` mutation from the front-end.
2. Execute `transactionInitialize` mutation from the front-end. In the app, the `transaction-initialize-session.ts` handler creates an order in seQura. Depending on the chosen `TransactionFlowStrategyEnum`, it will respond with either `AUTHORIZATION_ACTION_REQUIRED` or `CHARGE_ACTION_REQUIRED`.
3. Execute `paymentGatewayInitialize` mutation from the front-end. In the app, the `payment-gateway-initialize-session.ts` handler returns the data required to render the seQura form.
4. Render the seQura form in the front-end.
5. When the status of seQura order changes, the app will synchronize the change with Saleor transaction through webhooks.

### Assumptions

seQura requires a valid Spanish address and Euro as the currency to work.

- We store the Saleor's `transactionId` in Sequra order `order_ref_1`.
- We store the Saleor's `checkout.id` in Sequra order `order_ref_2`.

### Limitations

SeQura releases payment to the merchant only when the order has been shipped. Therefore, it is essential to inform SeQura when the order is fulfilled. This integration does this automatically based on the `ORDER_FULFILLED` webhook.

## Configuration

You will need to provide the following configuration:

- Configuration Name – any name you want to give to the configuration
- Username - your Sequra username (e.g., `saleor_es`)
- Password - your Sequra password
- Merchant ID - your Sequra merchant ID (e.g., `saleor_es`)
- API URL - select `Playground` for testing.

Now, save the configuration and assign it to the channel you want to use it with.
