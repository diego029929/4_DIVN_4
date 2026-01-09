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
  { silent: true },
  {
    // 🔥 IMPORTANT
    org: process.env.SENTRY_ORG,
    project: process.env.SENTRY_PROJECT,
    authToken: process.env.SENTRY_AUTH_TOKEN,
    hideSourceMaps: true,
    disableLogger: true,
    dryRun: process.env.NODE_ENV !== "production",
  }
);
