import Link from "next/link";

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm font-semibold text-blue-400">← ARSHI GROUP</Link>
        <p className="mt-20 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">Portfolio</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Selected digital work.</h1>
        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {["E-commerce Experiences", "Business Websites", "Growth Campaigns", "Automation Systems"].map((item, index) => (
            <article key={item} className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
              <p className="text-sm text-blue-400">0{index + 1}</p>
              <h2 className="mt-10 text-2xl font-bold">{item}</h2>
              <p className="mt-3 text-slate-400">Case studies and project details will be connected to the ARSHI GROUP portfolio database.</p>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
