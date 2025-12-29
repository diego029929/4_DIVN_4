import path from "path";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  eslint: {
    ignoreDuringBuilds: true
  },

  typescript: {
    ignoreBuildErrors: true
  },

  webpack: (config) => {
    config.resolve.alias['@'] = path.resolve('.');
    return config;
  }
};

export default nextConfig;
