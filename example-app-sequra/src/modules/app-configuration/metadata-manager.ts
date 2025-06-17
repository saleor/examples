import {
  EncryptedMetadataManager,
  type MetadataEntry,
  MetadataManager,
  type MutateMetadataCallback,
} from "@saleor/app-sdk/settings-manager";
import { type Client } from "urql";
import {
  FetchAppDetailsDocument,
  type FetchAppDetailsQuery,
  UpdateAppMetadataDocument,
  UpdatePublicMetadataDocument,
} from "../../../generated/graphql";
import { env } from "../../lib/env.mjs";

export async function fetchAllMetadata(client: Client): Promise<MetadataEntry[]> {
  const { error, data } = await client
    .query<FetchAppDetailsQuery>(FetchAppDetailsDocument, {})
    .toPromise();

  if (error) {
    return [];
  }

  const combinedMetadata = [...(data?.app?.metadata || []), ...(data?.app?.privateMetadata || [])];

  return combinedMetadata.map((md) => ({ key: md.key, value: md.value }));
}

async function getAppId(client: Client) {
  const { error: idQueryError, data: idQueryData } = await client
    .query(FetchAppDetailsDocument, {})
    .toPromise();

  if (idQueryError) {
    throw new Error(
      "Could not fetch the app id. Please check if auth data for the client are valid.",
    );
  }

  const appId = idQueryData?.app?.id;

  if (!appId) {
    throw new Error("Could not fetch the app ID");
  }

  return appId;
}

export async function mutatePrivateMetadata(client: Client, metadata: MetadataEntry[]) {
  // to update the metadata, ID is required
  const appId = await getAppId(client);

  const { error: mutationError, data: mutationData } = await client
    .mutation(UpdateAppMetadataDocument, {
      id: appId,
      input: metadata,
    })
    .toPromise();

  if (mutationError) {
    throw new Error(`Mutation error: ${mutationError.message}`);
  }

  return (
    mutationData?.updatePrivateMetadata?.item?.privateMetadata.map((md) => ({
      key: md.key,
      value: md.value,
    })) || []
  );
}

export async function mutatePublicMetadata(client: Client, metadata: MetadataEntry[]) {
  // to update the metadata, ID is required
  const appId = await getAppId(client);

  const { error: mutationError, data: mutationData } = await client
    .mutation(UpdatePublicMetadataDocument, {
      id: appId,
      input: metadata,
    })
    .toPromise();

  if (mutationError) {
    throw new Error(`Mutation error: ${mutationError.message}`);
  }

  return (
    mutationData?.updateMetadata?.item?.metadata.map((md) => ({
      key: md.key,
      value: md.value,
    })) || []
  );
}

// branded types are used to prevent using wrong manager for wrong metadata
type Brand<K, T> = K & { __brand: T };
export type BrandedEncryptedMetadataManager = Brand<
  EncryptedMetadataManager,
  "EncryptedMetadataManager"
>;
export type BrandedMetadataManager = Brand<MetadataManager, "MetadataManager">;

export const createPrivateSettingsManager = (client: Client) => {
  // EncryptedMetadataManager gives you interface to manipulate metadata and cache values in memory.
  // We recommend it for production, because all values are encrypted.
  // If your use case require plain text values, you can use MetadataManager.
  return new EncryptedMetadataManager({
    // Secret key should be randomly created for production and set as environment variable
    encryptionKey: env.SECRET_KEY,
    fetchMetadata: () => fetchAllMetadata(client),
    mutateMetadata: (metadata) => mutatePrivateMetadata(client, metadata),
  }) as BrandedEncryptedMetadataManager;
};

export const createPublicSettingsManager = (client: Client) => {
  return new MetadataManager({
    fetchMetadata: () => fetchAllMetadata(client),
    mutateMetadata: (metadata) => mutatePublicMetadata(client, metadata),
  }) as BrandedMetadataManager;
};

export const createWebhookPrivateSettingsManager = (
  data: MetadataEntry[],
  onUpdate?: MutateMetadataCallback,
) => {
  return new EncryptedMetadataManager({
    encryptionKey: env.SECRET_KEY,
    fetchMetadata: () => Promise.resolve(data),
    mutateMetadata: onUpdate ?? (() => Promise.resolve([])),
  }) as BrandedEncryptedMetadataManager;
};

export const createWebhookPublicSettingsManager = (
  data: MetadataEntry[],
  onUpdate?: MutateMetadataCallback,
) => {
  return new MetadataManager({
    fetchMetadata: () => Promise.resolve(data),
    mutateMetadata: onUpdate ?? (() => Promise.resolve([])),
  }) as BrandedMetadataManager;
};
