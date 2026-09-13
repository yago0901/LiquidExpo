"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";
import { boardMembers } from "@/content/board";
import type { LocalizedText } from "@/content/types";

export function Board() {
  const t = useTranslations("board");
  const locale = useLocale() as keyof LocalizedText;
  const ref = useSectionReveal<HTMLElement>({ variant: "simple-fade" });

  return (
    <section id="board" ref={ref} className="relative overflow-hidden bg-abyss py-24 sm:py-32">
      <Container>
        <div data-reveal>
          <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} />
        </div>

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {boardMembers.map((member) => (
            <div key={member.id} data-reveal className="flex flex-col gap-1 bg-abyss p-6">
              <dt className="text-base font-semibold text-ink">
                {member.name} <span aria-hidden="true">{member.flag}</span> — {member.roleTitle[locale]}
              </dt>
              <dd className="text-sm text-mist">{member.roleDescription[locale]}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
