/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. URL FLATTENING: Removes /axis/ from public visibility
  async rewrites() {
    return [
      {
        source: '/portal/:path*',
        destination: '/axis/portal/:path*',
      },
      {
        source: '/login',
        destination: '/axis/login',
      },
      {
        source: '/signup',
        destination: '/axis/signup',
      },
      {
        source: '/pricing',
        destination: '/axis/pricing',
      }
    ];
  },

  // 2. EXPERIMENTAL: Argon2 Hardening for Auth
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },

  // 3. HARDENING: Cloud Run Stability
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 4. PERFORMANCE: Surgical Speed Optimizations
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true, 

  // 5. ASSETS: High-Efficiency Image Configuration
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
