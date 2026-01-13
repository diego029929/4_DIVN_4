import path from "path";
import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  webpack: (config) => {
    config.resolve.alias["@"] = path.resolve(".");
    return config;
  },
};

export default withSentryConfig(
  nextConfig,
  {
    // 🔧 options Sentry (remplace l’ancien bloc `sentry`)
    silent: true,
    hideSourceMaps: true,
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
  }
);
  
