import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',             // Backend API routes (System internals)
        '/admin/',           // Root Admin (Security)
        '/axis/admin/',      // Axis specific Admin
        '/axis/portal/',     // Client Dashboard (Private Data)
        '/axis/login/',      // Auth screens
        '/login/',           // General Login
        '/_next/',           // Next.js build files
      ],
    },
    sitemap: 'https://sakuragroup.co.tz/sitemap.xml',
  }
}
