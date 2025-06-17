import "./load-env";
import * as path from "node:path";
import * as fsPromises from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { parseArgs } from "node:util";
import { type AuthData } from "@saleor/app-sdk/APL";
import { type MetadataEntry } from "@saleor/app-sdk/settings-manager";
import * as semver from "semver";
import { FetchAppDetailsDocument } from "../generated/graphql";
import { saleorApp } from "./saleor-app";
import { createServerClient } from "./lib/create-graphq-client";
import { invariant } from "./lib/invariant";
import { BaseError } from "./errors";
import { unpackPromise } from "./lib/utils";
import {
  createWebhookPrivateSettingsManager,
  mutatePrivateMetadata,
} from "./modules/app-configuration/metadata-manager";
import { PaymentAppConfigurator } from "./modules/payment-app-configuration/payment-app-configuration";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type Migration = Awaited<ReturnType<typeof getMigrationsToRun>>[0];

const NotFullyMigratedError = BaseError.subclass("NotFullyMigratedError", {
  props: { migrationCounter: null as null | number, lastMigration: null as null | Migration },
});

const apl = saleorApp.apl;
const allAuthData = await apl.getAll();
const migrationsFolderPath = path.join(__dirname, "migrations");

const {
  values: { dryRun },
} = parseArgs({
  options: {
    dryRun: {
      type: "boolean",
      short: "d",
    },
  },
});

const processedInstances = await Promise.all(
  allAuthData.map(async (authData) => {
    const [error, result] = await unpackPromise(processInstance(authData));
    return [authData, error, result] as const;
  }),
);

processedInstances.forEach(([authData, error, result]) => {
  if (error) {
    if (error instanceof NotFullyMigratedError) {
      console.error(
        `❌ ${authData.saleorApiUrl}: Not fully migrated (last successfull: ${
          error.migrationCounter ?? "none"
        })\n${JSON.stringify(error, null, 2)}`,
      );
    } else {
      console.error(
        `❌ ${authData.saleorApiUrl}: Error while running migrations\n${JSON.stringify(
          error,
          null,
          2,
        )}`,
      );
    }
  }

  if (result) {
    console.info(`✅ ${authData.saleorApiUrl}: ${result.migrations} migrations`);
  }
});

async function processInstance(authData: AuthData) {
  const client = createServerClient(authData.saleorApiUrl, authData.token);
  const { data: appDetailsResponse } = await client.query(FetchAppDetailsDocument, {}).toPromise();

  if (!appDetailsResponse) {
    throw new Error("Cannot fetch app details");
  }

  invariant(appDetailsResponse.app?.privateMetadata, "Missing private metadata");
  invariant(appDetailsResponse?.shop.schemaVersion, "Missing Saleor version");

  const configurator = new PaymentAppConfigurator(
    createWebhookPrivateSettingsManager(
      appDetailsResponse.app.privateMetadata as MetadataEntry[],
      (metadata) => mutatePrivateMetadata(client, metadata),
    ),
    authData.saleorApiUrl,
  );

  const migrations = await getMigrationsToRun(configurator, appDetailsResponse.shop.schemaVersion);

  if (dryRun) {
    console.log(`${authData.saleorApiUrl} - migrations to run:`, migrations);
    return {
      migrations: 0,
    };
  }

  const lastMigrationToRun = migrations.at(-1);

  if (!lastMigrationToRun) {
    // No migrations to run
    return {
      migrations: 0,
    };
  }

  let migrationCounter: number | null = null;
  let recentMigration: Migration | null = null;

  for (const migration of migrations) {
    recentMigration = migration;
    const migrationId = `${migration.number}-${migration.name ?? ""}`;
    try {
      await migration.migrate(authData, configurator);
      migrationCounter = migration.number;
    } catch (error) {
      console.error(`Error while running migration ${migrationId}`, error);
      if (migration.rollback) {
        try {
          await migration.rollback(authData, configurator);
        } catch (rollbackError) {
          console.error("Error while applying a rollback", rollbackError);
        }
      } else {
        console.warn(`No rollback to run for migration ${migrationId}`);
      }
      break;
    }
  }

  if (migrationCounter !== null) {
    await configurator.setConfig({ lastMigration: migrationCounter });
  }

  if (migrationCounter !== lastMigrationToRun?.number) {
    throw new NotFullyMigratedError("Not fully migrated instance", {
      props: { migrationCounter, lastMigration: recentMigration },
    });
  }

  return {
    migrations: migrationCounter,
  };
}

async function getMigrationsToRun(configurator: PaymentAppConfigurator, usedSaleorVersion: string) {
  const { lastMigration } = await configurator.getConfig();
  const files = await fsPromises.readdir(migrationsFolderPath, { withFileTypes: true });

  const migrationFolders = files.filter((file) => file.isDirectory() && /^\d/.test(file.name));

  const migrations = await Promise.all(
    migrationFolders.map(async (folder) => {
      const match = folder.name.match(/^(\d+)-(.+)$/);
      const migrationNumber = parseInt(match?.[1] as string);
      const migrationName = match?.[2];
      if (typeof migrationNumber !== "number" || Number.isNaN(migrationNumber)) {
        throw new Error(`Cannot parse migration number from folder ${folder.name}`);
      }

      const indexFilePath = path.join(migrationsFolderPath, folder.name, "index.ts");
      const indexFileStat = await fsPromises.stat(indexFilePath);
      if (!indexFileStat.isFile()) {
        throw new Error("index.ts inside migration folder is not a file");
      }

      const migrationModule = (await import(indexFilePath)) as {
        migrate?: unknown;
        requiredSaleorVersion?: unknown;
        rollback?: unknown;
      };

      if (typeof migrationModule?.migrate !== "function") {
        throw new Error(`migrate exported from ${indexFilePath} is not a function`);
      }

      if (typeof migrationModule?.requiredSaleorVersion !== "string") {
        throw new Error(`requiredSaleorVersion in ${indexFilePath} is not a string`);
      }

      const rollbackFn =
        typeof migrationModule?.rollback === "function" ? migrationModule.rollback : null;

      return {
        number: migrationNumber,
        name: migrationName,
        migrate: migrationModule.migrate,
        requiredSaleorVersion: migrationModule.requiredSaleorVersion,
        rollback: rollbackFn,
      };
    }),
  );

  const filteredMigrations = migrations.filter(
    (migration) => migration.number > (lastMigration ?? 0),
  );

  const unappliableMigrationIndex = filteredMigrations.findIndex((migration) =>
    semver.gt(
      semver.coerce(migration.requiredSaleorVersion) ?? "",
      semver.coerce(usedSaleorVersion) ?? "",
    ),
  );

  if (unappliableMigrationIndex !== -1) {
    console.warn(
      `⚠️ ${configurator.saleorApiUrl} uses Saleor version ${usedSaleorVersion}. There are ${
        filteredMigrations.length - unappliableMigrationIndex
      } migrations that require Saleor in newer version (${
        filteredMigrations[unappliableMigrationIndex].requiredSaleorVersion
      } or newer).`,
    );
    return filteredMigrations.slice(0, unappliableMigrationIndex);
  }

  return filteredMigrations;
}
