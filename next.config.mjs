/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'],
    remotePatterns: [{ protocol: 'https', hostname: 'ufts.io', port: '' }],
  },
};

export default nextConfig;
