import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

const services = [
  "Web Development",
  "E-commerce & Shopify",
  "Performance Marketing",
  "SEO & Growth",
  "AI & Automation",
  "Brand & Creative",
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">
        <Link href="/" className="text-xl font-black tracking-tight">ARSHI<span className="text-blue-500">.</span>GROUP</Link>
        <div className="hidden items-center gap-8 text-sm text-slate-300 md:flex">
          <Link href="/services" className="hover:text-white">Services</Link>
          <Link href="/portfolio" className="hover:text-white">Portfolio</Link>
          <Link href="/about" className="hover:text-white">About</Link>
          <Link href="/contact" className="rounded-full bg-white px-5 py-2.5 font-semibold text-slate-950 hover:bg-blue-50">Start a Project</Link>
        </div>
      </nav>

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-8 lg:pb-32 lg:pt-28">
        <div className="absolute -right-32 top-0 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
        <div className="relative max-w-5xl">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-sm font-medium text-blue-300">
            <Sparkles size={16} /> Digital solutions built for growth
          </div>
          <h1 className="text-5xl font-black tracking-tight sm:text-7xl lg:text-8xl lg:leading-[0.95]">
            Turn your ideas into <span className="text-blue-500">digital growth.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
            ARSHI GROUP helps ambitious businesses build better websites, launch e-commerce stores, grow with performance marketing, and automate repetitive work.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-bold shadow-lg shadow-blue-600/20 hover:bg-blue-500">Start a Project <ArrowRight size={18} /></Link>
            <Link href="/services" className="rounded-full border border-white/10 bg-white/5 px-7 py-4 font-bold hover:bg-white/10">Explore Services</Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.03]">
        <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 sm:grid-cols-2 lg:grid-cols-3 lg:px-8">
          {services.map((service) => (
            <div key={service} className="flex items-center gap-3 text-slate-200">
              <CheckCircle2 className="text-blue-500" size={20} /> {service}
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">Why ARSHI GROUP</p>
        <h2 className="mt-4 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">One team for your digital presence.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["Strategy first", "We connect your technology, marketing and business goals before building."],
            ["Built to scale", "Modern architecture designed for performance, security and future expansion."],
            ["Long-term partner", "From first launch to ongoing growth, we stay focused on measurable outcomes."],
          ].map(([title, text]) => (
            <article key={title} className="rounded-3xl border border-white/10 bg-white/[0.04] p-7">
              <h3 className="text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © {new Date().getFullYear()} ARSHI GROUP. All rights reserved.
      </footer>
    </main>
  );
}
