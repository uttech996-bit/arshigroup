import Link from "next/link";

type BrandLogoProps = { href?: string; className?: string; compact?: boolean };

export default function BrandLogo({ href = "/", className = "", compact = false }: BrandLogoProps) {
  const size = compact ? "h-12 w-auto" : "h-14 w-auto";
  const content = (
    <span className={`inline-flex shrink-0 items-center ${className}`.trim()}>
      <img src="/brand/arshi-light.svg" alt="ARSHI GROUP" className={`${size} dark:hidden`} />
      <img src="/brand/arshi-dark.svg" alt="" aria-hidden="true" className={`${size} hidden dark:block`} />
    </span>
  );
  return href ? <Link href={href} aria-label="ARSHI GROUP home">{content}</Link> : content;
}
