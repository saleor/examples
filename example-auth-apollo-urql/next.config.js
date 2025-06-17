/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "*.saleor.cloud",
      },
    ],
  },
};

module.exports = nextConfig;
