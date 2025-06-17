try {
	var url = new URL(process.env.SALEOR_API_URL);
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: url ? [url.hostname] : [],
	},
};

module.exports = nextConfig;
