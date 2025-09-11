import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: false,
  },
  reactStrictMode: false,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evqrdlwphgtlcoafoaas.supabase.co",
      },
    ],
  },
};

module.exports = nextConfig;

export default nextConfig;
