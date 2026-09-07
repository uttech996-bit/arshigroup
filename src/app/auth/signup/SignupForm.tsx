'use client';

import { FormEvent, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function friendlyAuthError(message: string) {
  const normalized = message.toLowerCase();
  if (
    normalized.includes("api key") ||
    normalized.includes("invalid api") ||
    normalized.includes("supabase is not configured") ||
    normalized.includes("failed to fetch") ||
    normalized.includes("network")
  ) {
    return "Authentication is temporarily unavailable. Please try again shortly.";
  }
  return message;
}

export default function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const strength = useMemo(
    () => [password.length >= 8, /[A-Z]/.test(password), /[0-9]/.test(password), /[^A-Za-z0-9]/.test(password)].filter(Boolean).length,
    [password],
  );

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");
    if (password.length < 8) {
      setError("Use at least 8 characters for your password.");
      return;
    }
    setLoading(true);
    try {
      const supabase = createClient();
      const { data, error: signUpError } = await supabase.auth.signUp({
        email: email.trim().toLowerCase(),
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (signUpError) {
        setError(friendlyAuthError(signUpError.message));
        return;
      }
      if (data.session) {
        window.location.assign("/dashboard");
        return;
      }
      setMessage("Account created. Check your email to confirm your account, then sign in.");
    } catch (caught) {
      const text = caught instanceof Error ? caught.message : "Unable to connect to the authentication service.";
      setError(friendlyAuthError(text));
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4">
      <div className="premium-card rounded-2xl p-4">
        <div className="flex items-center gap-3"><ShieldCheck className="size-5 text-blue-500" /><div><p className="text-sm font-bold">Secure client workspace</p><p className="text-xs text-slate-400">Your projects, invoices and support stay private.</p></div></div>
      </div>
      <input name="name" type="text" autoComplete="name" required maxLength={100} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
      <input name="email" type="email" autoComplete="email" required maxLength={254} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" />
      <div>
        <div className="relative"><input name="password" type={showPassword ? "text" : "password"} autoComplete="new-password" minLength={8} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (8+ characters)" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10" /><button type="button" onClick={() => setShowPassword((v) => !v)} aria-label={showPassword ? "Hide password" : "Show password"} className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-white">{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</button></div>
        <div className="mt-2 flex gap-1.5" aria-label="Password strength">{[0,1,2,3].map((i) => <span key={i} className={`h-1 flex-1 rounded-full transition ${i < strength ? "bg-blue-500" : "bg-white/10"}`} />)}</div>
      </div>
      {error && <p role="alert" className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}
      {message && <p role="status" className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}
      <button disabled={loading} type="submit" className="premium-button w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60">{loading ? "Creating account…" : "Create account"}</button>
      <p className="text-center text-sm text-slate-400">Already registered? <Link href="/auth/login" className="font-semibold text-blue-400 hover:text-blue-300">Sign in</Link></p>
    </form>
  );
}
