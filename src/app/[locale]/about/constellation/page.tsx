"use client";

import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { TransitionLink } from "@/components/layout/TransitionLink";
import { teamMembers } from "@/content/team";
import type { LocalizedText } from "@/content/types";

export default function ConstellationPage() {
  const t = useTranslations("team");
  const tc = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;

  return (
    <section className="bg-void py-24">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} size="large" />

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card as="li" key={member.id}>
              <p className="text-sm font-semibold text-ink">
                {member.name} <span aria-hidden="true">{member.flag}</span>
              </p>
              <p className="mt-1 text-xs font-semibold tracking-wide text-accent uppercase">
                {member.roleTag[locale]}
              </p>
              <p className="mt-4 text-sm text-mist">{member.descriptor[locale]}</p>
              <TransitionLink
                href={member.href ?? "/contact"}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-ink hover:text-accent"
              >
                {tc("knowMore")} <span aria-hidden="true">→</span>
              </TransitionLink>
            </Card>
          ))}
        </ul>
      </Container>
    </section>
  );
}
