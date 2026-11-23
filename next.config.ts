import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d168rbuicf8uyi.cloudfront.net",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
};

export default nextConfig;
