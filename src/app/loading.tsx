export default function Loading() {
  return (
    <main className="min-h-[60vh] bg-background px-5 py-24 text-foreground">
      <div className="mx-auto max-w-7xl">
        <div className="premium-skeleton h-4 w-28 rounded-full" />
        <div className="premium-skeleton mt-6 h-14 w-full max-w-2xl rounded-2xl" />
        <div className="premium-skeleton mt-4 h-5 w-full max-w-xl rounded-full" />
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => <div key={item} className="premium-card rounded-3xl p-6"><div className="premium-skeleton h-12 w-12 rounded-2xl" /><div className="premium-skeleton mt-6 h-6 w-2/3 rounded" /><div className="premium-skeleton mt-3 h-4 w-full rounded" /><div className="premium-skeleton mt-2 h-4 w-5/6 rounded" /></div>)}
        </div>
      </div>
    </main>
  );
}
