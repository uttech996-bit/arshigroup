import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <main className="min-h-screen bg-slate-950 px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div><Link href="/admin" className="text-sm text-slate-400 hover:text-white">← Admin</Link><p className="mt-6 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP · ADMIN</p><h1 className="mt-2 text-4xl font-bold">{config.title}</h1></div>
          {resource !== "clients" && <Link href={`/admin/${resource}/new`} className="rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold hover:bg-blue-500">+ Add new</Link>}
        </div>
        {error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-red-300">Unable to load records. Check admin access and database policies.</div> : (
          <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
            <div className="overflow-x-auto"><table className="w-full min-w-[900px] text-left text-sm"><thead className="bg-white/[0.04] text-slate-400"><tr>{config.columns.map((column) => <th key={column} className="px-4 py-4 capitalize">{column.replaceAll("_", " ")}</th>)}<th className="px-4 py-4">Actions</th></tr></thead>
              <tbody className="divide-y divide-white/10">{rows?.map((row) => <tr key={row.id} className="hover:bg-white/[0.02]">{config.columns.map((column) => <td key={column} className="max-w-xs px-4 py-4 text-slate-300">{typeof row[column] === "boolean" ? (row[column] ? "Yes" : "No") : String(row[column] ?? "—")}</td>)}<td className="px-4 py-4"><div className="flex gap-2"><Link href={`/admin/${resource}/${row.id}/edit`} className="rounded-lg border border-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/5">Edit</Link>{resource !== "clients" && <form action={`/api/admin/${resource}/${row.id}`} method="post"><input type="hidden" name="_method" value="delete" /><button className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/10">Delete</button></form>}</div></td></tr>)}</tbody>
            </table></div>
            {!rows?.length && <div className="p-8 text-slate-400">No records found.</div>}
          </div>
        )}
      </div>
    </main>
  );
}
