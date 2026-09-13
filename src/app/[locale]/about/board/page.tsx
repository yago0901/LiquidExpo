import { getLocale, getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { boardMembers } from "@/content/board";
import type { LocalizedText } from "@/content/types";

export default async function BoardPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: routeLocale } = await params;
  setRequestLocale(routeLocale);
  const t = await getTranslations("board");
  const locale = (await getLocale()) as keyof LocalizedText;

  return (
    <section className="bg-void py-24">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subhead={t("intro")} size="large" />

        <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
          {boardMembers.map((member) => (
            <div key={member.id} className="flex flex-col gap-1 bg-void p-6">
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
