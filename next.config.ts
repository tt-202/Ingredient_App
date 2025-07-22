import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  output: "standalone", // required for Vercel deployments

  async rewrites() {
    return [
      // Redirect all unmatched routes to Next.js app
      {
        source: "/:path*",
        destination: "/",
      },
    ];
  },

  webpack: (config) => {
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      exclude: /__tests__/,
    });
    return config;
  },
};

export default nextConfig;
