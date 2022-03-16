/** @type {import('next').NextConfig} */
// import withPWA from 'next-pwa'
// const nextConfig = {
//   reactStrictMode: true,
// }
const withPWA = require("next-pwa");

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
