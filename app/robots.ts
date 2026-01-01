import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // Good practice to block a private folder if you ever make one
    },
    sitemap: 'https://sakuragroup.co.tz/sitemap.xml',
  }
}
