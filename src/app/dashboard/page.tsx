import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, FolderKanban, Headphones, Sparkles } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  const [profileRes, projectsRes, invoicesRes, ticketsRes] = await Promise.all([
    supabase.from("profiles").select("full_name,company_name").eq("id", user.id).maybeSingle(),
    supabase.from("projects").select("id,name,status,due_date").eq("client_id", user.id).order("created_at", { ascending: false }),
    supabase.from("invoices").select("id,amount,currency,status").eq("client_id", user.id),
    supabase.from("support_tickets").select("id,status").eq("client_id", user.id),
  ]);
  const projects = projectsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];
  const tickets = ticketsRes.data ?? [];
  const outstanding = invoices.filter((i) => !["paid","cancelled"].includes(i.status)).reduce((sum,i)=>sum+Number(i.amount),0);
  const openTickets = tickets.filter((t) => !["resolved","closed"].includes(t.status)).length;
  const name = profileRes.data?.full_name || user.email?.split("@")[0] || "Client";
  return <div className="section-wrap !py-10 sm:!py-14">
    <div className="relative overflow-hidden rounded-[2rem] border border-border bg-card p-7 shadow-xl sm:p-10"><div className="orb orb-one" /><div className="relative"><div className="flex flex-wrap items-center justify-between gap-5"><div><div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-500/10 px-3 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-300"><Sparkles className="size-3.5" /> Client command center</div><h1 className="text-3xl font-black tracking-tight sm:text-5xl">Welcome back, {name}.</h1><p className="mt-3 max-w-2xl text-muted-foreground">A private workspace for your projects, billing and support — connected to ARSHI GROUP.</p></div><Link href="/services" className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-3 text-sm font-bold text-background">Explore services <ArrowUpRight className="size-4" /></Link></div></div></div>
    <section className="mt-7 grid gap-4 sm:grid-cols-3">{[["Active projects",projects.length,FolderKanban,"/dashboard/projects"],["Outstanding",`${invoices[0]?.currency || "USD"} ${outstanding.toLocaleString()}`,CircleDollarSign,"/dashboard/invoices"],["Open support",openTickets,Headphones,"/dashboard/tickets"]].map(([label,value,Icon,href]) => <Link href={String(href)} key={String(label)} className="group rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-1 hover:border-blue-500/40"><div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl bg-accent text-blue-600 dark:text-blue-300"><Icon className="size-5" /></span><ArrowUpRight className="size-4 text-muted-foreground transition group-hover:text-foreground" /></div><p className="mt-5 text-sm text-muted-foreground">{label}</p><p className="mt-1 text-2xl font-black">{value}</p></Link>)}</section>
    <section className="mt-7 grid gap-6 lg:grid-cols-[1.5fr_1fr]"><div className="rounded-2xl border border-border bg-card p-6"><div className="flex items-center justify-between"><div><p className="text-sm font-bold">Project pulse</p><p className="mt-1 text-xs text-muted-foreground">Your latest delivery activity</p></div><Link href="/dashboard/projects" className="text-sm font-bold text-blue-600">View all</Link></div><div className="mt-5 space-y-3">{projects.slice(0,4).map((p)=><div key={p.id} className="rounded-xl border border-border/70 p-4"><div className="flex items-center justify-between gap-4"><span className="font-semibold">{p.name}</span><span className="rounded-full bg-accent px-3 py-1 text-xs font-bold">{p.status}</span></div>{p.due_date && <p className="mt-2 text-xs text-muted-foreground">Target delivery: {p.due_date}</p>}</div>)}{!projects.length && <p className="rounded-xl bg-accent p-5 text-sm text-muted-foreground">No projects assigned yet.</p>}</div></div><div className="rounded-2xl border border-border bg-card p-6"><p className="text-sm font-bold">Need something?</p><p className="mt-2 text-sm leading-6 text-muted-foreground">Start a service request or open a support ticket and our team can take it from there.</p><div className="mt-6 space-y-3"><Link href="/services" className="flex items-center justify-between rounded-xl border border-border px-4 py-3 text-sm font-bold hover:bg-accent">Browse services <ArrowUpRight className="size-4" /></Link><Link href="/dashboard/tickets" className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white hover:bg-blue-500">Contact support <ArrowUpRight className="size-4" /></Link></div></div></section>
  </div>;
}
