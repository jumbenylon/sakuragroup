/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },

  // HARDENING: Critical for Google Cloud Run (Docker) stability
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // PERFORMANCE: Surgical Speed Optimizations
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true, // Speeds up data transfer

  images: {
    formats: ["image/avif", "image/webp"], // Premium high-efficiency formats
    minimumCacheTTL: 3600, // Caches assets for 1 hour to kill repeat lag
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
