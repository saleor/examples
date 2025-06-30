import { ExternalProvider, SaleorExternalAuth } from "@saleor/auth-sdk";
import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

const saleorApiUrl = process.env.NEXT_PUBLIC_SALEOR_URL;
if (!saleorApiUrl) throw new Error("NEXT_PUBLIC_SALEOR_URL is not set");

const externalAuth = new SaleorExternalAuth(saleorApiUrl, ExternalProvider.OpenIDConnect);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const state = searchParams.get("state");
  const code = searchParams.get("code");

  if (!state || !code) {
    throw new Error("Missing state or code");
  }

  const { token } = await externalAuth.obtainAccessToken({ state, code });

  const response = NextResponse.redirect(new URL("/", request.nextUrl));

  response.headers.set("Set-Cookie", serialize("token", token, { path: "/" }));

  return response;
}
