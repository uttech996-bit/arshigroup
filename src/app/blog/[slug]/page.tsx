import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

function sanitizeHtml(input: string) {
  return input
    .replace(/<\s*(script|iframe|object|embed|form|style)[^>]*>[\s\S]*?<\/\s*\1\s*>/gi, "")
    .replace(/<\s*(script|iframe|object|embed|form|style)[^>]*\/?>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(?:"[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, "$1=\"#\"");
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const supabase = await createClient(); const { data: post } = await supabase.from("blog_posts").select("title,excerpt,seo_title,seo_description,canonical_url,cover_image_url").eq("slug", slug).eq("status", "published").maybeSingle();
  if (!post) return { title: "Article not found | ARSHI GROUP" };
  return { title: post.seo_title || post.title, description: post.seo_description || post.excerpt || undefined, alternates: post.canonical_url ? { canonical: post.canonical_url } : undefined, openGraph: { title: post.seo_title || post.title, description: post.seo_description || post.excerpt || undefined, images: post.cover_image_url ? [post.cover_image_url] : undefined, type: "article" } };
}

export default async function BlogArticle({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const supabase = await createClient();
  const { data: post } = await supabase.from("blog_posts").select("*,blog_categories(name,slug)").eq("slug", slug).eq("status", "published").maybeSingle();
  if (!post || (post.published_at && new Date(post.published_at) > new Date())) notFound();
  const content = post.content ? sanitizeHtml(post.content) : "";
  return <main className="section-wrap !py-12 sm:!py-20"><article className="mx-auto max-w-4xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-[.25em] text-blue-600">{post.blog_categories?.name || "ARSHI GROUP Insights"}</p><h1 className="mt-5 text-4xl font-black tracking-tight sm:text-6xl">{post.title}</h1><div className="mt-5 text-sm text-muted-foreground">{post.published_at ? new Date(post.published_at).toLocaleDateString() : ""}{post.reading_time_minutes ? ` · ${post.reading_time_minutes} min read` : ""}</div></div>{post.cover_image_url && <img src={post.cover_image_url} alt="" className="mt-10 aspect-[16/7] w-full rounded-3xl object-cover" />}{content ? <div className="prose prose-slate mt-10 max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: content }} /> : <p className="mt-10">{post.excerpt || "This article is being prepared."}</p>}</article></main>;
}
