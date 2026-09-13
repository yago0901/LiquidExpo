"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { exhibitions } from "@/content/exhibitions";
import type { LocalizedText } from "@/content/types";

export function Exhibitions() {
  const t = useTranslations("exhibitions");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "pin-parallax" });

  return (
    <section id="exhibitions" ref={ref} className="relative overflow-hidden py-28 sm:py-36">
      <div
        data-parallax-bg
        className="absolute inset-0 -top-24 -bottom-24"
        aria-hidden="true"
      >
        <Image
          src="/images/exhibitions-crowd.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-void/80" />
      </div>

      <Container className="relative z-10">
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} size="large" />
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-3">
          {exhibitions.map((exhibition) => (
            <Card as="li" key={exhibition.id} data-reveal className="bg-void/70">
              <h3 className="font-display text-lg font-medium text-ink">{exhibition.name}</h3>
              <p className="mt-1 text-xs font-semibold tracking-wide text-gold uppercase">
                {exhibition.artist}
              </p>
              <p className="mt-4 text-sm text-mist">{exhibition.concept[locale]}</p>
              <Button
                href={exhibition.watchHref ?? "#"}
                variant="ghost"
                className="mt-5 px-0"
              >
                {tc("watch")} <span aria-hidden="true">→</span>
              </Button>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
