"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { articles } from "@/content/articles";
import type { LocalizedText } from "@/content/types";

export function Articles() {
  const t = useTranslations("articles");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "grid-stagger" });

  return (
    <section id="articles" ref={ref} className="relative overflow-hidden bg-void py-28 sm:py-36">
      <div className="absolute inset-0 opacity-[0.08]" aria-hidden="true">
        <Image
          src="/images/hero-architecture.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <Container className="relative z-10">
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} size="large" />
        </div>

        <ul className="mt-12 grid gap-5 lg:grid-cols-2">
          {articles.map((article) => (
            <Card as="li" key={article.id} data-reveal>
              <h3 className="font-display text-xl font-medium text-ink">{article.title[locale]}</h3>
              <p className="mt-3 text-sm text-mist">{article.dek[locale]}</p>
              <a
                href={article.href ?? "#"}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-ink"
              >
                {tc("knowMore")} <span aria-hidden="true">→</span>
              </a>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
