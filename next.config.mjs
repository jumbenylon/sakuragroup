/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["@node-rs/argon2"],
  },
  
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/**', 
      },
      {
        protocol: 'https',
        hostname: 'images.google.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
