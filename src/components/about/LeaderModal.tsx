"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { Leader, LocalizedText } from "@/content/types";

export function LeaderModal({
  leader,
  onClose,
}: {
  leader: Leader | null;
  onClose: () => void;
}) {
  const t = useTranslations("common");
  const locale = useLocale() as keyof LocalizedText;
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!leader) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKeyDown);
    dialogRef.current?.focus();
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [leader, onClose]);

  if (!leader) return null;

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-black/70 p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label={leader.name}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        className="relative flex w-full max-w-md flex-col items-center gap-5 rounded-2xl border border-line bg-void p-8 text-center outline-none"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
        >
          ×
        </button>

        <div className="relative h-24 w-24 overflow-hidden rounded-full border border-line">
          <Image src={leader.photo} alt="" fill sizes="96px" className="object-cover" />
        </div>

        <div>
          <p className="font-display text-lg font-bold tracking-wide text-ink uppercase">
            {leader.name}
          </p>
          <p className="mt-1 text-xs font-semibold tracking-[0.28em] text-accent uppercase">
            {leader.roleTitle[locale]}
          </p>
        </div>

        <p className="text-sm leading-relaxed text-mist">{leader.bio[locale]}</p>
      </div>
    </div>
  );
}
