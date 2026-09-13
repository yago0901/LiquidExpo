"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/lib/motion/useReducedMotion";

export type DeviceTier = "a" | "b" | "c";

export function useDeviceTier(): DeviceTier {
  const reduced = useReducedMotion();
  const [tier, setTier] = useState<DeviceTier>("c");

  useEffect(() => {
    if (reduced) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setTier("c");
      return;
    }

    if (typeof window === "undefined") return;

    let gl: RenderingContext | null = null;
    try {
      const canvas = document.createElement("canvas");
      gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    } catch {
      gl = null;
    }

    if (!gl) {
      setTier("c");
      return;
    }

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;

    setTier(isFinePointer && cores >= 4 ? "a" : "b");
  }, [reduced]);

  return tier;
}
