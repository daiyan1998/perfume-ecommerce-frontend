/** @type {import('next').NextConfig} */
const API_URL = process.env.API_URL;
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        // destination: "http://localhost:8000/api/:path",
        destination: "https://ecommerce-sabbir.onrender.com/api/:path",
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

module.exports = nextConfig;
