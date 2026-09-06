import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <section className="premium-card w-full max-w-xl rounded-[2rem] p-8 text-center sm:p-10">
        <div className="text-7xl font-black tracking-[-.08em] text-blue-600">404</div>
        <h1 className="mt-4 text-3xl font-black">That page moved.</h1>
        <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-muted-foreground">The link may be outdated or the resource no longer exists.</p>
        <Link href="/" className="premium-button mt-7 inline-flex rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white">Return to ARSHI GROUP</Link>
      </section>
    </main>
  );
}
