import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";

export async function Footer() {
  const t = await getTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line/60 bg-abyss py-12">
      <Container className="flex flex-col items-center gap-6 text-center">
        <p className="font-display text-2xl text-ink sm:text-3xl">{t("tagline")}</p>
        <p className="gradient-prism-text animate-flow text-sm font-semibold tracking-[0.2em] uppercase">
          {t("signoff")}
        </p>
        <p className="text-sm text-mist">{t("contact")}</p>
        <p className="text-xs text-mist-dim">
          © {year} Liquid Art. {t("rights")}
        </p>
      </Container>
    </footer>
  );
}
