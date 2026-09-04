import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function TicketsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: tickets, error } = user
    ? await supabase.from("support_tickets").select("id,subject,description,status,priority,created_at,updated_at").eq("client_id", user.id).order("created_at", { ascending: false })
    : { data: [], error: null };

  return <main className="min-h-screen bg-slate-950 px-6 py-12 text-white"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">← Dashboard</Link><p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-3 text-4xl font-bold">Support Tickets</h1><p className="mt-2 text-slate-400">Track your support requests and their current status.</p>{error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">Unable to load tickets right now.</div> : tickets?.length ? <section className="mt-8 space-y-4">{tickets.map((ticket) => <article key={ticket.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><div className="flex flex-wrap items-start justify-between gap-4"><div><h2 className="text-lg font-semibold">{ticket.subject}</h2><p className="mt-2 text-sm text-slate-400">{ticket.description}</p></div><div className="flex gap-2"><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{ticket.priority}</span><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-300">{ticket.status}</span></div></div><p className="mt-4 text-xs text-slate-500">Created {new Date(ticket.created_at).toLocaleDateString()}</p></article>)}</section> : <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8"><p className="text-slate-400">No support tickets yet.</p></div>}</div></main>;
}
