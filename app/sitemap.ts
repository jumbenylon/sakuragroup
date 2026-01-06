import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sakuragroup.co.tz'

  // 1. CORE BRAND (Highest Priority)
  const coreRoutes = [
    '',             // Home
    '/about',       // Ni Sisi / Founders
    '/contact',     // Global Contact
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

  // 2. MAIN PILLARS (Matches your "9 Pillars" Grid)
  const pillarRoutes = [
    '/axis',              // Comm API
    '/agency',            // Marketing & Strategy
    '/hosting',           // Cloud Infrastructure
    '/rcs',               // Construction & Cleaning
    '/logistics',         // Supply Chain
    '/sakurapay',         // Fintech
    '/thinkloko',         // Media/Podcast
    '/travel',            // Tourism
    '/learn',             // Education
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 3. SERVICE DEEP-DIVES (The "Money" Pages for SEO Ranking)
  const serviceRoutes = [
    // Axis Ecosystem
    '/axis/developers',
    '/axis/industries',
    '/axis/pricing',

    // Agency Verticals (matches your folder structure)
    '/agency/strategy',
    '/agency/branding',
    '/agency/design',
    '/agency/content',
    '/agency/digital',
    '/agency/advertising',
    '/agency/tech',
    '/agency/research',
    '/agency/crm',

    // Hosting Infrastructure
    '/hosting/vps',
    '/hosting/web',
    '/hosting/domains',
    '/hosting/email',
    '/hosting/security',
    '/hosting/managed',
    '/hosting/support',

    // RCS / Industrial
    '/rcs/cleaning',
    '/rcs/restoration',
    '/rcs/waterproofing',
    '/rcs/installation',
    '/rcs/construction',
    '/rcs/repairs',

    // Travel Sectors
    '/travel/aviation',
    '/travel/marine',
    '/travel/safari',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...coreRoutes, ...pillarRoutes, ...serviceRoutes]
}
