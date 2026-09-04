import Link from "next/link";
import ForgotPasswordForm from "./ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return <main className="min-h-screen bg-slate-950 px-6 py-20 text-white"><div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl"><p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p><h1 className="mt-4 text-3xl font-bold">Reset your password</h1><p className="mt-3 text-slate-400">Enter your account email and we’ll send a secure password reset link.</p><ForgotPasswordForm/><Link href="/auth/login" className="mt-6 inline-block text-sm text-slate-400 hover:text-white">← Back to sign in</Link></div></main>;
}
