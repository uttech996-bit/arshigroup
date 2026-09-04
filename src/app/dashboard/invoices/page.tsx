import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function InvoicesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: invoices, error } = user
    ? await supabase.from("invoices").select("id,invoice_number,amount,currency,status,due_date,paid_at,notes").eq("client_id", user.id).order("created_at", { ascending: false })
    : { data: [], error: null };

  return <main className="min-h-screen bg-slate-950 px-6 py-12 text-white"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">← Dashboard</Link><p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-3 text-4xl font-bold">Invoices</h1><p className="mt-2 text-slate-400">Your billing history and payment status.</p>{error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">Unable to load invoices right now.</div> : invoices?.length ? <div className="mt-8 overflow-hidden rounded-2xl border border-white/10"><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-left text-sm"><thead className="bg-white/[0.04] text-slate-400"><tr><th className="px-5 py-4">Invoice</th><th className="px-5 py-4">Amount</th><th className="px-5 py-4">Status</th><th className="px-5 py-4">Due date</th><th className="px-5 py-4">Paid</th></tr></thead><tbody className="divide-y divide-white/10">{invoices.map((invoice) => <tr key={invoice.id}><td className="px-5 py-4 font-semibold">{invoice.invoice_number}</td><td className="px-5 py-4">{invoice.currency} {Number(invoice.amount).toLocaleString()}</td><td className="px-5 py-4"><span className="rounded-full bg-white/5 px-3 py-1 text-xs">{invoice.status}</span></td><td className="px-5 py-4 text-slate-400">{invoice.due_date || "—"}</td><td className="px-5 py-4 text-slate-400">{invoice.paid_at ? new Date(invoice.paid_at).toLocaleDateString() : "—"}</td></tr>)}</tbody></table></div></div> : <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8"><p className="text-slate-400">No invoices are available yet.</p></div>}</div></main>;
}
