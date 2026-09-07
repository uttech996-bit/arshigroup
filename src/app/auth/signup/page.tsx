import Link from "next/link";
import SignupForm from "./SignupForm";
import BrandLogo from "@/components/BrandLogo";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl">
        <BrandLogo href="/" compact className="-ml-1" />
        <h1 className="mt-5 text-3xl font-bold">Create your account</h1>
        <p className="mt-3 text-slate-400">Create a secure client account to manage your projects and support.</p>
        <SignupForm />
        <Link href="/" className="mt-6 inline-block text-sm text-slate-400 hover:text-white">← Back to website</Link>
      </div>
    </main>
  );
}
