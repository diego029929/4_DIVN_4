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

  sentry: {
    hideSourceMaps: true, // 🔐 important en prod
  },
};

export default withSentryConfig(
  nextConfig,
  {
    silent: true, // pas de spam dans les logs
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
  }
);
    
