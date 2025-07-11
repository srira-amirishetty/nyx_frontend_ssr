/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: false,
  output: "standalone",
  webpack: (config) => {
    config.externals.push({
      "utf-8-validate": "commonjs utf-8-validate",
      bufferutil: "commonjs bufferutil",
      canvas: "commonjs canvas",
    });
    // config.infrastructureLogging = { debug: /PackFileCache/ };
    return config;
  },
  generateEtags: false,
  poweredByHeader: false,
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.nyx.today" }],
        destination: "https://nyx.today/:path*",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, no-cache, must-revalidate, proxy-revalidate',
          },
        ],
      },
    ];
  },
  images: {
    domains: ["assets.nyx.today", "storage.googleapis.com"],
    unoptimized: true,
  },
  env: {
    VITE_API_BASE_URL: process.env.NEXT_PUBLIC_AGENT_API_URL,
  },
};
module.exports = nextConfig;
