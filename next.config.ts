import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Documentele din knowledge/ (inclusiv knowledge/general/) sunt citite la rulare de asistentul virtual — trebuie incluse în funcția de pe Vercel
  outputFileTracingIncludes: {
    '/api/chat': ['./knowledge/**/*'],
  },
};

export default nextConfig;
