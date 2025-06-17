/* eslint-disable node/no-process-env */
import { execSync } from "child_process";

execSync("pnpm run build", { stdio: "inherit" });

if (
  process.env.DEPLOYMENT_ENVIRONMENT === "production" ||
  process.env.DEPLOYMENT_ENVIRONMENT === "staging"
) {
  console.log("Production environment detected, running migrations");
  execSync("pnpm run migrate", { stdio: "inherit" });
}
