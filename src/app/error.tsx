'use client';

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error("ARSHI GROUP route error"); }, []);
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <section className="premium-card w-full max-w-xl rounded-[2rem] p-8 text-center sm:p-10">
        <div className="mx-auto grid size-14 place-items-center rounded-2xl bg-blue-600 font-black text-white shadow-lg shadow-blue-600/20">A</div>
        <p className="mt-7 text-xs font-black uppercase tracking-[.25em] text-blue-600">ARSHI GROUP</p>
        <h1 className="mt-3 text-3xl font-black tracking-tight">Something needs another try.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">The page hit an unexpected error. Your account and data are safe. Try again or return to the main website.</p>
        <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
          <button onClick={() => reset()} className="premium-button rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Try again</button>
          <Link href="/" className="premium-button rounded-xl border border-border bg-card px-5 py-3 text-sm font-bold">Back to website</Link>
        </div>
      </section>
    </main>
  );
}
