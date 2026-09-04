import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://arshigroup.com"),
  title: { default: "ARSHI GROUP | Digital Growth Agency", template: "%s | ARSHI GROUP" },
  description: "ARSHI GROUP builds high-performance websites, e-commerce stores, growth systems, marketing campaigns and AI automation for ambitious businesses.",
  keywords: ["ARSHI GROUP", "web development", "e-commerce", "Shopify", "digital marketing", "SEO", "AI automation"],
  openGraph: {
    title: "ARSHI GROUP | Digital Growth Agency",
    description: "Digital solutions built for growth.",
    type: "website",
    siteName: "ARSHI GROUP",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
