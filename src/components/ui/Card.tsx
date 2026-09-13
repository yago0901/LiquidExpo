import { createElement, type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type CardProps = HTMLAttributes<HTMLElement> & {
  as?: "div" | "article" | "li";
};

export function Card({ className, as = "div", ...props }: CardProps) {
  return createElement(as, {
    className: cn(
      "group relative overflow-hidden rounded-2xl border border-line bg-surface/60 p-6 backdrop-blur-sm transition-all duration-500",
      "hover:-translate-y-1 hover:border-accent/60 hover:bg-surface",
      className,
    ),
    ...props,
  });
}
