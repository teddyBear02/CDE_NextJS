/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      serverActions: true,
    },

    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.module.rules.push({
          test: /\.(pdf)$/i,
          loader: 'file-loader',
          options: {
              name: './public/document.pdf'
          }
     })
        return config;
    },

  };
module.exports = nextConfig
