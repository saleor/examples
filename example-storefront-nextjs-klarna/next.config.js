try {
	var url = new URL(process.env.NEXT_PUBLIC_SALEOR_API_URL);
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		remotePatterns: url ? [{ hostname: url.hostname }] : [],
	},
};

module.exports = nextConfig;
