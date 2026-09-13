"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

type LiquidShapeAccentProps = {
  src: string;
  className?: string;
  speed?: number;
  flip?: boolean;
  rotate?: number;
};

export function LiquidShapeAccent({
  src,
  className,
  speed = 0.18,
  flip = false,
  rotate = 0,
}: LiquidShapeAccentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (!wrapperRef.current || reduced) return;

      gsap.to(wrapperRef.current, {
        yPercent: speed * 100,
        rotate,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    { scope: wrapperRef, dependencies: [reduced, speed, rotate] },
  );

  return (
    <div
      ref={wrapperRef}
      aria-hidden="true"
      className={cn("pointer-events-none absolute hidden select-none sm:block", className)}
    >
      <Image
        src={src}
        alt=""
        width={800}
        height={800}
        className={cn("h-auto w-full", flip && "-scale-x-100")}
      />
    </div>
  );
}
