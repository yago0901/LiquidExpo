"use client";

import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createCarouselCardMaterial } from "./videoCarouselMaterial";
import { useClipTexture } from "./useClipTexture";

type CardMaterial = THREE.ShaderMaterial & {
  uMap: THREE.Texture | null;
  uFocus: number;
  uRadius: number;
};

type VideoCardProps = {
  slug: string;
  title: string;
  seed: number;
  angle: number;
  radius: number;
  curveRadius: number;
  width: number;
  height: number;
  focus: number;
};

/* eslint-disable react-hooks/refs */
export function VideoCard({ slug, title, seed, angle, radius, curveRadius, width, height, focus }: VideoCardProps) {
  const materialRef = useRef<CardMaterial | null>(null);
  const texture = useClipTexture(slug, title, seed);

  if (!materialRef.current) {
    const CardMaterial = createCarouselCardMaterial();
    const material = new CardMaterial() as unknown as CardMaterial;
    material.uRadius = curveRadius;
    material.side = THREE.DoubleSide;
    materialRef.current = material;
  }

  useEffect(() => {
    return () => {
      materialRef.current?.dispose();
    };
  }, []);

  useFrame(() => {
    const material = materialRef.current;
    if (!material) return;
    material.uFocus = THREE.MathUtils.lerp(material.uFocus, focus, 0.08);
    if (texture) material.uMap = texture;
  });

  if (!materialRef.current) return null;

  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0, 0, radius]} material={materialRef.current}>
        <planeGeometry args={[width, height, 24, 1]} />
      </mesh>
    </group>
  );
}
