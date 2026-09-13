import { cn } from "@/lib/utils";

type EyebrowProps = React.HTMLAttributes<HTMLParagraphElement> & {
  tone?: "default" | "accent";
};

export function Eyebrow({
  className,
  tone = "default",
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
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          tone === "accent" ? "bg-accent" : "bg-mist",
        )}
        aria-hidden="true"
      />
      {children}
    </p>
  );
}
