import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-24">
        <p className="mb-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p>
        <h1 className="max-w-5xl text-5xl font-bold tracking-tight sm:text-6xl lg:text-8xl">Digital solutions built for growth.</h1>
        <p className="mt-8 max-w-2xl text-lg leading-8 text-slate-300">Web development, e-commerce, performance marketing, SEO, AI automation and creative solutions for ambitious businesses.</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link href="/services" className="rounded-full bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-500">Explore Services</Link>
          <Link href="/contact" className="rounded-full border border-slate-700 px-6 py-3 font-semibold hover:bg-slate-900">Start a Project</Link>
        </div>
      </section>
    </main>
  );
}
