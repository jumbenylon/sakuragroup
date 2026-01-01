import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sakuragroup.co.tz'
  
  // High Priority: The Core Pillars we just built
  const routes = [
    '',             // Home
    '/industrial',  // RCS / Roof Cleaning
    '/marketing',   // Sakura Agency
    '/media',       // Think Loko
    '/hosting',     // SakuraHost
    '/sakurapay',   // Fintech
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 1.0,
  }))

  // Secondary Priority: The rest of the ecosystem (if pages exist or redirect)
  const secondaryRoutes = [
    '/logistics',
    '/travel',
    '/learn',       // The Terminal
    '/axis',        // Comm API
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...routes, ...secondaryRoutes]
}
