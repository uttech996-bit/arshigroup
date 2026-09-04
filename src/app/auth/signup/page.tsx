import Link from "next/link";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p>
        <h1 className="mt-4 text-3xl font-bold">Create your account</h1>
        <p className="mt-3 text-slate-400">Create a secure client account to manage your projects and support.</p>
        <SignupForm />
        <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-white">← Back to website</Link>
      </div>
    </main>
  );
}
