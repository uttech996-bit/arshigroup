import Link from "next/link";
import { Activity, ArrowUpRight, BookOpen, BriefcaseBusiness, CircleDollarSign, FileText, Headphones, LayoutDashboard, Megaphone, Package, Settings2, ShieldCheck, Sparkles, Users, WalletCards } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

const sections = [
  ["Users", "clients", Users, "Customer accounts and profiles", "CRM"],
  ["Leads / CRM", "leads", Megaphone, "Capture, assign and convert leads", "CRM"],
  ["Lead Notes", "lead_notes", FileText, "Internal sales notes and follow-ups", "CRM"],
  ["Service Requests", "requests", BriefcaseBusiness, "New work and incoming requests", "Operations"],
  ["Orders", "orders", Package, "Commerce and service orders", "Operations"],
  ["Support Tickets", "tickets", Headphones, "Client support and conversations", "Support"],
  ["Ticket Attachments", "ticket_attachments", FileText, "Files attached to support tickets", "Support"],
  ["Services", "services", Sparkles, "Manage public service offerings", "Content"],
  ["Service Categories", "categories", LayoutDashboard, "Organize service categories", "Content"],
  ["Projects", "projects", BriefcaseBusiness, "Delivery, milestones and status", "Operations"],
  ["Invoices", "invoices", WalletCards, "Billing and payment records", "Finance"],
  ["Blog CMS", "blog", BookOpen, "Publish and schedule content", "Content"],
  ["Blog Categories", "blog_categories", LayoutDashboard, "Organize editorial content", "Content"],
  ["Blog Tags", "blog_tags", FileText, "Manage article tags", "Content"],
  ["Portfolio", "portfolio", Sparkles, "Showcase selected work", "Content"],
  ["Testimonials", "testimonials", Users, "Manage client proof and reviews", "Content"],
  ["FAQs", "faqs", FileText, "Maintain public answers", "Content"],
  ["Team", "team", Users, "Staff and role management", "Administration"],
  ["Notifications", "notifications", Activity, "System and client notifications", "Administration"],
  ["Audit Logs", "activity", ShieldCheck, "Operational activity history", "Administration"],
] as const;

const tableFor = (key: string) => ({ clients: "profiles", leads: "leads", lead_notes: "lead_notes", requests: "service_requests", orders: "orders", tickets: "support_tickets", ticket_attachments: "ticket_attachments", services: "services", categories: "service_categories", projects: "projects", invoices: "invoices", blog: "blog_posts", blog_categories: "blog_categories", blog_tags: "blog_tags", portfolio: "portfolio", testimonials: "testimonials", faqs: "faqs", team: "team_members", notifications: "notifications", activity: "activity_logs" } as Record<string, string>)[key];

const groups = ["CRM", "Operations", "Finance", "Support", "Content", "Administration"] as const;

export default async function AdminPage() {
  const s = await createClient();
  const { data: { user } } = await s.auth.getUser();
  const { data: p } = user ? await s.from("profiles").select("role,full_name").eq("id", user.id).maybeSingle() : { data: null };
  const counts = await Promise.all(sections.map(async ([, key]) => {
    const { count } = await s.from(tableFor(key)).select("id", { count: "exact", head: true });
    return count ?? 0;
  }));
  const countMap = Object.fromEntries(sections.map(([title], i) => [title, counts[i]]));
  const totalRecords = counts.reduce((sum, value) => sum + value, 0);

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      <div className="pointer-events-none fixed inset-0 -z-0 overflow-hidden"><div className="absolute left-1/2 top-0 h-[36rem] w-[70rem] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" /><div className="absolute right-0 top-1/2 h-80 w-80 rounded-full bg-cyan-400/5 blur-3xl" /></div>
      <div className="relative z-10 mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="sticky top-3 z-20 mb-8 rounded-2xl border border-white/10 bg-[#080d1b]/90 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3"><div className="grid h-11 w-11 place-items-center rounded-xl bg-blue-600 shadow-lg shadow-blue-600/25"><span className="text-lg font-black">A</span></div><div><p className="text-[10px] font-bold uppercase tracking-[.28em] text-blue-300">ARSHI GROUP</p><p className="text-sm font-semibold text-slate-300">Admin Control Center</p></div></div>
            <div className="flex flex-wrap items-center gap-2"><Link href="/" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white">Website</Link><Link href="/dashboard" className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:bg-white/5 hover:text-white">Client portal</Link><form action="/auth/logout" method="post"><button className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:bg-slate-200">Sign out</button></form></div>
          </div>
        </header>

        <section className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
          <div className="overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-white/[.07] to-white/[.025] p-6 shadow-2xl sm:p-9"><div className="max-w-3xl"><div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.22em] text-blue-300"><span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_12px_rgba(96,165,250,.9)]" /> Operations online</div><h1 className="text-4xl font-black tracking-tight sm:text-6xl">Run the business.<br /><span className="bg-gradient-to-r from-blue-300 via-cyan-300 to-white bg-clip-text text-transparent">Scale the system.</span></h1><p className="mt-5 max-w-2xl text-sm leading-7 text-slate-400 sm:text-base">One secure workspace for CRM, projects, billing, support, content and team operations.</p><div className="mt-7 flex flex-wrap items-center gap-3"><Link href="/admin/leads" className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:bg-blue-500">Open CRM <ArrowUpRight className="h-4 w-4" /></Link><Link href="/admin/projects" className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-5 py-3 text-sm font-bold text-slate-200 transition hover:bg-white/[.08]">View projects</Link></div></div></div>
          <div className="rounded-3xl border border-white/10 bg-white/[.035] p-6"><div className="flex items-center justify-between"><p className="text-xs font-bold uppercase tracking-[.2em] text-slate-500">Workspace</p><ShieldCheck className="h-5 w-5 text-blue-400" /></div><p className="mt-5 text-3xl font-black">{totalRecords}</p><p className="mt-1 text-sm text-slate-400">records visible to your role</p><div className="mt-6 grid grid-cols-2 gap-3"><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><p className="text-xs text-slate-500">Your role</p><p className="mt-1 truncate text-sm font-bold">{p?.role || "staff"}</p></div><div className="rounded-2xl border border-white/10 bg-black/10 p-4"><p className="text-xs text-slate-500">Signed in as</p><p className="mt-1 truncate text-sm font-bold">{p?.full_name || user?.email || "User"}</p></div></div></div>
        </section>

        <section className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4"><div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs text-slate-500">Leads</p><p className="mt-1 text-2xl font-black">{countMap["Leads / CRM"]}</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs text-slate-500">Projects</p><p className="mt-1 text-2xl font-black">{countMap.Projects}</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs text-slate-500">Invoices</p><p className="mt-1 text-2xl font-black">{countMap.Invoices}</p></div><div className="rounded-2xl border border-white/10 bg-white/[.035] p-4"><p className="text-xs text-slate-500">Tickets</p><p className="mt-1 text-2xl font-black">{countMap["Support Tickets"]}</p></div></section>

        <section className="mt-10"><div className="mb-5 flex items-end justify-between gap-4"><div><p className="text-[10px] font-bold uppercase tracking-[.25em] text-blue-400">Workspace modules</p><h2 className="mt-2 text-2xl font-black sm:text-3xl">Everything in one control center.</h2></div><p className="hidden text-right text-xs text-slate-500 sm:block">Access remains protected by Supabase auth + role-based permissions.</p></div>
          {groups.map((group) => <div key={group} className="mb-8"><div className="mb-3 flex items-center gap-3"><span className="text-[10px] font-bold uppercase tracking-[.22em] text-slate-500">{group}</span><span className="h-px flex-1 bg-white/5" /></div><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{sections.map(([title, key, Icon, description, section]) => section === group ? <Link key={key} href={`/admin/${key}`} className="group rounded-2xl border border-white/10 bg-white/[.035] p-5 transition duration-200 hover:-translate-y-0.5 hover:border-blue-400/30 hover:bg-white/[.055]"><div className="flex items-start justify-between gap-3"><div className="grid h-10 w-10 place-items-center rounded-xl border border-blue-400/15 bg-blue-400/10 text-blue-300"><Icon className="h-4 w-4" /></div><span className="text-lg font-black text-slate-300">{countMap[title]}</span></div><h3 className="mt-5 text-sm font-bold">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p><div className="mt-4 flex items-center gap-1 text-xs font-bold text-blue-400 opacity-80 transition group-hover:opacity-100">Manage <ArrowUpRight className="h-3.5 w-3.5" /></div></Link> : null)}</div></div>)}
        </section>

        <footer className="mt-12 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-600"><span>ARSHI GROUP · Secure operations</span><span className="inline-flex items-center gap-1.5"><CircleDollarSign className="h-3.5 w-3.5" /> Data access is role-scoped</span><Link href="/dashboard/profile" className="inline-flex items-center gap-1.5 hover:text-slate-300"><Settings2 className="h-3.5 w-3.5" /> Profile</Link></footer>
      </div>
    </main>
  );
}
