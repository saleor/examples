import { type JSONValue } from "../types";

export const getResponse =
  (status: number) =>
  (data: JSONValue, headers: Headers = new Headers()) => {
    if (data) {
      headers.append("Content-Type", "application/json");
    }
    return new Response(JSON.stringify(data), {
      status,
      headers,
    });
  };

export const HttpStatus = {
  OK: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  URITooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImaTeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
} as const;
export type HttpStatus = (typeof HttpStatus)[keyof typeof HttpStatus];

export type HttpMethod = "GET" | "POST" | "PATCH" | "PUT" | "DELETE" | "HEAD";

export const ok = getResponse(HttpStatus.OK);
export const created = getResponse(HttpStatus.Created);
export const noContent = getResponse(HttpStatus.NoContent);

export const badRequest = getResponse(HttpStatus.BadRequest);
export const unauthorized = getResponse(HttpStatus.Unauthorized);
export const forbidden = getResponse(HttpStatus.Forbidden);
export const notFound = getResponse(HttpStatus.NotFound);
export const methodNotAllowed = (methods: string[]) =>
  getResponse(HttpStatus.MethodNotAllowed)(
    "Method not allowed",
    new Headers({ Allow: methods.join(", ") }),
  );
export const conflict = getResponse(HttpStatus.Conflict);
