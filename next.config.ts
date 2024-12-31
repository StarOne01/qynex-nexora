import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images : {
    remotePatterns : [
      {
        protocol: 'https',
        hostname: 'i.cdn.newsbytesapp.com',
      }
    ]
  }
};

export default nextConfig;
