"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { TransitionLink } from "./TransitionLink";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { useHeaderTheme } from "./HeaderThemeContext";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

const WORKS_ITEMS = [
  { key: "exhibitions", href: "/works/exhibitions" },
  { key: "articles", href: "/works/articles" },
  { key: "teasers", href: "/works/teasers" },
  { key: "videoClips", href: "/works/video-clips" },
] as const;

function NavDropdown({
  label,
  items,
  labels,
  dark,
}: {
  label: string;
  items: readonly { key: string; href: string }[];
  labels: (key: string) => string;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", onClickOutside);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onClickOutside);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex items-center gap-1 text-sm tracking-wide uppercase transition-colors",
          dark ? "text-black/60 hover:text-black" : "text-mist hover:text-ink",
        )}
      >
        {label}
        <span aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
          ▾
        </span>
      </button>
      {open ? (
        <ul className="absolute top-full left-1/2 mt-4 w-56 -translate-x-1/2 rounded-xl border border-line bg-void p-2 shadow-xl">
          {items.map((item) => (
            <li key={item.key}>
              <TransitionLink
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2 text-sm text-mist transition-colors hover:bg-surface hover:text-ink"
              >
                {labels(item.key)}
              </TransitionLink>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const tl = useTranslations("nav.links");
  const { variant } = useHeaderTheme();
  const transparent = variant !== "solid";
  const dark = variant === "onLight";

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[100] border-b transition-colors duration-300",
        transparent ? "border-transparent bg-transparent" : "border-line/60 bg-void",
      )}
    >
      <Container className="flex h-16 items-center">
        <TransitionLink
          href="/"
          className={cn(
            "flex items-center gap-2 font-display text-sm font-bold tracking-wide uppercase transition-colors duration-300",
            dark ? "text-black" : "text-ink",
          )}
        >
          <Image
            src="/images/logo-mark-icon.webp"
            alt=""
            aria-hidden="true"
            width={184}
            height={118}
            className="mix-blend-screen h-7 w-auto"
          />
          {t("brand")}
        </TransitionLink>

        <nav aria-label={t("brand")} className="hidden items-center gap-8 md:flex md:ml-10">
          <TransitionLink
            href="/"
            className={cn(
              "text-sm tracking-wide uppercase transition-colors",
              dark ? "text-black/60 hover:text-black" : "text-mist hover:text-ink",
            )}
          >
            {t("home")}
          </TransitionLink>
          <TransitionLink
            href="/about"
            className={cn(
              "text-sm tracking-wide uppercase transition-colors",
              dark ? "text-black/60 hover:text-black" : "text-mist hover:text-ink",
            )}
          >
            {t("about")}
          </TransitionLink>
          <NavDropdown label={t("works")} items={WORKS_ITEMS} labels={tl} dark={dark} />
          <TransitionLink
            href="/contact"
            className={cn(
              "text-sm tracking-wide uppercase transition-colors",
              dark ? "text-black/60 hover:text-black" : "text-mist hover:text-ink",
            )}
          >
            {t("contact")}
          </TransitionLink>
        </nav>

        <div className="ml-auto flex items-center gap-3">
          <LocaleSwitcher dark={dark} />
          <ThemeToggle dark={dark} />
        </div>
      </Container>
    </header>
  );
}
