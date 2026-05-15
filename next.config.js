/** @type {import('next').NextConfig} */
console.log('[next.config.js] loaded — output: export')
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    remotePatterns: [],
  },
}

module.exports = nextConfig
