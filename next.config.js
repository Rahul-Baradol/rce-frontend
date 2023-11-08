/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    CREATE_PROFILE_API: process.env.CREATE_PROFILE_API
  }
};