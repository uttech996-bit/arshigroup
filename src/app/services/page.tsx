import Link from "next/link";

const services = [
  ["Web Development", "Fast, responsive websites and web applications built around your business goals."],
  ["E-commerce", "Shopify, WooCommerce and custom commerce experiences designed to convert."],
  ["Performance Marketing", "Data-driven Meta, TikTok, Google, Snapchat and Pinterest campaigns."],
  ["SEO & Growth", "Technical SEO, content strategy and conversion improvements for sustainable growth."],
  ["AI & Automation", "Custom workflows and AI-powered systems that reduce repetitive work."],
  ["Brand & Creative", "Professional visual systems, creative assets and digital brand experiences."],
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-blue-400">← ARSHI GROUP</Link>
        <p className="mt-20 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">Services</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Everything you need to grow online.</h1>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map(([title, description]) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <h2 className="text-xl font-bold">{title}</h2>
              <p className="mt-3 leading-7 text-slate-400">{description}</p>
            </article>
          ))}
        </div>
        <Link href="/contact" className="mt-12 inline-block rounded-full bg-blue-600 px-7 py-4 font-bold hover:bg-blue-500">Discuss your project</Link>
      </div>
    </main>
  );
}
