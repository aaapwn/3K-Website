import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  httpAgentOptions: {
    keepAlive: true,
  }
};

export default nextConfig;
