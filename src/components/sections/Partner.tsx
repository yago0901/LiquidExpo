"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function Partner() {
  const t = useTranslations("partner");
  const tc = useTranslations("common");
  const ref = useSectionReveal<HTMLElement>({ variant: "fade-up-stagger" });

  return (
    <section
      id="partner"
      ref={ref}
      className="gradient-liquid-warm relative overflow-hidden py-28 text-center sm:py-32"
    >
      <Container narrow className="flex flex-col items-center gap-6">
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("body")} align="center" tone="gold" />
        </div>
        <div data-reveal>
          <Button href="mailto:hello@liquidart.example" size="lg">
            {tc("startConversation")}
          </Button>
        </div>
      </Container>
    </section>
  );
}
