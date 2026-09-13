"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function Mission() {
  const t = useTranslations("mission");
  const ref = useSectionReveal<HTMLElement>({ variant: "pin-parallax" });

  return (
    <section
      id="mission"
      ref={ref}
      className="relative overflow-hidden bg-abyss py-28 sm:py-36"
    >
      <div
        data-parallax-bg
        className="absolute inset-0 -top-24 -bottom-24 opacity-25"
        aria-hidden="true"
      >
        <Image
          src="/images/mission-wave-portrait.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss via-abyss/70 to-abyss" />
      </div>

      <Container className="relative z-10">
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} size="large" />
        </div>
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <p data-reveal className="text-lg text-mist">
            {t("body1")}
          </p>
          <p data-reveal className="text-lg text-mist">
            {t("body2")}
          </p>
        </div>
      </Container>
    </section>
  );
}
