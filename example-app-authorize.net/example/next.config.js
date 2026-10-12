try {
	var url = new URL(process.env.SALEOR_API_URL);
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: false,
	images: {
		remotePatterns: url ? [{ hostname: url.hostname }] : [],
	},
};

module.exports = nextConfig;
