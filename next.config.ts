import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },

  // Required for Vercel deployments so it runs as a standalone app
  output: "standalone",

  // Ensure all paths work (e.g., refreshing /settings won't 404)
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "/", // Let Next.js handle all routes
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
