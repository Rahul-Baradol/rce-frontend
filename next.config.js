/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
}

module.exports = {
  nextConfig,
  env: {
    HOME_URL: process.env.HOME_URL,
    CREATE_PROFILE_API: process.env.CREATE_PROFILE_API,
    LOGIN_API: process.env.LOGIN_API,
    JUDGESOCKETURL: process.env.JUDGESOCKETURL,
    JWT_KEY: process.env.JWT_KEY
  }
};