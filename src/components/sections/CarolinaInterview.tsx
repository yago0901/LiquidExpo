"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { interviews } from "@/content/interviews";
import type { LocalizedText } from "@/content/types";

export function CarolinaInterview() {
  const t = useTranslations("interview");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "fade-up-stagger" });

  return (
    <section id="interview" ref={ref} className="relative overflow-hidden bg-void py-24 sm:py-32">
      <Container narrow>
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} tone="gold" />
        </div>

        <ul className="mt-10 flex flex-col gap-5">
          {interviews.map((interview) => (
            <Card as="li" key={interview.id} data-reveal className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <span
                className="gradient-liquid-warm flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl text-ink"
                aria-hidden="true"
              >
                ▶
              </span>
              <div className="flex-1">
                <h3 className="font-display text-lg font-medium text-ink">{interview.title[locale]}</h3>
                <p className="mt-1 text-sm font-semibold text-gold">{interview.participants}</p>
                <p className="mt-2 text-sm text-mist">{interview.description[locale]}</p>
              </div>
              <Button href={interview.href ?? "#"} variant="secondary">
                {tc("watch")}
              </Button>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
