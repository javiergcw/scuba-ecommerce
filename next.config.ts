/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '154.38.181.22',
        port: '9000',
        pathname: '/oceanoscuba/**',
      },
      {
        protocol: 'https',
        hostname: 'gateway.makerstech.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 's3.makerstech.co',
        pathname: '/**',
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LICENSE_KEY: process.env.NEXT_PUBLIC_LICENSE_KEY,
  },
};

export default nextConfig;
