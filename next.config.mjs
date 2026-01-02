/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // We use the older key name required by some 14.1.0 environments
    serverComponentsExternalPackages: ["@node-rs/argon2"],
    // We keep the newer one just in case
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
