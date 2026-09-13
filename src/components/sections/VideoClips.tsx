"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { videoClips } from "@/content/videoClips";

export function VideoClips() {
  const t = useTranslations("videoClips");
  const tc = useTranslations("common");
  const ref = useSectionReveal<HTMLElement>({ variant: "grid-stagger" });

  return (
    <section id="video-clips" ref={ref} className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} />
        </div>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videoClips.map((clip) => (
            <Card as="li" key={clip.id} data-reveal className="p-0">
              <div
                className="gradient-liquid-hero flex aspect-video items-center justify-center"
                aria-hidden="true"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-void/60 text-ink">
                  ▶
                </span>
              </div>
              <div className="p-6">
                <h3 className="font-display text-lg font-medium text-ink">{clip.title}</h3>
                <p className="mt-1 text-xs font-semibold tracking-wide text-cyan uppercase">{clip.artist}</p>
                <a
                  href={clip.href ?? "#"}
                  className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan hover:text-ink"
                >
                  {tc("watch")} <span aria-hidden="true">→</span>
                </a>
              </div>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
