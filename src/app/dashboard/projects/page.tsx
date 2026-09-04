import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: projects, error } = user
    ? await supabase.from("projects").select("id,name,description,status,start_date,due_date").eq("client_id", user.id).order("created_at", { ascending: false })
    : { data: [], error: null };

  return <main className="min-h-screen bg-slate-950 px-6 py-12 text-white"><div className="mx-auto max-w-6xl"><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">← Dashboard</Link><p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-3 text-4xl font-bold">Projects</h1><p className="mt-2 text-slate-400">Live project updates assigned to your account.</p>{error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">Unable to load projects right now.</div> : projects?.length ? <section className="mt-8 grid gap-5 md:grid-cols-2">{projects.map((project) => <article key={project.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"><div className="flex items-start justify-between gap-4"><h2 className="text-xl font-semibold">{project.name}</h2><span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">{project.status}</span></div>{project.description && <p className="mt-3 text-sm leading-6 text-slate-400">{project.description}</p>}<div className="mt-6 grid grid-cols-2 gap-4 text-sm"><div><p className="text-slate-500">Start</p><p className="mt-1">{project.start_date || "—"}</p></div><div><p className="text-slate-500">Due</p><p className="mt-1">{project.due_date || "—"}</p></div></div></article>)}</section> : <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-8"><p className="text-slate-400">No projects have been assigned yet.</p></div>}</div></main>;
}
