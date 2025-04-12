import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gajrsoefybqm4ylo.public.blob.vercel-storage.com',
        port: '',
        pathname: '/tinder-yt/**',
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb',
    }
  },
};

export default nextConfig;
