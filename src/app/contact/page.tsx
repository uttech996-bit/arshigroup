import Link from "next/link";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-950 px-6 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link href="/" className="text-sm font-semibold text-blue-400">← ARSHI GROUP</Link>
        <p className="mt-20 text-sm font-bold uppercase tracking-[0.25em] text-blue-400">Contact</p>
        <h1 className="mt-4 text-5xl font-black tracking-tight sm:text-6xl">Let&apos;s build something that grows.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-400">Tell us what you want to build, improve or automate. Our project inquiry system will be connected to the ARSHI GROUP CRM.</p>
        <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="text-slate-400">Owner</p>
          <p className="mt-1 text-xl font-bold">Ali Raza</p>
          <p className="mt-6 text-slate-400">For project inquiries, use the contact channel configured for your agency.</p>
        </div>
      </div>
    </main>
  );
}
