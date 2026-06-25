/** @type {import('next').NextConfig} */

const nextConfig = {
    trailingSlash: false,
    swcMinify: true,
    experimental: {
        optimizePackageImports: ['framer-motion', 'react-icons'],
    },
    images: {
        domains: [
            'mascontractors.com'
        ]
    },
    async redirects() {
        return [
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

