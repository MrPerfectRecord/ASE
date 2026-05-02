import type { MetadataRoute } from "next";

const SITE_URL = "https://azstructuralexperts.com";

/**
 * Sitemap submitted to Google Search Console so the crawler discovers
 * every public page.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/services/structural-design`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/retrofit-design`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/truss-design`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/services/expert-witness-services`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/careers`, lastModified, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
