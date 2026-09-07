'use client';

import Link from "next/link";
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";

function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (normalized.includes("api key") || normalized.includes("invalid api") || normalized.includes("supabase is not configured")) {
    return "Authentication is temporarily unavailable. The Supabase connection key needs to be corrected in the deployment settings.";
  }
  if (normalized.includes("failed to fetch") || normalized.includes("network")) {
    return "Authentication is temporarily unavailable. Please check your connection and try again.";
  }
  return message;
}

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: FormEvent) {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const { error: authError } = await createClient().auth.signInWithPassword({ email: email.trim().toLowerCase(), password });
      if (authError) { setError(friendlyAuthError(authError.message)); return; }
      router.replace(next?.startsWith("/") ? next : "/dashboard"); router.refresh();
    } catch (caught) {
      setError(friendlyAuthError(caught instanceof Error ? caught.message : "Unable to connect to the authentication service."));
    } finally { setLoading(false); }
  }

  return <form onSubmit={submit} className="mt-8 space-y-4">
    <input name="email" type="email" autoComplete="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-blue-500"/>
    <input name="password" type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-blue-500"/>
    <div className="flex justify-end"><Link href="/auth/forgot-password" className="text-sm font-semibold text-blue-400">Forgot password?</Link></div>
    {error&&<p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm leading-6 text-red-300">{error}</p>}
    <button disabled={loading} type="submit" className="premium-button w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:opacity-60">{loading?'Signing in…':'Sign in'}</button>
    <p className="text-center text-sm text-slate-400">Need an account? <Link href="/auth/signup" className="font-semibold text-blue-400">Create one</Link></p>
  </form>;
}
