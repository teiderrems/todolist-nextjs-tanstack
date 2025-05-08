import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions:{
      allowedOrigins:["http://localhost:3000"],
    },
  },
  images: {
    domains: ["images.unsplash.com"],
  }
};

export default nextConfig;
