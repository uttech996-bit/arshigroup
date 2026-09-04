import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://arshigroup.com";
  return ["/", "/services", "/portfolio", "/about", "/contact"].map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
