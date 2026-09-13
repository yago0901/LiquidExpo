"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "./useReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export type RevealVariant =
  | "fade-up-stagger"
  | "pin-parallax"
  | "line-reveal"
  | "grid-stagger"
  | "simple-fade";

type UseSectionRevealOptions = {
  variant: RevealVariant;
  start?: string;
  immediate?: boolean;
};

export function useSectionReveal<T extends HTMLElement = HTMLElement>({
  variant,
  start = "top 75%",
  immediate = false,
}: UseSectionRevealOptions) {
  const containerRef = useRef<T | null>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      if (reduced) {
        gsap.set("[data-reveal], [data-reveal-line]", {
          opacity: 1,
          y: 0,
          clearProps: "transform",
        });
        return;
      }

      const scrollTrigger = immediate ? undefined : { trigger: container, start, once: true };

      switch (variant) {
        case "fade-up-stagger":
        case "grid-stagger": {
          gsap.from(container.querySelectorAll("[data-reveal]"), {
            opacity: 0,
            y: 32,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            scrollTrigger,
          });
          break;
        }
        case "line-reveal": {
          gsap.from(container.querySelectorAll("[data-reveal-line]"), {
            opacity: 0,
            yPercent: 100,
            duration: 1.4,
            ease: "power4.out",
            stagger: 0.24,
            scrollTrigger,
          });
          break;
        }
        case "pin-parallax": {
          const bg = container.querySelector("[data-parallax-bg]");
          if (bg) {
            gsap.to(bg, {
              yPercent: 15,
              ease: "none",
              scrollTrigger: {
                trigger: container,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
          gsap.from(container.querySelectorAll("[data-reveal]"), {
            opacity: 0,
            y: 24,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger,
          });
          break;
        }
        case "simple-fade":
        default: {
          gsap.from(container.querySelectorAll("[data-reveal]"), {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger,
          });
          break;
        }
      }
    },
    { scope: containerRef, dependencies: [variant, reduced, immediate] },
  );

  return containerRef;
}
