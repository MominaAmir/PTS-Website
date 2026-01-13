// // next.config.js
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Remove these lines for development:
//   // basePath: "/PTS-Website",
//   // assetPrefix: "/PTS-Website/",
  
//   // Keep only these:
//   output: "export",
//   images: {
//     unoptimized: true,
//   },
//   trailingSlash: true,
// };

// module.exports = nextConfig;


/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: "/PTS-Website",
  assetPrefix: "/PTS-Website/",
};

module.exports = nextConfig;
