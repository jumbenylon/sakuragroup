import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/auth/",
          "/login",
          "/dashboard/",
          "/admin/",
          "/private/",
          "/preview/",
          "/_next/",
        ],
      },
    ],
    sitemap: "https://sakuragroup.co.tz/sitemap.xml",
  };
}
