/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      allowedOrigins: [
        "crispy-space-system-55g7x5p66vp399g-3000.app.github.dev",
        "localhost:3000"
      ]
    }
  }
}

module.exports = nextConfig
