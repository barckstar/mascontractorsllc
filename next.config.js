/** @type {import('next').NextConfig} */

const nextConfig = {
    trailingSlash: false,
    experimental: {
        optimizePackageImports: ['framer-motion', 'react-icons'],
        // Inlina el CSS en el HTML → elimina el render-blocking del <link> de estilos
        inlineCss: true,
    },
    images: {
        // AVIF primero (mejor compresión que WebP) → imagen LCP más liviana
        formats: ['image/avif', 'image/webp'],
        qualities: [60, 75],
        remotePatterns: [
            { protocol: 'https', hostname: 'mascontractors.com' },
        ],
    },
    // English keeps its original, unprefixed URLs: /about is served by
    // app/[lang]/about with lang=en. afterFiles runs after public/ and static
    // routes (/review, /sitemap.xml, images) but before dynamic routes, so only
    // page URLs are rewritten. /es/... matches app/[lang] directly.
    async rewrites() {
        return {
            afterFiles: [
                { source: '/', destination: '/en' },
                { source: '/:path((?!es(?:/|$)|en(?:/|$)|_next/).*)', destination: '/en/:path' },
            ],
        };
    },
    async redirects() {
        return [
            // /en/... is an internal path; send anyone who types it to the real URL.
            { source: '/en', destination: '/', permanent: true },
            { source: '/en/:path*', destination: '/:path*', permanent: true },
            // Redirect www to non-www
            {
                source: '/:path*',
                has: [
                    {
                        type: 'host',
                        value: 'www.mascontractors.com',
                    },
                ],
                destination: 'https://mascontractors.com/:path*',
                permanent: true,
            },
            // Redirect legacy specialties routes to relevant service pages
            {
                source: '/specialties/tile',
                destination: '/services/tile-work',
                permanent: true,
            },
            {
                source: '/specialties/commercial_cabinetry',
                destination: '/services/kitchen-remodeling',
                permanent: true,
            },
            // Typo variant found in GSC (Spanish spelling, single m)
            {
                source: '/specialties/comercial_cabinetry',
                destination: '/services/kitchen-remodeling',
                permanent: true,
            },
            {
                source: '/specialties/finish_trim_carpentry',
                destination: '/services/trim-carpentry',
                permanent: true,
            },
            {
                source: '/specialties/:slug',
                destination: '/services',
                permanent: true,
            },
            // Legacy /projects routes → gallery
            {
                source: '/projects',
                destination: '/gallery',
                permanent: true,
            },
            {
                source: '/projects/:slug',
                destination: '/gallery',
                permanent: true,
            },
            // Legacy Cloudflare email protection link found in Search Console
            {
                source: '/cdn-cgi/l/email-protection',
                destination: '/contact',
                permanent: true,
            }
        ]
    }
};

export default nextConfig;

