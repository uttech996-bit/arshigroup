export default function AdPlaceholder({ label = "Advertising" }: { label?: string }) {
  return <div className="my-8 flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-border bg-accent/40 px-4 py-6 text-center text-xs text-muted-foreground" aria-label="Advertisement placeholder"><span>{label} · Ad space reserved</span></div>;
}
