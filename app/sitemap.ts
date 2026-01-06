import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sakuragroup.co.tz'

  // 1. BRAND CORE (The "Who We Are" - High Authority)
  const coreRoutes = [
    '',             // Home (Sakura Group Tanzania)
    '/about',       // Ni Sisi / Founders
    '/contact',     // Global Contact
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 1.0,
  }))

  // 2. LOGISTICS & SUPPLY CHAIN (Target: "Logistics Companies in Tanzania")
  const logisticsRoutes = [
    '/logistics',   // Main Logistics Page
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 3. MEDIA & PODCAST (Target: "Think Loko", "Tanzania Podcasts")
  const mediaRoutes = [
    '/thinkloko',   // The Podcast Home
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const, // Content updates often
    priority: 0.9,
  }))

  // 4. AXIS COMMUNICATION (Target: "Bulk SMS Tanzania", "WhatsApp API")
  const axisRoutes = [
    '/axis',              // Main Product Page
    '/axis/developers',   // API Docs (High value for tech traffic)
    '/axis/industries',   // Banking/Retail Use Cases
    '/axis/pricing',      // SMS Rates Tanzania
    '/axis/portal',       // Client Login
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }))

  // 5. INDUSTRIAL & CONSTRUCTION (Target: "Roof Cleaning Dar es Salaam", "Construction")
  const rcsRoutes = [
    '/rcs',               // Master Page
    '/rcs/cleaning',      // Roof Cleaning
    '/rcs/restoration',   // Industrial Coating
    '/rcs/waterproofing', // Waterproofing Service
    '/rcs/installation',  // Roof Installation
    '/rcs/construction',  // General Construction
    '/rcs/repairs',       // Maintenance
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 6. AGENCY SERVICES (Target: "Advertising Agency Tanzania", "Digital Marketing")
  const agencyRoutes = [
    '/agency',            // Main Agency Page
    '/agency/advertising',
    '/agency/branding',
    '/agency/digital',
    '/agency/strategy',
    '/agency/content',
    '/agency/tech',
    '/agency/research',
    '/agency/design',
    '/agency/crm',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 7. CLOUD INFRASTRUCTURE (Target: "Web Hosting Tanzania", "VPS")
  const hostingRoutes = [
    '/hosting',           // Cloud Home
    '/hosting/vps',
    '/hosting/web',
    '/hosting/domains',   // .co.tz Domains
    '/hosting/email',
    '/hosting/security',
    '/hosting/managed',
    '/hosting/support',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  // 8. OTHER VERTICALS
  const otherRoutes = [
    '/sakurapay',         // Fintech
    '/travel',            // Tourism
    '/learn',             // Education
    '/travel/aviation',
    '/travel/marine',
    '/travel/safari',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [
    ...coreRoutes,
    ...logisticsRoutes,
    ...mediaRoutes,
    ...axisRoutes,
    ...rcsRoutes,
    ...agencyRoutes,
    ...hostingRoutes,
    ...otherRoutes
  ]
}
