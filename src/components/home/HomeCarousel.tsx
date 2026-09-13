"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import type { VideoClip } from "@/content/types";

const CarouselCanvas = dynamic(
  () => import("./CarouselCanvas").then((mod) => mod.CarouselCanvas),
  { ssr: false },
);

export function HomeCarousel({ clips }: { clips: VideoClip[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations("home");
  const count = clips.length;

  function go(delta: number) {
    setCurrentIndex((i) => (i + delta + count) % count);
  }

  const current = clips[currentIndex];

  return (
    <div className="relative h-full w-full overflow-hidden bg-void">
      <CarouselCanvas clips={clips} currentIndex={currentIndex} />

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-6 sm:p-10">
        <h1 className="font-display max-w-[60%] text-3xl leading-[0.95] font-extrabold tracking-tight text-ink uppercase sm:text-6xl">
          {current?.title}
        </h1>

        <div className="pointer-events-auto flex items-center gap-3">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label={t("previous")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            «
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label={t("next")}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-accent hover:text-accent"
          >
            »
          </button>
        </div>
      </div>
    </div>
  );
}
