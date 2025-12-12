/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['gateway.makerstech.co', 's3.makerstech.co', '154.38.181.22', 's3.oceanoscuba.com.co'],
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
      {
        protocol: 'https',
        hostname: 's3.oceanoscuba.com.co',
        pathname: '/**',
      },
    ],
    // Permitir imágenes no optimizadas desde dominios externos
    unoptimized: false,
    // Configuración adicional para imágenes externas
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Permitir cargar imágenes desde cualquier origen cuando se usa <img>
    loader: 'default',
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Content-Type, Authorization',
          },
        ],
      },
      // Headers específicos para recursos de imágenes
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
        ],
      },
    ];
  },
  // Configuración de rewrites para hacer proxy de imágenes si es necesario
  async rewrites() {
    return [
      {
        source: '/api/images/:path*',
        destination: 'http://154.38.181.22:9000/oceanoscuba/:path*',
      },
    ];
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_LICENSE_KEY: process.env.NEXT_PUBLIC_LICENSE_KEY,
  },
};

export default nextConfig;
