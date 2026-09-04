import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

const sections = [
  ["Clients", "profiles", "/admin/clients"],
  ["Leads / CRM", "leads", "/admin/leads"],
  ["Projects", "projects", "/admin/projects"],
  ["Invoices", "invoices", "/admin/invoices"],
  ["Support Tickets", "support_tickets", "/admin/tickets"],
  ["Services", "services", "/admin/services"],
  ["Portfolio", "portfolio", "/admin/portfolio"],
] as const;

export default async function AdminPage() {
  const supabase = await createClient();
  const [{ count: clients }, { count: leads }, { count: projects }, { count: invoices }, { count: tickets }, { count: services }, { count: portfolio }] = await Promise.all(
    sections.map(([, table]) => supabase.from(table).select("id", { count: "exact", head: true })),
  );

  const counts = { clients, leads, projects, invoices, tickets, services, portfolio };

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP · ADMIN</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">Operations dashboard</h1>
            <p className="mt-3 max-w-2xl text-slate-400">Manage clients, CRM, projects, billing, support, services and portfolio content from one secure workspace.</p>
          </div>
          <div className="flex gap-3">
            <Link href="/dashboard" className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/5">Client Dashboard</Link>
            <form action="/auth/logout" method="post"><button className="rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold hover:bg-white/5">Sign out</button></form>
          </div>
        </header>

        <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sections.map(([title, table, href]) => (
            <Link key={table} href={href} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-blue-500/50">
              <div className="flex items-center justify-between gap-4"><h2 className="font-semibold">{title}</h2><span className="text-2xl font-bold text-blue-400">{counts[table as keyof typeof counts] ?? 0}</span></div>
              <p className="mt-3 text-sm text-slate-500">Open management →</p>
            </Link>
          ))}
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-semibold">Admin controls</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 p-5"><p className="text-sm text-slate-500">Access</p><p className="mt-2 font-semibold">Role-protected</p><p className="mt-1 text-sm text-slate-400">Only profiles with the admin role can access this area.</p></div>
            <div className="rounded-2xl border border-white/10 p-5"><p className="text-sm text-slate-500">Database</p><p className="mt-2 font-semibold">Supabase + RLS</p><p className="mt-1 text-sm text-slate-400">Admin operations are enforced by database policies.</p></div>
            <div className="rounded-2xl border border-white/10 p-5"><p className="text-sm text-slate-500">Next</p><p className="mt-2 font-semibold">CRUD management</p><p className="mt-1 text-sm text-slate-400">Dedicated management screens will connect directly to live records.</p></div>
          </div>
        </section>
      </div>
    </main>
  );
}
