/** @type {import('next').NextConfig} */

const withPlugins = require("next-compose-plugins");
const optimizedImages = require("next-optimized-images");
module.exports = withPlugins([
  [
    optimizedImages,
    {
      mozjpeg: {
        quality: 80,
      },
      pngquant: {
        speed: 3,
        strip: true,
        verbose: true,
      },
      imagesPublicPath: "/wallisconsultancy/_next/static/images/",
    },
  ],
  {
    assetPrefix: "/technews/",
    basePath: "/technews",
    env,
    reactStrictMode: true,
    concurrentFeatures: true,
  },
]);
