import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
  tone?: "default" | "accent";
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "left",
  size = "default",
  tone = "default",
  className,
  titleId,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow tone={tone}>{eyebrow}</Eyebrow> : null}
      <h2
        id={titleId}
        className={cn(
          "font-display text-balance leading-[0.95] font-extrabold tracking-tight text-ink uppercase",
          size === "large" ? "text-5xl sm:text-7xl lg:text-8xl" : "text-4xl sm:text-5xl lg:text-6xl",
        )}
      >
        {title}
      </h2>
      {subhead ? (
        <p
          className={cn(
            "max-w-2xl text-base text-mist sm:text-lg",
            align === "center" && "mx-auto",
          )}
        >
          {subhead}
        </p>
      ) : null}
    </div>
  );
}
