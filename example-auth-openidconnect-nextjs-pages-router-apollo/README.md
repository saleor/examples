# Example: Auth in Next.js using OpenID Connect and Apollo Client

> [!TIP]
> Questions or issues? Check our [discord](https://discord.gg/H52JTZAtSH) channel for help.


### Prerequisites

- [PNPM](https://pnpm.io/) v9
- Saleor instance with configured OIDC provider (see [docs](https://docs.saleor.io/api-usage/authentication#oidc-single-sign-on-sso-flow) on how to configure it)


## Getting Started

You need to set up the OpenID Connect plugin in your Saleor dashboard.

Copy `.env.example` to `.env` and set your Saleor instance URL with the `NEXT_PUBLIC_SALEOR_URL` environment variable.

Install dependencies:

```bash
pnpm install
```

Run the development server:

```bash
pnpm run dev
```

Open [http://localhost:5375](http://localhost:5375) with your browser to see the result.
