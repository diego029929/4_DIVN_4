import { withSentryConfig } from "@sentry/nextjs";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    // Les erreurs TypeScript bloquent de nouveau le build.
    ignoreBuildErrors: false,
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
  
