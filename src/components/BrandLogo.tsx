import Link from "next/link";

type BrandLogoProps = {
  href?: string;
  className?: string;
  compact?: boolean;
};

export default function BrandLogo({ href = "/", className = "", compact = false }: BrandLogoProps) {
  const content = (
    <span className={`arshi-logo ${compact ? "arshi-logo-compact" : ""} ${className}`.trim()} aria-label="ARSHI GROUP">
      <img src="/brand/arshi-light.svg" alt="ARSHI GROUP" className="arshi-logo-light" />
      <img src="/brand/arshi-dark.svg" alt="" aria-hidden="true" className="arshi-logo-dark" />
    </span>
  );

  return href ? <Link href={href} aria-label="ARSHI GROUP home">{content}</Link> : content;
}
