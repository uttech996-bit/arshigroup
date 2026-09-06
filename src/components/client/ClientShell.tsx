'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  ClipboardList,
  FolderKanban,
  Headphones,
  LayoutDashboard,
  Menu,
  ReceiptText,
  Settings,
  ShoppingBag,
  Sparkles,
  UserRound,
  X,
} from "lucide-react";

const links = [
  ["/dashboard", "Overview", LayoutDashboard],
  ["/dashboard/projects", "Projects", FolderKanban],
  ["/dashboard/services", "Services", BriefcaseBusiness],
  ["/dashboard/requests", "Requests", ClipboardList],
  ["/dashboard/orders", "Orders", ShoppingBag],
  ["/dashboard/invoices", "Invoices", ReceiptText],
  ["/dashboard/tickets", "Support", Headphones],
  ["/dashboard/notifications", "Notifications", Bell],
  ["/dashboard/activity", "Activity", Activity],
  ["/dashboard/profile", "Profile", UserRound],
  ["/dashboard/settings", "Settings", Settings],
] as const;

export default function ClientShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenu, setMobileMenu] = useState(false);

  const isActive = (href: string) => pathname === href || (href !== "/dashboard" && pathname.startsWith(`${href}/`));
  const mobilePrimary = [links[0], links[1], links[3], links[6]];
  const mobileMore = links.slice(2).filter(([href]) => !mobilePrimary.some(([primaryHref]) => primaryHref === href));

  return (
    <div className="min-h-screen bg-[#050816] text-slate-100">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#050816]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[4.5rem] max-w-[90rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl border border-blue-400/30 bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-black text-white shadow-lg shadow-blue-600/20">AG</span>
            <span className="leading-none">
              <span className="block text-sm font-black tracking-wide text-white">ARSHI GROUP</span>
              <span className="mt-1 hidden text-[10px] font-semibold uppercase tracking-[.2em] text-slate-500 sm:block">Client command center</span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/notifications" aria-label="Notifications" className="relative rounded-xl border border-white/10 p-2.5 text-slate-400 transition hover:border-blue-400/30 hover:bg-white/5 hover:text-white">
              <Bell className="size-4.5" />
            </Link>
            <Link href="/" className="hidden rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-400/30 hover:bg-white/5 hover:text-white sm:block">Website</Link>
            <form action="/auth/logout" method="post">
              <button className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-slate-950 transition hover:-translate-y-0.5 hover:bg-slate-200">Sign out</button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-[90rem]">
        <aside className="sticky top-[4.5rem] hidden h-[calc(100vh-4.5rem)] w-64 shrink-0 border-r border-white/10 px-4 py-7 md:block">
          <div className="mb-7 rounded-2xl border border-blue-400/15 bg-gradient-to-br from-blue-500/10 to-cyan-400/5 p-4">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[.2em] text-blue-300"><Sparkles className="size-3" /> Private workspace</div>
            <p className="mt-2 text-xs leading-5 text-slate-500">Projects, billing and support in one secure place.</p>
          </div>
          <p className="px-3 text-[10px] font-black uppercase tracking-[.24em] text-slate-600">Workspace</p>
          <nav className="mt-3 space-y-1">
            {links.map(([href, label, Icon]) => (
              <Link key={href} href={href} className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${isActive(href) ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-600/15" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <Icon className={`size-4 ${isActive(href) ? "text-white" : "text-slate-500 group-hover:text-blue-300"}`} />
                {label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 pb-28">{children}</main>
      </div>

      {mobileMenu && (
        <div className="fixed inset-x-3 bottom-[5.25rem] z-50 rounded-2xl border border-white/10 bg-[#0b1120]/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-2xl md:hidden">
          <div className="grid grid-cols-2 gap-1">
            {mobileMore.map(([href, label, Icon]) => (
              <Link key={href} href={href} onClick={() => setMobileMenu(false)} className={`flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-semibold ${isActive(href) ? "bg-blue-600 text-white" : "text-slate-400 hover:bg-white/5 hover:text-white"}`}>
                <Icon className="size-4" /> {label}
              </Link>
            ))}
          </div>
        </div>
      )}

      <nav className="fixed inset-x-3 bottom-3 z-50 grid grid-cols-5 rounded-2xl border border-white/10 bg-[#0b1120]/90 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-2xl md:hidden">
        {mobilePrimary.map(([href, label, Icon]) => (
          <Link key={href} href={href} className={`grid place-items-center rounded-xl py-2 text-[10px] font-semibold ${isActive(href) ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20" : "text-slate-500"}`}>
            <Icon className="mb-1 size-4" />{label}
          </Link>
        ))}
        <button onClick={() => setMobileMenu((open) => !open)} className={`grid place-items-center rounded-xl py-2 text-[10px] font-semibold ${mobileMenu ? "bg-white/10 text-white" : "text-slate-500"}`} aria-label="More dashboard options">
          {mobileMenu ? <X className="mb-1 size-4" /> : <Menu className="mb-1 size-4" />}
          More
        </button>
      </nav>
    </div>
  );
}
