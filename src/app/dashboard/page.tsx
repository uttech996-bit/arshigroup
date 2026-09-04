import Link from "next/link";

const items = [
  ["Projects", "Track active and completed work."],
  ["Invoices", "Review billing and payment status."],
  ["Support", "Create and manage support tickets."],
  ["Profile", "Manage your client information."],
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-3 text-4xl font-bold">Client Dashboard</h1><p className="mt-2 text-slate-400">Your projects, billing and support in one place.</p></div>
          <Link href="/" className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/5">Website</Link>
        </div>
        <section className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(([title, description]) => <Link key={title} href={`/dashboard/${title.toLowerCase()}`} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-blue-500/50"><h2 className="text-xl font-semibold">{title}</h2><p className="mt-2 text-sm leading-6 text-slate-400">{description}</p><span className="mt-6 inline-block text-sm font-semibold text-blue-400">Open →</span></Link>)}
        </section>
      </div>
    </main>
  );
}
