/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['gateway.makerstech.co', 's3.makerstech.co'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LICENSE_KEY: process.env.NEXT_PUBLIC_LICENSE_KEY,
  },
};

export default nextConfig;
