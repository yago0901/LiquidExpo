import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("brandStory");

  return (
    <section className="flex min-h-[calc(100vh_-_4rem)] items-center bg-void py-24">
      <Container narrow>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} tone="accent" size="large" />
        <div className="mt-8 flex flex-col gap-6 text-lg text-mist">
          <p>{t("body1")}</p>
          <p>{t("body2")}</p>
        </div>
      </Container>
    </section>
  );
}
