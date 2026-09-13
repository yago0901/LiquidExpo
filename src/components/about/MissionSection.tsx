"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { useSectionHeaderVariant } from "@/components/layout/HeaderThemeContext";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { missionLeaders } from "@/content/leaders";
import type { Leader } from "@/content/types";
import { LeaderModal } from "./LeaderModal";

export function MissionSection() {
  const t = useTranslations("mission");
  const [activeLeader, setActiveLeader] = useState<Leader | null>(null);
  const containerRef = useSectionReveal<HTMLDivElement>({ variant: "line-reveal", immediate: true });
  const sectionRef = useSectionHeaderVariant<HTMLElement>("onLight");

  const titleLines = t.raw("titleLines") as string[];
  const [leaderA, leaderB] = missionLeaders;

  return (
    <section
      ref={sectionRef}
      className="relative -mt-16 min-h-screen overflow-hidden bg-gradient-to-br from-[#e2481f] via-[#c9331a] to-[#8f2313]"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 bottom-0 h-[420px] w-[420px] rounded-full bg-[#ff6a3f]/40 blur-3xl"
      />

      <Container
        ref={containerRef}
        className="relative z-10 flex min-h-screen flex-col justify-center pt-24 pb-28"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-extrabold text-black">{t("sectionNumber")}.</span>
          <span className="text-xs font-semibold tracking-[0.28em] text-black/70 uppercase">
            {t("sectionLabel")}
          </span>
        </div>

        <h2 className="mt-6 font-display text-[13vw] leading-[0.88] font-black text-black uppercase sm:text-8xl lg:text-9xl">
          {titleLines.map((line) => (
            <span key={line} className="block overflow-hidden">
              <span data-reveal-line className="block">
                {line}
              </span>
            </span>
          ))}
        </h2>

        <div className="mt-12 flex max-w-4xl flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <p className="max-w-xl text-base leading-relaxed text-black/80 sm:text-lg">
            {t("leadersPrefix")}
            <button
              type="button"
              onClick={() => setActiveLeader(leaderA)}
              className="text-white underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80"
            >
              {leaderA.name}
            </button>
            {t("leadersMiddle")}
            <button
              type="button"
              onClick={() => setActiveLeader(leaderB)}
              className="text-white underline decoration-2 underline-offset-4 transition-opacity hover:opacity-80"
            >
              {leaderB.name}
            </button>
            {t("leadersSuffix")}
          </p>

          <div className="flex shrink-0 -space-x-4">
            {missionLeaders.map((leader) => (
              <button
                key={leader.id}
                type="button"
                onClick={() => setActiveLeader(leader)}
                aria-label={leader.name}
                className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-black/20 transition-transform hover:-translate-y-1"
              >
                <Image src={leader.photo} alt="" fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      </Container>

      <LeaderModal leader={activeLeader} onClose={() => setActiveLeader(null)} />
    </section>
  );
}
