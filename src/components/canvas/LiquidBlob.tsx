"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { createBlobMaterial } from "./blobMaterial";

type BlobUniforms = {
  uTime: number;
  uTouchPoint: THREE.Vector3;
  uTouchStrength: number;
};

/* eslint-disable react-hooks/refs */
export function LiquidBlob({ tier }: { tier: "a" | "b" }) {
  const { viewport, camera, pointer } = useThree();

  const meshRef = useRef<THREE.Mesh>(null);
  const geometryRef = useRef<THREE.IcosahedronGeometry | null>(null);
  const materialRef = useRef<(THREE.ShaderMaterial & BlobUniforms) | null>(null);
  const tierRef = useRef<"a" | "b" | null>(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const rotationTargetRef = useRef(new THREE.Vector2());
  const touchStrengthRef = useRef(0);

  if (tierRef.current !== tier) {
    geometryRef.current?.dispose();
    materialRef.current?.dispose();

    const detail = tier === "a" ? 5 : 3;
    geometryRef.current = new THREE.IcosahedronGeometry(1, detail);

    const BlobMaterial = createBlobMaterial();
    const material = new BlobMaterial() as unknown as THREE.ShaderMaterial & BlobUniforms;
    material.transparent = true;
    material.side = THREE.DoubleSide;
    materialRef.current = material;

    tierRef.current = tier;
  }

  useEffect(() => {
    return () => {
      geometryRef.current?.dispose();
      materialRef.current?.dispose();
    };
  }, []);

  const radius = Math.min(viewport.height * 0.15, viewport.width * 0.11);
  const xOffset = viewport.width * 0.24;

  useFrame((state, delta) => {
    const mesh = meshRef.current;
    const material = materialRef.current;
    if (!mesh || !material) return;

    material.uTime = state.clock.elapsedTime;

    rotationTargetRef.current.set(pointer.x * 0.35, -pointer.y * 0.25);
    mesh.rotation.y += delta * 0.15 + (rotationTargetRef.current.x - mesh.rotation.y) * 0.04;
    mesh.rotation.x += (rotationTargetRef.current.y - mesh.rotation.x) * 0.04;

    if (tier === "a") {
      raycasterRef.current.setFromCamera(pointer, camera);
      const hit = raycasterRef.current.intersectObject(mesh, false)[0];
      if (hit) {
        const localPoint = mesh.worldToLocal(hit.point.clone());
        material.uTouchPoint.copy(localPoint);
        touchStrengthRef.current = THREE.MathUtils.lerp(touchStrengthRef.current, 1, 0.15);
      } else {
        touchStrengthRef.current = THREE.MathUtils.lerp(touchStrengthRef.current, 0, 0.08);
      }
      material.uTouchStrength = touchStrengthRef.current;
    } else {
      material.uTouchStrength = 0;
    }
  });

  if (!geometryRef.current || !materialRef.current) return null;

  return (
    <mesh
      ref={meshRef}
      position={[xOffset, 0, 1.4]}
      scale={radius}
      geometry={geometryRef.current}
      material={materialRef.current}
    />
  );
}
