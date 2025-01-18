import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    NEXTAUTH_SECRET: "YOUR_KEY_HERE",
  },
};

export default nextConfig;
