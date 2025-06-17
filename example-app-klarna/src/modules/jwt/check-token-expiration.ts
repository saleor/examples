import { decodeJwt } from "jose";
import { logger } from "@/lib/logger";

/** Checks if JWT token expired.
 * Returns false if token is still valid (note: there could be other issues)
 * or true if it expired */
export const checkTokenExpiration = (token: string | undefined): boolean => {
  if (!token) {
    return false;
  }

  const claims = decodeJwt(token);
  if (claims.exp) {
    const now = new Date().getTime();
    const expireDate = claims.exp * 1000;

    logger.trace({ claimsExp: claims.exp, now, expireDate }, "JWT token expiration time");
    return now >= expireDate;
  }

  return false;
};
