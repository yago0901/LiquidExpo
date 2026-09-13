import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

export default async function FounderPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("founder");

  return (
    <section className="flex min-h-[calc(100vh_-_4rem)] items-center bg-void py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div className="flex justify-center lg:justify-start">
            <div
              className="flex h-48 w-48 items-center justify-center rounded-full border border-line bg-surface text-5xl font-extrabold text-ink sm:h-56 sm:w-56"
              aria-hidden="true"
            >
              CD
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-ink uppercase sm:text-5xl">
              {t("name")} <span aria-hidden="true">{t("flag")}</span>
            </h1>
            <p className="text-sm font-semibold tracking-wide text-mist uppercase">{t("title")}</p>
            <p className="text-lg text-mist">{t("bioLong")}</p>
            <p className="text-lg text-mist">{t("bioLong2")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}
