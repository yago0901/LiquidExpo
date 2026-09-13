"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function Founder() {
  const t = useTranslations("founder");
  const ref = useSectionReveal<HTMLElement>({ variant: "fade-up-stagger" });

  return (
    <section id="founder" ref={ref} className="relative overflow-hidden bg-abyss py-28 sm:py-36">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div data-reveal className="flex justify-center lg:justify-start">
            <div
              className="animate-pulse-slow flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-violet via-violet-deep to-cyan text-5xl font-semibold text-ink shadow-[0_0_60px_10px_rgba(139,92,246,0.35)] sm:h-56 sm:w-56"
              aria-hidden="true"
            >
              CD
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div data-reveal>
              <Eyebrow tone="cyan">{t("eyebrow")}</Eyebrow>
            </div>
            <h2 data-reveal className="font-display text-3xl font-medium text-ink sm:text-4xl">
              {t("name")} <span aria-hidden="true">{t("flag")}</span>
            </h2>
            <p data-reveal className="text-sm font-semibold tracking-wide text-mist uppercase">
              {t("title")}
            </p>
            <p data-reveal className="text-lg text-mist">
              {t("bioLong")}
            </p>
            <p data-reveal className="text-lg text-mist">
              {t("bioLong2")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
