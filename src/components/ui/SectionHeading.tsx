import { cn } from "@/lib/utils";
import { Eyebrow } from "./Eyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  subhead?: React.ReactNode;
  align?: "left" | "center";
  size?: "default" | "large";
  tone?: "violet" | "gold" | "cyan";
  className?: string;
  titleId?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  subhead,
  align = "left",
  size = "default",
  tone = "violet",
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
          "font-display leading-[1.05] font-medium text-balance text-ink",
          size === "large" ? "text-4xl sm:text-6xl lg:text-7xl" : "text-3xl sm:text-4xl lg:text-5xl",
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
