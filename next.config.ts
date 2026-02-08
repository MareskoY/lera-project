import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "z.cdrst.com",
      },
      {
        protocol: "https",
        hostname: "y.cdrst.com",
      },
      {
        protocol: "https",
        hostname: "x.cdrst.com",
      },
    ],
  },
};

export default nextConfig;
