![Next.js App Router + Saleor](https://user-images.githubusercontent.com/44495184/210545042-0537d49f-6ab8-4e52-af75-225370789c2b.png)

<img width="1383" alt="Example storefront with Next.js (App Router)" src="https://github.com/saleor/example-nextjs-app-router-starter/assets/200613/2de5b286-a05c-4eee-9591-b4b01c3c7ee7">

<div align="center">
  <h1>Example storefront with Next.js (App Router)</h1>
</div>

<div align="center">
  <a href="https://saleor.io/">🏠 Website</a>
  <span> • </span>
  <a href="https://docs.saleor.io/docs/3.x/">📚 Docs</a>
  <span> • </span>
  <a href="https://saleor.io/blog/">📰 Blog</a>
  <span> • </span>
  <a href="https://twitter.com/getsaleor">🐦 Twitter</a>
  <span> • </span>
  <a href="https://discord.gg/H52JTZAtSH">💬 Discord</a>
</div>

## Motivation

🤏 **Bare bones**: Useful for prototyping or building your stack from scratch.

💪 **Typesafe**: Get productive with code generation and types.

## Stack:

- [Next.js App Router](https://nextjs.org/) with static data fetching
- [GraphQL Code Generator](https://the-guild.dev/graphql/codegen)
- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/)

## Quickstart

1. Create `.env` file based on `.env.example`:

```bash
cp .env.example .env
```

2. Replace the `SALEOR_API_URL` environment variable with the address of your Saleor instance.

3. Install the dependencies:

```bash
pnpm i
```

4. Generate the types based on GraphQL schema:

```bash
pnpm generate
```

5. Start the development server:

```bash
pnpm dev
```

6. Enjoy! 🎉
