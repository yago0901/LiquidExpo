import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { createFluidFragmentShader, fluidVertexShader } from "./shaders/heroFluid";

export function createFluidMaterial(octaves: number) {
  return shaderMaterial(
    {
      uTime: 0,
      uResolution: new THREE.Vector2(1, 1),
      uMouse: new THREE.Vector2(0.5, 0.5),
      uMouseStrength: 0,
      uDissolve: 0,
    },
    fluidVertexShader,
    createFluidFragmentShader(octaves),
  );
}
