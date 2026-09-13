"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { useSectionHeaderVariant } from "@/components/layout/HeaderThemeContext";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { boardMembers } from "@/content/board";
import type { LocalizedText } from "@/content/types";

export function BoardSection() {
  const t = useTranslations("board");
  const locale = useLocale() as keyof LocalizedText;
  const containerRef = useSectionReveal<HTMLDivElement>({ variant: "line-reveal", immediate: true });
  const sectionRef = useSectionHeaderVariant<HTMLElement>("onLight");

  const titleLines = t.raw("titleLines") as string[];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#dedbd3] bg-cover bg-center"
      style={{ backgroundImage: "url(/images/brand-texture-gray.webp)" }}
    >
      <Container ref={containerRef} className="relative z-10 flex min-h-screen flex-col py-28">
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-extrabold text-black">{t("sectionNumber")}.</span>
          <span className="text-xs font-semibold tracking-[0.28em] text-black/70 uppercase">
            {t("sectionLabel")}
          </span>
        </div>

        <h2 className="mt-6 font-display text-[11vw] leading-[0.86] font-black text-black uppercase sm:text-8xl lg:text-9xl">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-reveal-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-black/70 sm:text-lg">{t("intro")}</p>

        <ul className="mt-16 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {boardMembers.map((member) => (
            <li key={member.id}>
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-start gap-4"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-full border border-black/15 grayscale transition-all duration-300 group-hover:-translate-y-1 group-hover:grayscale-0">
                  <Image src={member.photo} alt="" fill sizes="96px" className="object-cover" />
                </div>
                <div>
                  <p className="font-display text-sm font-bold text-black uppercase transition-colors group-hover:text-accent">
                    {member.name} <span aria-hidden="true">{member.flag}</span>
                  </p>
                  <p className="mt-1 text-xs font-semibold tracking-wide text-accent uppercase">
                    {member.roleTitle[locale]}
                  </p>
                  <p className="mt-2 text-sm text-black/60">{member.roleDescription[locale]}</p>
                  <p className="mt-3 flex items-center gap-1 text-xs font-semibold tracking-wide text-black/40 uppercase opacity-0 transition-opacity group-hover:opacity-100">
                    LinkedIn <span aria-hidden="true">↗</span>
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
