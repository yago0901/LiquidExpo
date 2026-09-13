import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default async function ManifestoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("manifesto");

  return (
    <section className="min-h-[calc(100vh_-_4rem)] bg-void py-24">
      <Container narrow className="flex flex-col gap-10">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink uppercase sm:text-6xl">
          {t("title")}
        </h1>

        <div className="flex flex-col gap-2">
          <p className="font-display text-2xl leading-snug font-medium text-ink sm:text-3xl">
            {t("line1")}
          </p>
          <p className="font-display text-2xl leading-snug font-medium text-mist sm:text-3xl">
            {t("line2")}
          </p>
        </div>

        <p className="text-lg text-mist">{t("body1")}</p>
        <p className="text-lg text-mist">{t("body2")}</p>

        <p className="font-display pt-6 text-3xl font-extrabold text-accent uppercase sm:text-4xl">
          {t("closing")}
        </p>
      </Container>
    </section>
  );
}
