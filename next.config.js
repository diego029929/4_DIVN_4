// next.config.js
const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    // Définit l'alias '@' pour pointer vers la racine du projet
    config.resolve.alias['@'] = path.resolve(__dirname);

    return config;
  },
};

module.exports = nextConfig;
