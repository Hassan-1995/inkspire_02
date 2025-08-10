import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // output: 'export',
  /* config options here */
   images: {
    // domains: ["lh3.googleusercontent.com"],
    remotePatterns: [
    {
      protocol: 'https',
      hostname: 'res.cloudinary.com',
      pathname: '**',
    },
    {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
  ],
  },
};

export default nextConfig;
