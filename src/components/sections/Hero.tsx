"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";
import { useDeviceTier } from "@/components/canvas/useDeviceTier";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

const HeroFluidCanvas = dynamic(
  () => import("@/components/canvas/HeroFluidCanvas").then((mod) => mod.HeroFluidCanvas),
  { ssr: false },
);

export function Hero() {
  const t = useTranslations("hero");
  const tc = useTranslations("common");
  const tier = useDeviceTier();
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const canvasWrapperRef = useRef<HTMLDivElement>(null);
  const dissolveRef = useRef(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      if (reduced) {
        gsap.set("[data-reveal]", { opacity: 1, y: 0 });
      } else {
        gsap.from("[data-reveal]", {
          opacity: 0,
          y: 24,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.12,
          delay: 0.15,
        });

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          onUpdate: (self) => {
            dissolveRef.current = self.progress;
            if (canvasWrapperRef.current) {
              canvasWrapperRef.current.style.opacity = String(1 - self.progress);
            }
          },
        });
      }
    },
    { scope: sectionRef, dependencies: [reduced] },
  );

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="gradient-liquid-hero relative flex min-h-screen items-center overflow-hidden"
    >
      <div ref={canvasWrapperRef} className="absolute inset-0" aria-hidden="true">
        {tier !== "c" ? <HeroFluidCanvas tier={tier} dissolveRef={dissolveRef} /> : null}
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[5] bg-gradient-to-r from-void/85 via-void/50 to-transparent"
        aria-hidden="true"
      />

      <Container className="pointer-events-none relative z-10">
        <div className="flex max-w-3xl flex-col gap-6">
          <div data-reveal>
            <Eyebrow tone="gold">{t("eyebrow")}</Eyebrow>
          </div>
          <h1
            data-reveal
            className="font-display text-5xl leading-[1.02] font-medium text-ink sm:text-6xl lg:text-7xl"
          >
            {t("headline")}
          </h1>
          <p data-reveal className="max-w-xl text-lg text-mist">
            {t("subhead")}
          </p>
          <div data-reveal className="pointer-events-auto flex flex-wrap items-center gap-4 pt-2">
            <Button href="#partner">{tc("join")}</Button>
            <Button href="#manifesto" variant="secondary">
              {tc("watchManifesto")}
            </Button>
          </div>
          <p data-reveal className="text-sm text-mist-dim">
            {t("microline")}
          </p>
        </div>
      </Container>
    </section>
  );
}
