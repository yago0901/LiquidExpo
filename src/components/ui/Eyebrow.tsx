import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & {
  tone?: "violet" | "gold" | "cyan";
};

const toneDot: Record<NonNullable<EyebrowProps["tone"]>, string> = {
  violet: "bg-violet",
  gold: "bg-gold",
  cyan: "bg-cyan",
};

export function Eyebrow({
  className,
  tone = "violet",
  children,
  ...props
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "flex items-center gap-2 text-xs font-semibold tracking-[0.28em] text-mist uppercase",
        className,
      )}
      {...props}
    >
      <span
        className={cn("h-1.5 w-1.5 rounded-full", toneDot[tone])}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
