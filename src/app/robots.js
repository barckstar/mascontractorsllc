export default function robots() {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/cdn-cgi/'],
            }
        ],
        sitemap: 'https://mascontractors.com/sitemap.xml',
    }
}
