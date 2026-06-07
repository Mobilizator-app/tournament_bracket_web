/** @type {import('next').NextConfig} */
const API_BASE = process.env.API_BASE ?? 'http://localhost:8080';

const nextConfig = {
  reactStrictMode: true,
  // Proxy API + SSE stream to the Go backend in dev so the browser talks to a
  // same-origin path (no CORS, EventSource works through the Next dev server).
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${API_BASE}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
