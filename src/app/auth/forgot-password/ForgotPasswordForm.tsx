'use client';
import { FormEvent, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordForm(){
 const [email,setEmail]=useState(""); const [message,setMessage]=useState(""); const [error,setError]=useState(""); const [loading,setLoading]=useState(false);
 async function submit(e:FormEvent){e.preventDefault();setLoading(true);setError("");setMessage("");const supabase=createClient();const {error}=await supabase.auth.resetPasswordForEmail(email,{redirectTo:`${window.location.origin}/auth/callback?next=/auth/reset-password`});if(error)setError(error.message);else setMessage("If an account exists for that email, a password reset link has been sent.");setLoading(false);}
 return <form onSubmit={submit} className="mt-8 space-y-4"><input type="email" required autoComplete="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none focus:border-blue-500"/>{error&&<p role="alert" className="rounded-xl bg-red-500/10 p-3 text-sm text-red-300">{error}</p>}{message&&<p role="status" className="rounded-xl bg-emerald-500/10 p-3 text-sm text-emerald-300">{message}</p>}<button disabled={loading} className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold disabled:opacity-60">{loading?"Sending…":"Send reset link"}</button></form>;
}
