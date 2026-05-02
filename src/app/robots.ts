import type { MetadataRoute } from "next";

const SITE_URL = "https://azstructuralexperts.com";

/**
 * robots.txt — allow all public pages to be crawled, but keep the admin
 * panel out of the index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/admin/"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
