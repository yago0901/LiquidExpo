"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { teasers } from "@/content/teasers";
import type { LocalizedText } from "@/content/types";

export function Teasers() {
  const t = useTranslations("teasers");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "grid-stagger" });

  return (
    <section id="teasers" ref={ref} className="relative overflow-hidden bg-abyss py-28 sm:py-36">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2">
          {teasers.map((teaser) => (
            <Card as="li" key={teaser.id} data-reveal className="p-0">
              <div
                className="gradient-liquid-hero flex aspect-video items-center justify-center"
                aria-hidden="true"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void/60 text-ink">
                  ▶
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium text-ink">{teaser.projectName}</h3>
                <p className="mt-2 text-sm text-mist">{teaser.context[locale]}</p>
                <a
                  href={teaser.href ?? "#"}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-ink"
                >
                  {tc("knowMore")} <span aria-hidden="true">→</span>
                </a>
              </div>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
