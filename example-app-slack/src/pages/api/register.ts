import { createAppRegisterHandler } from "@saleor/app-sdk/handlers/next";

import { saleorApp } from "../../lib/saleor-app";

const handler = createAppRegisterHandler({
  apl: saleorApp.apl,
});

export default handler;
