import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import AdminResourceTable from "@/components/admin/AdminResourceTable";

const configs = {
  clients: { table: "profiles", title: "Clients", columns: ["full_name", "company_name", "phone", "role"] },
  leads: { table: "leads", title: "Leads / CRM", columns: ["name", "email", "phone", "company_name", "status", "source"] },
  projects: { table: "projects", title: "Projects", columns: ["name", "slug", "status", "start_date", "due_date"] },
  invoices: { table: "invoices", title: "Invoices", columns: ["invoice_number", "amount", "currency", "status", "due_date"] },
  tickets: { table: "support_tickets", title: "Support Tickets", columns: ["subject", "status", "priority", "created_at"] },
  services: { table: "services", title: "Services", columns: ["name", "slug", "short_description", "is_active"] },
  portfolio: { table: "portfolio", title: "Portfolio", columns: ["title", "slug", "is_featured", "is_published"] },
} as const;

type Resource = keyof typeof configs;

export default async function AdminResourcePage({ params }: { params: Promise<{ resource: string }> }) {
  const { resource } = await params;
  if (!(resource in configs)) return <main className="min-h-screen bg-slate-950 p-10 text-white">Resource not found.</main>;
  const config = configs[resource as Resource];
  const supabase = await createClient();
  const { data: rows, error } = await supabase.from(config.table).select("*").order("created_at", { ascending: false }).limit(100);

  return <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-7xl">
    <div className="flex flex-wrap items-center justify-between gap-4"><div><Link href="/admin" className="text-sm text-slate-400 hover:text-white">← Admin</Link><p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP · ADMIN</p><h1 className="mt-2 text-4xl font-bold">{config.title}</h1><p className="mt-2 text-slate-500">Search, filter and manage live records.</p></div>{resource !== "clients" && <Link href={`/admin/${resource}/new`} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500">+ Add new</Link>}</div>
    {error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">Unable to load records. Check admin access and database policies.</div> : <AdminResourceTable resource={resource} columns={[...config.columns]} rows={(rows ?? []) as Record<string, unknown>[]} />}
  </div></main>;
}
