export const SALEOR_API_URL = process.env.NEXT_PUBLIC_SALEOR_API_URL as string;

if (!SALEOR_API_URL) {
  throw new Error("NEXT_PUBLIC_SALEOR_API_URL environment variable is not set");
}

export const DEFAULT_CHANNEL = process.env.NEXT_PUBLIC_DEFAULT_CHANNEL as string;

if (!DEFAULT_CHANNEL) {
  throw new Error("NEXT_PUBLIC_DEFAULT_CHANNEL environment variable is not set");
}
