import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import "./premium.css";
import "./brand.css";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { isLocale, localeDirections, type Locale } from "@/lib/i18n/config";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  metadataBase: new URL("https://arshigroup.com"),
  title: { default: "ARSHI GROUP | Digital Growth Agency", template: "%s | ARSHI GROUP" },
  description: "ARSHI GROUP builds high-performance websites, e-commerce stores, growth systems, marketing campaigns and AI automation for ambitious businesses.",
  keywords: ["ARSHI GROUP", "web development", "e-commerce", "Shopify", "WooCommerce", "digital marketing", "SEO", "AI automation"],
  authors: [{ name: "ARSHI GROUP" }], creator: "ARSHI GROUP", publisher: "ARSHI GROUP", category: "technology",
  alternates: { canonical: "/", languages: { en: "/?lang=en", ur: "/?lang=ur", "x-default": "/" } },
  openGraph: { title: "ARSHI GROUP | Digital Growth Agency", description: "Digital solutions built for growth.", type: "website", siteName: "ARSHI GROUP", url: "https://arshigroup.com/", locale: "en_US" },
  twitter: { card: "summary_large_image", title: "ARSHI GROUP | Digital Growth Agency", description: "Digital solutions built for growth." },
  icons: { icon: "/brand/arshi-icon.svg", apple: "/brand/arshi-icon.svg" },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

const themeScript = `(() => { try { const key = 'arshi-theme-v2'; const saved = localStorage.getItem(key); document.documentElement.classList.toggle('dark', saved ? saved === 'dark' : true); } catch {} })()`;
const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", name: "ARSHI GROUP", url: "https://arshigroup.com", description: "Digital growth agency providing web development, e-commerce, marketing, SEO and AI automation services.", areaServed: "Worldwide" };

function safeAsset(value: unknown, fallback: string) {
  if (typeof value !== "string" || value.length > 1000) return fallback;
  return value.startsWith("/") || value.startsWith("https://") ? value : fallback;
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const stored = cookieStore.get("arshi-locale")?.value;
  const locale: Locale = isLocale(stored) ? stored : "en";
  let lightLogo = "/brand/arshi-light.svg", darkLogo = "/brand/arshi-dark.svg";
  try {
    const s = await createClient();
    const { data } = await s.from("site_settings").select("light_logo_url,dark_logo_url").eq("id", true).maybeSingle();
    lightLogo = safeAsset(data?.light_logo_url, lightLogo);
    darkLogo = safeAsset(data?.dark_logo_url, darkLogo);
  } catch { /* Keep built-in logo when settings are unavailable. */ }
  const logoVars = { "--arshi-logo-light": `url("${lightLogo.replaceAll('"','%22')}")`, "--arshi-logo-dark": `url("${darkLogo.replaceAll('"','%22')}")` } as React.CSSProperties;
  return <html lang={locale === "ur" ? "ur-PK" : locale === "roman" ? "en-Latn" : "en"} dir={localeDirections[locale]} className="dark" style={logoVars}><head><script dangerouslySetInnerHTML={{ __html: themeScript }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /></head><body><div className="fixed right-4 top-4 z-50"><LanguageSwitcher /></div>{children}</body></html>;
}
