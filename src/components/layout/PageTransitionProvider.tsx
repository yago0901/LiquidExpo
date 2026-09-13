"use client";

import { createContext, useContext, useEffect, useRef, useTransition } from "react";
import gsap from "gsap";
import { useRouter } from "@/i18n/navigation";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

type TransitionContextValue = {
  navigate: (href: string) => void;
};

const TransitionContext = createContext<TransitionContextValue | null>(null);

export function usePageTransition() {
  const ctx = useContext(TransitionContext);
  if (!ctx) {
    throw new Error("usePageTransition must be used within PageTransitionProvider");
  }
  return ctx;
}

type Phase = "idle" | "covering" | "covered" | "revealing";

export function PageTransitionProvider({ children }: { children: React.ReactNode }) {
  const curtainRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const reduced = useReducedMotion();
  const [isPending, startTransition] = useTransition();
  const phaseRef = useRef<Phase>("idle");

  function navigate(href: string) {
    if (phaseRef.current !== "idle") return;
    const curtain = curtainRef.current;

    if (reduced || !curtain) {
      startTransition(() => router.push(href));
      return;
    }

    phaseRef.current = "covering";
    gsap.to(curtain, {
      height: "115vh",
      "--curtain-radius": "0px",
      duration: 0.6,
      ease: "power4.inOut",
      onComplete: () => {
        phaseRef.current = "covered";
        startTransition(() => {
          router.push(href);
        });
      },
    });
  }

  useEffect(() => {
    if (phaseRef.current === "covered" && !isPending) {
      const curtain = curtainRef.current;
      phaseRef.current = "revealing";
      gsap.to(curtain, {
        height: "0px",
        "--curtain-radius": "32px",
        duration: 0.6,
        ease: "power4.inOut",
        delay: 0.15,
        onComplete: () => {
          phaseRef.current = "idle";
        },
      });
    }
  }, [isPending]);

  return (
    <TransitionContext.Provider value={{ navigate }}>
      {children}
      <div ref={curtainRef} className="page-curtain" aria-hidden="true">
        <div className="page-curtain-grain" />
      </div>
    </TransitionContext.Provider>
  );
}
