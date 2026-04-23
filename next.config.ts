import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'luxury-drip.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'multi-tenant-portal-murex.vercel.app',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.example.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'multi-tenant.swiftnine.com',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'multi-tenant.swiftnine.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;