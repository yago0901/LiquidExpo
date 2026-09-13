"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { useSectionHeaderVariant } from "@/components/layout/HeaderThemeContext";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function BrandStorySection() {
  const t = useTranslations("brandStory");
  const containerRef = useSectionReveal<HTMLDivElement>({ variant: "line-reveal", immediate: true });
  const sectionRef = useSectionHeaderVariant<HTMLElement>("onDark");

  const statementLines = t.raw("statementLines") as string[];

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-[#1a0605] bg-cover bg-center"
      style={{ backgroundImage: "url(/images/texturavermelha.webp)" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-black/35" />

      <Container
        ref={containerRef}
        className="relative z-10 flex min-h-screen flex-col py-28"
      >
        <div className="flex items-baseline gap-3">
          <span className="font-display text-2xl font-extrabold text-white">{t("sectionNumber")}.</span>
          <span className="text-xs font-semibold tracking-[0.28em] text-white/70 uppercase">
            {t("sectionLabel")}
          </span>
        </div>

        <div className="mt-8 grid flex-1 gap-12 lg:grid-cols-[minmax(0,260px)_1fr] lg:gap-16">
          <p className="text-sm leading-relaxed text-white/70">{t("body2")}</p>

          <div className="flex h-full flex-col">
            <h2 className="font-display text-[11vw] leading-[0.86] font-black text-white uppercase sm:text-8xl lg:text-9xl">
              {statementLines.map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span data-reveal-line className="block">
                    {line}
                  </span>
                </span>
              ))}
            </h2>

            <div className="relative mt-auto ml-auto aspect-[4/3] w-full max-w-md self-end overflow-hidden rounded-sm sm:w-2/3">
              <Image
                src="/images/mission-wave-portrait.webp"
                alt=""
                fill
                sizes="(min-width: 640px) 400px, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
