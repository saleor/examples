import { type HttpMethod } from "../lib/api-response";
import { type JSONValue } from "../types";

export const host = "https://localhost:4213";

export const createRequestMock = (
  method: HttpMethod,
  body?: JSONValue,
  headers = new Headers(),
) => {
  if (body) {
    headers.append("Content-Type", "application/json");
  }

  return new Request(`${host}/api/route`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });
};
