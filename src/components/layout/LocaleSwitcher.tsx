"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations("nav");

  function switchTo(next: string) {
    router.replace(pathname, { locale: next });
  }

  return (
    <div
      role="group"
      aria-label={t("languageLabel")}
      className="flex items-center gap-1 rounded-full border border-line bg-surface/60 p-1"
    >
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          onClick={() => switchTo(loc)}
          aria-pressed={locale === loc}
          aria-label={loc === "en" ? t("switchToEnglish") : t("switchToPortuguese")}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold tracking-wide uppercase transition-colors",
            locale === loc
              ? "bg-gradient-to-r from-violet to-cyan text-void"
              : "text-mist hover:text-ink",
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
