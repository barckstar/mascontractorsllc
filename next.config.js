/** @type {import('next').NextConfig} */

const nextConfig = {
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
            // Redirect legacy specialties routes to home or contact
            {
                source: '/specialties/tile',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/specialties/commercial_cabinetry',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/specialties/finish_trim_carpentry',
                destination: '/contact',
                permanent: true,
            },
            {
                source: '/specialties/:slug',
                destination: '/services',
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

