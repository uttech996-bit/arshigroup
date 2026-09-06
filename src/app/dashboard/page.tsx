import Link from "next/link";
import { ArrowUpRight, CircleDollarSign, FolderKanban, Headphones, Sparkles, Zap } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;

  const [profileRes, projectsRes, invoicesRes, ticketsRes] = await Promise.all([
    supabase.from("profiles").select("full_name,company_name").eq("id", user.id).maybeSingle(),
    supabase.from("projects").select("id,name,status,due_date").eq("client_id", user.id).order("created_at", { ascending: false }).limit(6),
    supabase.from("invoices").select("id,amount,currency,status").eq("client_id", user.id),
    supabase.from("support_tickets").select("id,status").eq("client_id", user.id),
  ]);

  const projects = projectsRes.data ?? [];
  const invoices = invoicesRes.data ?? [];
  const tickets = ticketsRes.data ?? [];
  const outstanding = invoices.filter((i) => !["paid", "cancelled"].includes(i.status)).reduce((sum, i) => sum + Number(i.amount), 0);
  const openTickets = tickets.filter((t) => !["resolved", "closed"].includes(t.status)).length;
  const name = profileRes.data?.full_name || user.email?.split("@")[0] || "Client";
  const firstName = name.split(" ")[0];
  const currency = invoices[0]?.currency || "USD";

  const cards = [
    { label: "Active projects", value: projects.length, note: "In your workspace", Icon: FolderKanban, href: "/dashboard/projects" },
    { label: "Outstanding", value: `${currency} ${outstanding.toLocaleString()}`, note: outstanding ? "Review billing" : "All clear", Icon: CircleDollarSign, href: "/dashboard/invoices" },
    { label: "Open support", value: openTickets, note: openTickets ? "Team is on it" : "No open requests", Icon: Headphones, href: "/dashboard/tickets" },
  ];

  return (
    <div className="relative overflow-hidden bg-[#050816] px-4 py-8 sm:px-6 sm:py-12 lg:px-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_0%,rgba(37,99,235,.18),transparent_34%),radial-gradient(circle_at_5%_45%,rgba(34,211,238,.08),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 xl:grid-cols-[1.55fr_.85fr]">
          <section className="relative overflow-hidden rounded-[2rem] border border-blue-400/15 bg-gradient-to-br from-[#101a31] via-[#091224] to-[#07101e] p-7 shadow-2xl shadow-blue-950/20 sm:p-10">
            <div className="absolute -right-20 -top-24 size-72 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.18em] text-blue-300"><Sparkles className="size-3" /> ARSHI command center</div>
              <h1 className="mt-6 max-w-3xl text-4xl font-black tracking-[-.04em] text-white sm:text-6xl">Good to see you, <span className="bg-gradient-to-r from-white via-blue-200 to-cyan-300 bg-clip-text text-transparent">{firstName}.</span></h1>
              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">Your private workspace for projects, billing and support. Everything your ARSHI GROUP team is building for you, in one place.</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/dashboard/projects" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-xl shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500">View projects <ArrowUpRight className="size-4" /></Link>
                <Link href="/services" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-white/20 hover:bg-white/10">Explore services</Link>
              </div>
            </div>
          </section>

          <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b1120] p-7 sm:p-8">
            <div className="flex items-center justify-between"><span className="text-[10px] font-black uppercase tracking-[.2em] text-blue-300">North star</span><Zap className="size-4 text-cyan-300" /></div>
            <p className="mt-8 text-3xl font-black tracking-tight text-white">Better digital.<br /><span className="text-blue-400">Better growth.</span></p>
            <p className="mt-4 text-sm leading-6 text-slate-500">Strategy, execution and optimization connected into one system.</p>
            <div className="mt-8 h-px bg-white/10" />
            <div className="mt-5 flex items-center justify-between text-xs"><span className="text-slate-500">Workspace status</span><span className="inline-flex items-center gap-2 font-bold text-emerald-300"><span className="size-1.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" /> Connected</span></div>
          </section>
        </div>

        <section className="mt-6 grid gap-4 sm:grid-cols-3">
          {cards.map(({ label, value, note, Icon, href }) => (
            <Link href={href} key={label} className="group rounded-2xl border border-white/10 bg-[#0b1120]/90 p-5 transition hover:-translate-y-1 hover:border-blue-400/30 hover:bg-[#0e172a]">
              <div className="flex items-center justify-between"><span className="grid size-10 place-items-center rounded-xl border border-blue-400/15 bg-blue-500/10 text-blue-300"><Icon className="size-5" /></span><ArrowUpRight className="size-4 text-slate-600 transition group-hover:text-blue-300" /></div>
              <p className="mt-5 text-xs font-semibold text-slate-500">{label}</p>
              <p className="mt-1 truncate text-2xl font-black text-white">{value}</p>
              <p className="mt-1 text-xs text-slate-600">{note}</p>
            </Link>
          ))}
        </section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[1.45fr_.75fr]">
          <div className="rounded-2xl border border-white/10 bg-[#0b1120]/90 p-6 sm:p-7">
            <div className="flex items-center justify-between"><div><p className="text-sm font-bold text-white">Project pulse</p><p className="mt-1 text-xs text-slate-500">Your latest delivery activity</p></div><Link href="/dashboard/projects" className="text-xs font-bold text-blue-400 hover:text-blue-300">View all</Link></div>
            <div className="mt-5 space-y-2.5">
              {projects.slice(0, 4).map((p) => (
                <div key={p.id} className="rounded-xl border border-white/8 bg-white/[.025] p-4 transition hover:bg-white/[.045]">
                  <div className="flex items-center justify-between gap-4"><span className="min-w-0 truncate text-sm font-semibold text-slate-200">{p.name}</span><span className="shrink-0 rounded-full border border-blue-400/15 bg-blue-400/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-blue-300">{p.status}</span></div>
                  {p.due_date && <p className="mt-2 text-[11px] text-slate-600">Target delivery: {p.due_date}</p>}
                </div>
              ))}
              {!projects.length && <p className="rounded-xl border border-dashed border-white/10 p-6 text-sm text-slate-500">No projects assigned yet. Once a project starts, your delivery updates will appear here.</p>}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-[#0d1830] to-[#0a1020] p-6 sm:p-7">
            <div className="grid size-10 place-items-center rounded-xl bg-blue-500/10 text-blue-300"><Headphones className="size-5" /></div>
            <p className="mt-5 text-lg font-bold text-white">Need something?</p>
            <p className="mt-2 text-sm leading-6 text-slate-500">Start a service request or contact support. Your team will take it from there.</p>
            <div className="mt-6 space-y-2.5">
              <Link href="/dashboard/requests" className="flex items-center justify-between rounded-xl border border-white/10 bg-white/[.03] px-4 py-3 text-sm font-bold text-slate-200 hover:bg-white/[.07]">New request <ArrowUpRight className="size-4" /></Link>
              <Link href="/dashboard/tickets" className="flex items-center justify-between rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/15 hover:bg-blue-500">Contact support <ArrowUpRight className="size-4" /></Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
