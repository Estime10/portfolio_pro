import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/metadata/get-site-url/getSiteUrl";
import { getSitemapRoutes } from "@/lib/metadata/sitemap-routes/getSitemapRoutes";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();

  return getSitemapRoutes().map((pathname) => ({
    url: new URL(pathname, siteUrl).toString(),
    lastModified: new Date(),
    changeFrequency: pathname === "/" || pathname === "/home" ? "weekly" : "monthly",
    priority: pathname === "/" || pathname === "/home" ? 1 : pathname.startsWith("/projects/") ? 0.85 : 0.8,
  }));
}
