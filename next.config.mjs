/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { pathname: "**", hostname: "png.pngtree.com", protocol: "https" },
    ],
  },
};

export default nextConfig;
