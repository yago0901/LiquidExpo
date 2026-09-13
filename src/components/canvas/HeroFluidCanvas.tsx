"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import type { ShaderMaterial } from "three";
import { createFluidMaterial } from "./fluidMaterial";
import { LiquidBlob } from "./LiquidBlob";
import type { DeviceTier } from "./useDeviceTier";

type FluidPlaneProps = {
  tier: "a" | "b";
  dissolveRef: React.MutableRefObject<number>;
};

type FluidUniforms = {
  uTime: number;
  uResolution: { set: (x: number, y: number) => void };
  uMouse: { set: (x: number, y: number) => void };
  uMouseStrength: number;
  uDissolve: number;
};

/* eslint-disable react-hooks/refs */
function FluidPlane({ tier, dissolveRef }: FluidPlaneProps) {
  const { viewport, size, pointer } = useThree();

  const materialRef = useRef<(ShaderMaterial & FluidUniforms) | null>(null);
  const materialTierRef = useRef<"a" | "b" | null>(null);

  if (materialTierRef.current !== tier) {
    materialRef.current?.dispose();
    const FluidMaterial = createFluidMaterial(tier === "a" ? 5 : 3);
    materialRef.current = new FluidMaterial() as unknown as ShaderMaterial & FluidUniforms;
    materialTierRef.current = tier;
  }

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
    };
  }, []);

  useFrame((state) => {
    const material = materialRef.current;
    if (!material) return;

    material.uTime = state.clock.elapsedTime;
    material.uResolution.set(size.width, size.height);
    material.uDissolve = dissolveRef.current;

    if (tier === "a") {
      material.uMouse.set(pointer.x * 0.5 + 0.5, pointer.y * 0.5 + 0.5);
      material.uMouseStrength = 1;
    } else {
      material.uMouseStrength = 0;
    }
  });

  if (!materialRef.current) return null;

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <primitive object={materialRef.current} attach="material" />
    </mesh>
  );
}

export function HeroFluidCanvas({
  tier,
  dissolveRef,
}: {
  tier: DeviceTier;
  dissolveRef: React.MutableRefObject<number>;
}) {
  const [visible, setVisible] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (tier === "c") return null;

  return (
    <div
      ref={wrapperRef}
      className="h-full w-full transition-opacity duration-1000"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <Canvas
        dpr={tier === "a" ? [1, 2] : 1}
        frameloop={inView ? "always" : "never"}
        gl={{
          antialias: false,
          powerPreference: tier === "a" ? "high-performance" : "low-power",
        }}
      >
        <FluidPlane tier={tier} dissolveRef={dissolveRef} />
        <LiquidBlob tier={tier} />
      </Canvas>
    </div>
  );
}
