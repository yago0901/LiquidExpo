"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function Manifesto() {
  const t = useTranslations("manifesto");
  const ref = useSectionReveal<HTMLElement>({ variant: "line-reveal" });

  return (
    <section
      id="manifesto"
      ref={ref}
      className="gradient-liquid-manifesto relative overflow-hidden py-28 sm:py-40"
    >
      <Container narrow className="flex flex-col gap-10">
        <Eyebrow tone="violet">{t("eyebrow")}</Eyebrow>

        <h2 className="font-display text-3xl font-medium text-ink sm:text-4xl">{t("title")}</h2>

        <div className="flex flex-col gap-2">
          <span className="block overflow-hidden">
            <span
              data-reveal-line
              className="font-display block text-2xl leading-snug font-medium text-ink sm:text-3xl"
            >
              {t("line1")}
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              data-reveal-line
              className="font-display block text-2xl leading-snug font-medium text-mist sm:text-3xl"
            >
              {t("line2")}
            </span>
          </span>
        </div>

        <p className="text-lg text-mist">{t("body1")}</p>
        <p className="text-lg text-mist">{t("body2")}</p>

        <p className="gradient-prism-text animate-flow font-display pt-6 text-3xl font-semibold sm:text-4xl">
          {t("closing")}
        </p>
      </Container>
    </section>
  );
}
