/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone", // CRITICAL: This enables Docker optimization for Cloud Run
  reactStrictMode: true,
  images: {
    domains: [], // Add domains here if you use external images later
  },
};

export default nextConfig;
