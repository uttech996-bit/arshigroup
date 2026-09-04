import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile, error } = user
    ? await supabase.from("profiles").select("full_name,company_name,phone,role,avatar_url,created_at").eq("id", user.id).maybeSingle()
    : { data: null, error: null };

  return <main className="min-h-screen bg-slate-950 px-6 py-12 text-white"><div className="mx-auto max-w-4xl"><Link href="/dashboard" className="text-sm text-slate-400 hover:text-white">← Dashboard</Link><p className="mt-8 text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-3 text-4xl font-bold">Profile</h1><p className="mt-2 text-slate-400">Your account information stored securely in Supabase.</p>{error ? <div className="mt-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">Unable to load your profile right now.</div> : <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-7"><div className="grid gap-6 sm:grid-cols-2"><div><p className="text-xs uppercase tracking-wider text-slate-500">Full name</p><p className="mt-2 text-lg font-semibold">{profile?.full_name || "Not set"}</p></div><div><p className="text-xs uppercase tracking-wider text-slate-500">Email</p><p className="mt-2 text-lg font-semibold break-all">{user?.email || "—"}</p></div><div><p className="text-xs uppercase tracking-wider text-slate-500">Company</p><p className="mt-2 text-lg font-semibold">{profile?.company_name || "Not set"}</p></div><div><p className="text-xs uppercase tracking-wider text-slate-500">Phone</p><p className="mt-2 text-lg font-semibold">{profile?.phone || "Not set"}</p></div><div><p className="text-xs uppercase tracking-wider text-slate-500">Account role</p><p className="mt-2 text-lg font-semibold capitalize">{profile?.role || "client"}</p></div><div><p className="text-xs uppercase tracking-wider text-slate-500">Member since</p><p className="mt-2 text-lg font-semibold">{profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}</p></div></div></section>}</div></main>;
}
