import type { MetadataRoute } from "next";
import { createClient } from "@/lib/supabase/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = "https://arshigroup.com";
  const staticPaths = ["/", "/services", "/portfolio", "/about", "/contact", "/blog", "/privacy", "/terms", "/cookies", "/disclaimer", "/services/tiktok-ads"];
  const supabase = await createClient();
  const { data: posts } = await supabase.from("blog_posts").select("slug,updated_at,published_at").eq("status", "published");
  const staticEntries = staticPaths.map((path) => ({ url: `${base}${path}`, lastModified: new Date() }));
  const postEntries = (posts ?? []).map((post) => ({ url: `${base}/blog/${encodeURIComponent(post.slug)}`, lastModified: new Date(post.updated_at || post.published_at || Date.now()) }));
  return [...staticEntries, ...postEntries];
}
