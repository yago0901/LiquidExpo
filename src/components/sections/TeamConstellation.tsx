"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { teamMembers } from "@/content/team";
import type { LocalizedText } from "@/content/types";

export function TeamConstellation() {
  const t = useTranslations("team");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "grid-stagger" });

  return (
    <section id="team" ref={ref} className="relative overflow-hidden bg-void py-28 sm:py-36">
      <Container className="relative z-10">
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} size="large" />
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card as="li" key={member.id} data-reveal>
              <p className="text-sm font-semibold text-ink">
                {member.name} <span aria-hidden="true">{member.flag}</span>
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-violet uppercase">
                {member.roleTag[locale]}
              </p>
              <p className="mt-4 text-sm text-mist">{member.descriptor[locale]}</p>
              <a
                href={member.href ?? "#partner"}
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
