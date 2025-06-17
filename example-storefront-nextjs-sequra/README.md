# Sequra Next.js Example

## Prerequisites

- Node.js 20
- pnpm

## Starting the example

First, set the following environmental variables:

```
SALEOR_API_URL=https://your-cloud-instance.eu.saleor.cloud/graphql/
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

(make sure to replace `your-cloud-instance.eu.` with your cloud instance address)

Then, install the dependencies and start the server:

```bash
pnpm i
pnpm run dev
```

The app will be available on http://localhost:3001

> [!IMPORTANT]
> For this example to work, you need to install and configure the [Sequra App](https://github.com/saleor/saleor-app-payment-sequra) in Saleor Cloud.

> [!IMPORTANT]
> For this example to work, you must have a channel named `eur` in your Saleor Cloud instance.
