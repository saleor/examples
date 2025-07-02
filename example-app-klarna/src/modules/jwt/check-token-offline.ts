import { type Permission } from "@saleor/app-sdk/types";
import { decodeJwt } from "jose";

const isPermissionsArray = (permissions: unknown): permissions is Permission[] => {
  return Array.isArray(permissions);
};

export const checkTokenPermissions = (
  token: string | undefined,
  permissions: Permission[],
): boolean => {
  if (!token) {
    return false;
  }

  const claims = decodeJwt(token);
  if (isPermissionsArray(claims.user_permissions)) {
    const userPermissions = new Set(claims.user_permissions);
    return permissions.every((requiredPermission) => userPermissions.has(requiredPermission));
  }

  return false;
};
