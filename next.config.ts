import type { NextConfig } from "next";

// Only generate source maps in specific environments
const shouldGenerateSourceMaps = process.env.GENERATE_SOURCEMAP !== 'false'

const nextConfig: NextConfig = {
  // Enable source maps explicitly
  productionBrowserSourceMaps: shouldGenerateSourceMaps,
  
  // Force Babel over SWC if needed for better source map support
  swcMinify: false,
  
  // Configure webpack for better source map generation
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!dev) {
      // Production: Use source-map for better debugging
      config.devtool = 'source-map'
    } else {
      // Development: Use eval-source-map for faster builds
      config.devtool = 'eval-source-map'
    }
    
    // Remove any webpack plugins that might interfere with source map generation
    // Temporarily disable optimization plugins to isolate the issue
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        minimize: false, // Temporarily disable minification for source map debugging
        splitChunks: {
          ...config.optimization?.splitChunks,
          cacheGroups: {
            ...config.optimization?.splitChunks?.cacheGroups,
            default: {
              ...config.optimization?.splitChunks?.cacheGroups?.default,
              minChunks: 1,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }
    
    return config
  },
  
  // Experimental features for better source map support
  experimental: {
    // Disable SWC and use Babel for better source map support
    forceSwcTransforms: false,
  },
};

export default nextConfig;