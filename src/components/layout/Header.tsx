import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";

const navSections = ["mission", "manifesto", "team", "exhibitions", "articles", "partner"] as const;

export async function Header() {
  const t = await getTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-line/60 bg-void/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2 font-display text-sm font-semibold tracking-wide text-ink"
        >
          <span className="relative h-8 w-8 overflow-hidden rounded-full border border-line">
            <Image
              src="/images/logo-mark.webp"
              alt=""
              aria-hidden="true"
              fill
              sizes="32px"
              className="object-cover"
            />
          </span>
          {t("brand")}
        </a>

        <nav aria-label={t("brand")} className="hidden items-center gap-6 text-sm text-mist md:flex">
          {navSections.map((section) => (
            <a
              key={section}
              href={`#${section}`}
              className="transition-colors hover:text-ink"
            >
              {t(`links.${section}`)}
            </a>
          ))}
        </nav>

        <LocaleSwitcher />
      </Container>
    </header>
  );
}
