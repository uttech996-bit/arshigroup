import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "ARSHI GROUP", template: "%s | ARSHI GROUP" },
  description: "Digital solutions, e-commerce, web development, performance marketing, AI automation and creative services.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
