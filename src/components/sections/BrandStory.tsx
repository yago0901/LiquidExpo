"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function BrandStory() {
  const t = useTranslations("brandStory");
  const ref = useSectionReveal<HTMLElement>({ variant: "fade-up-stagger" });

  return (
    <section
      id="brand-story"
      ref={ref}
      className="gradient-liquid-warm relative overflow-hidden py-28 sm:py-36"
    >
      <Container className="relative z-10">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          <div data-reveal>
            <SectionHeading eyebrow={t("eyebrow")} title={t("title")} tone="gold" size="large" />
          </div>
          <div className="flex flex-col gap-6">
            <p data-reveal className="text-lg text-mist">
              {t("body1")}
            </p>
            <p data-reveal className="text-lg text-mist">
              {t("body2")}
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
