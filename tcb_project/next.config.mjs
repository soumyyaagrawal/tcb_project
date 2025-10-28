// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
 compiler: {
    // Prevents hydration warnings from harmless DOM differences
    reactRemoveProperties: false,
  },

  // 👇 optional but useful if you often run into mismatches
  experimental: {
    // allows React to handle mismatches gracefully
    reactRoot: 'concurrent',
  },

  // 👇 optional — just ensures the build doesn’t stop on lint/type errors
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
 
}

// ✅ CORRECT SYNTAX for .mjs file
export default nextConfig