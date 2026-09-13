"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { useSectionReveal } from "@/lib/motion/useSectionReveal";

export function Newsletter() {
  const t = useTranslations("newsletter");
  const tc = useTranslations("common");
  const ref = useSectionReveal<HTMLElement>({ variant: "fade-up-stagger" });
  const [submitted, setSubmitted] = useState(false);
  const inputId = useId();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section id="newsletter" ref={ref} className="relative overflow-hidden bg-void py-28 sm:py-32">
      <Container narrow className="relative z-10 flex flex-col items-center gap-6 text-center">
        <div data-reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            subhead={t("body")}
            align="center"
            tone="cyan"
          />
        </div>

        <form
          data-reveal
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-3 sm:flex-row"
        >
          <label htmlFor={inputId} className="sr-only">
            {t("placeholder")}
          </label>
          <input
            id={inputId}
            type="email"
            required
            placeholder={t("placeholder")}
            className="w-full rounded-full border border-line bg-surface/60 px-5 py-3 text-sm text-ink placeholder:text-mist-dim focus-visible:border-cyan"
          />
          <Button type="submit">{tc("subscribe")}</Button>
        </form>

        {submitted ? (
          <p role="status" className="text-sm text-cyan">
            {t("success")}
          </p>
        ) : (
          <p className="text-xs text-mist-dim">{t("disclaimer")}</p>
        )}
      </Container>
    </section>
  );
}
