/** @type {import('next').NextConfig} */
const nextConfig = {
  // This tells Next.js NOT to bundle argon2, keeping the binary intact
  serverExternalPackages: ["@node-rs/argon2"],
  output: "standalone",
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        port: '',
        pathname: '/sakura-web/**',
      },
    ],
  },
};

export default nextConfig;
