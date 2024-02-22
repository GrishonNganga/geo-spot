/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains:
            ['firebasestorage.googleapis.com'],
        formats: ['image/avif', 'image/webp'],
    },
    // typescript: {
    //     // !! WARN !!
    //     // Dangerously allow production builds to successfully complete even if
    //     // your project has type errors.
    //     // !! WARN !!
    //     ignoreBuildErrors: true,
    // },
};

export default nextConfig;
