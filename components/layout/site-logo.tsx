import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

type SiteLogoProps = {
  className?: string;
  compact?: boolean;
};

export function SiteLogo({ className, compact = false }: SiteLogoProps) {
  return (
    <Link
      href="/"
      className={cn("inline-flex shrink-0 items-center", className)}
      data-testid="site-logo"
    >
      <Image
        src="/paralel-solutions-logo.png"
        alt="Parallel Solutions — Outsourced lead generation"
        width={compact ? 140 : 200}
        height={compact ? 40 : 56}
        className={cn(
          "h-auto w-auto object-contain object-left",
          compact ? "max-h-9 max-w-[140px]" : "max-h-11 max-w-[200px] md:max-h-12 md:max-w-[220px]",
        )}
        priority
      />
    </Link>
  );
}
