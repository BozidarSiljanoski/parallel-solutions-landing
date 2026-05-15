import * as React from "react";

import { cn } from "@/lib/utils";

type SpinningBorderProps = React.ComponentProps<"div"> & {
  /** Border ring thickness in pixels */
  thickness?: number;
};

/**
 * Wraps content with a slowly rotating, pulsing brand-blue border.
 * Place your Card (or any content) inside.
 */
function SpinningBorder({
  className,
  thickness = 2,
  style,
  children,
  ...props
}: SpinningBorderProps) {
  return (
    <div
      className={cn("spinning-border-card rounded-xl", className)}
      style={
        {
          "--spin-border-width": `${thickness}px`,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <div className="spinning-border-card__inner h-full">{children}</div>
    </div>
  );
}

export { SpinningBorder };
