import Link from "next/link";
import {
  ArrowRight,
  Bot,
  Check,
  Code2,
  Megaphone,
  Menu,
  Search,
  ShoppingBag,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const services = [
  { title: "Web Development", text: "Fast, conversion-focused websites and web applications.", icon: Code2 },
  { title: "E-commerce", text: "Shopify, WooCommerce and custom commerce experiences.", icon: ShoppingBag },
  { title: "Performance Marketing", text: "Data-driven Meta, TikTok, Google and social campaigns.", icon: Megaphone },
  { title: "SEO & Growth", text: "Technical SEO and content systems built for sustainable growth.", icon: Search },
  { title: "AI & Automation", text: "Smarter workflows, assistants and business automations.", icon: Bot },
  { title: "Brand & Creative", text: "Distinct visual systems that make businesses memorable.", icon: Sparkles },
];

const stats = [
  ["Digital-first", "Strategy"],
  ["Conversion", "Focused"],
  ["Built to", "Scale"],
  ["Long-term", "Partner"],
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050816] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-black tracking-tight sm:text-2xl">ARSHI<span className="text-blue-500">.</span>GROUP</Link>
          <div className="hidden items-center gap-8 md:flex">
            <Link href="/services" className="text-sm text-slate-300 transition hover:text-white">Services</Link>
            <Link href="/portfolio" className="text-sm text-slate-300 transition hover:text-white">Portfolio</Link>
            <Link href="/about" className="text-sm text-slate-300 transition hover:text-white">About</Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-blue-50">Start a Project <ArrowRight size={16} /></Link>
          </div>
          <Link href="/contact" aria-label="Start a project" className="rounded-full border border-white/10 p-3 md:hidden"><Menu size={20} /></Link>
        </nav>
      </header>

      <section className="relative isolate">
        <div className="pointer-events-none absolute left-1/2 top-[-180px] -z-10 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-600/15 blur-[120px]" />
        <div className="mx-auto grid min-h-[720px] max-w-7xl items-center gap-14 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8 lg:py-28">
          <div>
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-500/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-blue-300 sm:text-sm"><span className="h-2 w-2 rounded-full bg-blue-400" /> Digital growth partner</div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] sm:text-6xl lg:text-8xl">We build <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">digital systems</span> that move businesses forward.</h1>
            <p className="mt-8 max-w-2xl text-base leading-7 text-slate-300 sm:text-xl sm:leading-8">ARSHI GROUP combines development, e-commerce, performance marketing, SEO and AI automation into one focused growth partner.</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-bold shadow-2xl shadow-blue-600/20 transition hover:-translate-y-1 hover:bg-blue-500">Start a Project <ArrowRight size={18} /></Link>
              <Link href="/portfolio" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-4 font-bold transition hover:-translate-y-1 hover:bg-white/[0.08]">View Our Work</Link>
            </div>
            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map(([top, bottom]) => <div key={top} className="rounded-2xl border border-white/10 bg-white/[0.035] p-4"><p className="text-sm font-bold text-white">{top}</p><p className="mt-1 text-xs text-slate-500">{bottom}</p></div>)}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="absolute -inset-8 rounded-[3rem] bg-blue-600/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-white/[0.055] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-xs uppercase tracking-[0.2em] text-blue-300">Growth system</p><p className="mt-1 text-lg font-bold">ARSHI / DIGITAL</p></div><Zap className="text-blue-400" /></div>
              <div className="mt-6 space-y-3">
                {["Strategy & positioning", "High-performance build", "Acquisition & growth", "Automation & optimization"].map((item, i) => <div key={item} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-4"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-sm font-bold text-blue-300">0{i + 1}</span><span className="text-sm font-semibold text-slate-200">{item}</span><Check className="ml-auto text-emerald-400" size={18} /></div>)}
              </div>
              <div className="mt-5 rounded-2xl bg-gradient-to-br from-blue-600/20 to-cyan-400/5 p-5"><p className="text-xs uppercase tracking-[0.2em] text-blue-300">The goal</p><p className="mt-2 text-2xl font-black">Better digital. Better growth.</p></div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
          {services.map(({ title, icon: Icon }) => <div key={title} className="flex items-center gap-3 border-white/10 px-4 py-6 text-xs font-semibold text-slate-300 sm:border-r sm:px-5"><Icon size={18} className="shrink-0 text-blue-400" />{title}</div>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">What we do</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">Everything you need to <span className="text-slate-500">grow online.</span></h2><p className="mt-6 text-lg leading-8 text-slate-400">From your first idea to your next stage of growth, we design the technology and marketing systems around your business.</p></div>
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ title, text, icon: Icon }) => <article key={title} className="group rounded-3xl border border-white/10 bg-white/[0.035] p-7 transition duration-300 hover:-translate-y-1 hover:border-blue-400/30 hover:bg-white/[0.055]"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400"><Icon size={23} /></div><h3 className="mt-6 text-xl font-bold">{title}</h3><p className="mt-3 text-sm leading-7 text-slate-400">{text}</p><Link href="/services" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-blue-400">Explore <ArrowRight size={15} className="transition group-hover:translate-x-1" /></Link></article>)}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-24 sm:px-6 lg:px-8 lg:pb-32">
        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-blue-600/20 via-white/[0.04] to-transparent p-8 sm:p-12 lg:p-16"><div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-300">Our approach</p><h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight sm:text-5xl">Strategy. Build. Launch. Grow.</h2><p className="mt-5 max-w-2xl text-slate-300">A practical, transparent process designed to turn ambitious ideas into measurable digital outcomes.</p></div><Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-6 py-3 font-bold text-slate-950 transition hover:bg-blue-50">Let&apos;s work together <ArrowRight size={17} /></Link></div><div className="mt-10 grid gap-3 sm:grid-cols-4">{["Discover", "Design", "Build", "Scale"].map((step, i) => <div key={step} className="rounded-2xl border border-white/10 bg-black/15 p-5"><span className="text-xs font-bold text-blue-300">0{i + 1}</span><p className="mt-3 font-bold">{step}</p></div>)}</div></div>
      </section>

      <section className="border-y border-white/10 bg-white/[0.025]">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8 lg:py-24"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-blue-400">Ready when you are</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">Have a project in mind?</h2><p className="mt-3 text-slate-400">Tell us what you&apos;re building. We&apos;ll help you find the right path forward.</p></div><Link href="/contact" className="inline-flex w-fit items-center gap-2 rounded-full bg-blue-600 px-7 py-4 font-bold shadow-xl shadow-blue-600/20 transition hover:bg-blue-500">Start the conversation <ArrowRight size={18} /></Link></div>
      </section>

      <footer className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-10 text-sm text-slate-500 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8"><div><span className="font-black text-slate-200">ARSHI<span className="text-blue-500">.</span>GROUP</span><p className="mt-1">Digital solutions built for growth.</p></div><div>© {new Date().getFullYear()} ARSHI GROUP. All rights reserved.</div></footer>
    </main>
  );
}
