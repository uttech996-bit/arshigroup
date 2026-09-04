import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">ARSHI GROUP</p>
        <h1 className="mt-4 text-3xl font-bold">Client Login</h1>
        <p className="mt-3 text-slate-400">Sign in to access your projects, invoices and support.</p>
        <form className="mt-8 space-y-4">
          <input name="email" type="email" placeholder="Email address" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-blue-500" />
          <input name="password" type="password" placeholder="Password" className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 outline-none placeholder:text-slate-500 focus:border-blue-500" />
          <button type="submit" className="w-full rounded-xl bg-blue-600 px-4 py-3 font-semibold hover:bg-blue-500">Sign in</button>
        </form>
        <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-white">← Back to website</Link>
      </div>
    </main>
  );
}
