/** @type {import('next').NextConfig} */
const nextConfig = {
  // FOR NEXT.JS 14.1.0, THIS MUST BE INSIDE EXPERIMENTAL
  experimental: {
    serverExternalPackages: ["@node-rs/argon2"],
  },
  
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/sakura-web/**',
      },
    ],
  },
};

export default nextConfig;
