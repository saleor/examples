import path from "path";
import NodeHttpAdapter from "@pollyjs/adapter-node-http";
import FetchAdapter from "@pollyjs/adapter-fetch";
import { Polly, type Headers, type PollyConfig } from "@pollyjs/core";
import FSPersister from "@pollyjs/persister-fs";
import { afterEach, beforeEach, expect } from "vitest";
import merge from "lodash-es/merge";
import omit from "lodash-es/omit";
import omitDeep from "omit-deep-lodash";
import { tryJsonParse, tryIgnore } from "../lib/utils";
import { env } from "@/lib/env.mjs";
import { testEnv } from "@/__tests__/test-env.mjs";

declare module "vitest" {
  export interface TestContext {
    polly?: Polly;
  }
}

export const omitPathsFromJson = (paths: string[]) => (input: string) => {
  return JSON.stringify(omit(JSON.parse(input) as object, paths));
};
export const omitPathsFromHeaders = (paths: string[]) => (headers: Headers) => {
  return omit(headers, paths);
};

const HEADERS_BLACKLIST = new Set([
  "authorization-bearer",
  "authorization",
  "saleor-signature",
  "set-cookie",
  "x-api-key",
]);

const VARIABLES_BLACKLIST = new Set([
  "csrfToken",
  "email",
  "newEmail",
  "newPassword",
  "oldPassword",
  "password",
  "redirectUrl",
  "refreshToken",
  "token",
  "authorisationToken",
]);

const removeBlacklistedVariables = (
  obj: {} | undefined | string | null,
): {} | undefined | string | null => {
  if (!obj || typeof obj === "string") {
    return obj;
  }

  return omitDeep(obj, ...VARIABLES_BLACKLIST);
};

/**
 * This interface is incomplete
 */
interface PollyRecording {
  response: {
    content?: {
      mimeType: string;
      text: string;
    };
    cookies: string[];
    headers: Array<{ value: string; name: string }>;
  };
  request: {
    postData?: {
      text: string;
    };
    cookies: string[];
    headers: Array<{ value: string; name: string }>;
  };
}

const responseIsJson = (recording: PollyRecording) => {
  return recording.response.content?.mimeType.includes("application/json");
};
const requestIsJson = (recording: PollyRecording) => {
  return recording.request.headers.some(
    ({ name, value }) =>
      name.toLowerCase() === "content-type" && value.includes("application/json"),
  );
};

export const setupRecording = (config?: PollyConfig) => {
  Polly.on("create", (polly) => {
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable @typescript-eslint/no-unsafe-member-access */
    /* eslint-disable @typescript-eslint/no-unsafe-call */
    /* eslint-disable @typescript-eslint/no-unsafe-argument */
    /* eslint-disable @typescript-eslint/no-unsafe-return */
    /* eslint-disable @typescript-eslint/no-non-null-assertion */
    polly.server
      .any()
      // Hide sensitive data in headers or in body
      .on("beforePersist", (_req, recording: PollyRecording) => {
        recording.response.cookies = [];

        recording.response.headers = recording.response.headers.filter(
          (el: Record<string, string>) => !HEADERS_BLACKLIST.has(el.name),
        );
        recording.request.headers = recording.request.headers.filter(
          (el: Record<string, string>) => !HEADERS_BLACKLIST.has(el.name),
        );

        if (recording.request.postData?.text) {
          const requestJson = tryJsonParse(recording.request.postData.text);
          const filteredRequestJson = removeBlacklistedVariables(requestJson);
          recording.request.postData.text =
            typeof filteredRequestJson === "string"
              ? filteredRequestJson
              : JSON.stringify(filteredRequestJson);
        }
        if (recording.response.content?.text) {
          const responseJson = tryJsonParse(recording.response.content.text);
          const filteredResponseJson = removeBlacklistedVariables(responseJson);
          recording.response.content.text =
            typeof filteredResponseJson === "string"
              ? filteredResponseJson
              : JSON.stringify(filteredResponseJson);
        }
      })
      // make JSON response and requests more readable
      // https://github.com/Netflix/pollyjs/issues/322
      .on("beforePersist", (_req, recording: PollyRecording) => {
        if (responseIsJson(recording)) {
          tryIgnore(
            () =>
              (recording.response.content!.text = JSON.parse(
                recording.response.content!.text,
              ) as string),
          );
        }

        if (requestIsJson(recording)) {
          tryIgnore(
            () =>
              (recording.request.postData!.text = JSON.parse(
                recording.request.postData!.text,
              ) as string),
          );
        }
      })
      .on("beforeReplay", (_req, recording: PollyRecording) => {
        if (responseIsJson(recording)) {
          tryIgnore(
            () =>
              (recording.response.content!.text = JSON.stringify(recording.response.content!.text)),
          );
        }

        if (requestIsJson(recording)) {
          tryIgnore(
            () =>
              (recording.request.postData!.text = JSON.stringify(recording.request.postData!.text)),
          );
        }
      });
    /* eslint-enable */
  });

  const defaultConfig = {
    ...getRecordingSettings(),
    adapters: [FetchAdapter, NodeHttpAdapter],
    persister: FSPersister,
    persisterOptions: {
      fs: {},
      keepUnusedRequests: false,
    },
    flushRequestsOnStop: true,
    matchRequestsBy: {
      url: {
        protocol: true,
        username: true,
        password: true,
        hostname: true,
        port: true,
        pathname: true,
        query: true,
        hash: false,
      },
      body: true,
      order: true,
      method: true,
      headers: false,
    },
  };

  beforeEach(async (ctx) => {
    const { currentTestName } = expect.getState();
    if (!currentTestName) {
      throw new Error("This function must be run inside a test case!");
    }

    const recordingsRoot = path.dirname(expect.getState().testPath || "");
    const recordingsDirectory = path.join(recordingsRoot, "__recordings__");

    const [, ...names] = currentTestName.split(" > ");
    const polly = new Polly(
      names.join("/"),
      merge(
        defaultConfig,
        {
          persisterOptions: {
            fs: {
              recordingsDir: recordingsDirectory,
            },
          },
        },
        config,
      ),
    );
    ctx.polly = polly;
  });

  afterEach((ctx) => ctx.polly?.flush());
  afterEach((ctx) => ctx.polly?.stop());
};

const getRecordingSettings = (): Pick<
  PollyConfig,
  "mode" | "recordIfMissing" | "recordFailedRequests"
> => {
  // use replay mode by default, override if POLLY_MODE env variable is passed
  const mode = env.CI ? "replay" : testEnv.POLLY_MODE;

  if (mode === "record") {
    return {
      mode: "record",
      recordIfMissing: true,
      recordFailedRequests: true,
    };
  }
  if (mode === "record_missing") {
    return {
      mode: "replay",
      recordIfMissing: true,
      recordFailedRequests: true,
    };
  }
  return {
    mode: "replay",
    recordIfMissing: false,
    recordFailedRequests: false,
  };
};
