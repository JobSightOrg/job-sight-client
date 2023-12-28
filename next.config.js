const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["source.unsplash.com", "lh3.googleusercontent.com"],
  },
  webpack: (config, { isServer }) => {
    config.resolve.alias["@"] = path.resolve(__dirname);
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
};

module.exports = nextConfig;
