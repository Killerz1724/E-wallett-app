import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    externalDir: false,
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "evqrdlwphgtlcoafoaas.supabase.co",
      },
    ],
  },

  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/dashboard",
  //       permanent: true,
  //     },
  //   ];
  // },
};

export default nextConfig;
