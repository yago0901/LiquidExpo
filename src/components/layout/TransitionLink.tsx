"use client";

import type { ComponentProps, MouseEvent } from "react";
import { Link } from "@/i18n/navigation";
import { usePageTransition } from "./PageTransitionProvider";

type TransitionLinkProps = ComponentProps<typeof Link>;

export function TransitionLink({ href, onClick, ...props }: TransitionLinkProps) {
  const { navigate } = usePageTransition();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(typeof href === "string" ? href : (href.pathname ?? "/"));
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
