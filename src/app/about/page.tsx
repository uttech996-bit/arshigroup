import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="text-sm font-semibold text-blue-400">← ARSHI GROUP</Link>
        <div className="mt-20">
          <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-400">About us</p>
          <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">A digital partner focused on real business outcomes.</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-slate-300">ARSHI GROUP combines development, e-commerce, marketing, SEO, creative services and automation into practical digital solutions for businesses ready to grow.</p>
          <div className="mt-12 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="text-sm text-slate-500">Founder & Owner</p>
            <h2 className="mt-2 text-2xl font-bold">Ali Raza</h2>
            <p className="mt-3 text-slate-400">Building digital systems, stores and growth solutions for ambitious businesses.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
