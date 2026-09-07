import Link from "next/link";

type BrandLogoProps = { href?: string; className?: string; compact?: boolean };

export default function BrandLogo({ href = "/", className = "", compact = false }: BrandLogoProps) {
  const content = (
    <span className={`brand-mark ${compact ? "brand-mark--compact" : ""} ${className}`.trim()} role="img" aria-label="ARSHI GROUP" />
  );
  return href ? <Link href={href} aria-label="ARSHI GROUP home">{content}</Link> : content;
}
