import { cn } from "@/lib/utils";

type AbstractBackgroundProps = {
  variant?: "hero" | "section" | "cta" | "dark";
  className?: string;
  children?: React.ReactNode;
};

export function AbstractBackground({
  variant = "section",
  className,
  children,
}: AbstractBackgroundProps) {
  return (
    <div className={cn("relative overflow-hidden", className)} data-variant={variant}>
      <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden>
        {variant === "hero" && (
          <>
            <div className="absolute inset-0 parallel-lines opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_15%_-10%,rgba(74,134,197,0.42),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_88%_8%,rgba(13,44,84,0.28),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_55%,rgba(74,134,197,0.22),transparent_42%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_78%,rgba(107,159,212,0.28),transparent_38%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_35%,rgba(232,241,250,0.9),transparent_70%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_95%_92%,rgba(74,134,197,0.18),transparent_35%)]" />
            <div className="absolute -left-[20%] top-[-15%] h-[560px] w-[560px] rounded-full bg-brand/25 blur-[100px] animate-blob" />
            <div className="absolute -right-[15%] top-[5%] h-[500px] w-[500px] rounded-full bg-brand-navy/20 blur-[90px] animate-blob animation-delay-2000" />
            <div className="absolute right-[10%] top-[45%] h-[380px] w-[380px] rounded-full bg-brand/20 blur-[80px] animate-blob animation-delay-4000" />
            <div className="absolute bottom-[-10%] left-[5%] h-[440px] w-[440px] rounded-full bg-[#6b9fd4]/25 blur-[95px] animate-blob animation-delay-2000" />
            <div className="absolute bottom-[15%] right-[25%] h-[320px] w-[320px] rounded-full bg-brand-muted/80 blur-[70px] animate-blob animation-delay-4000" />
            <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-background" />
          </>
        )}
        {variant === "section" && (
          <>
            <div className="absolute inset-0 bg-linear-to-b from-muted/80 via-background to-background" />
            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-brand/8 blur-3xl" />
          </>
        )}
        {variant === "cta" && (
          <>
            <div className="absolute inset-0 bg-linear-to-br from-brand-navy via-[#0a2340] to-[#163a5c]" />
            <div className="absolute inset-0 parallel-lines opacity-20" />
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_25%_20%,rgba(74,134,197,0.45),transparent_55%)]" />
            <div className="absolute inset-0 opacity-25 bg-[radial-gradient(circle_at_75%_85%,rgba(107,159,212,0.35),transparent_50%)] animate-pulse-slow" />
          </>
        )}
        {variant === "dark" && (
          <>
            <div className="absolute inset-0 bg-brand-navy" />
            <div className="absolute inset-0 parallel-lines opacity-10" />
            <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-linear-to-r from-transparent via-brand/60 to-transparent" />
          </>
        )}
      </div>
      {children}
    </div>
  );
}
