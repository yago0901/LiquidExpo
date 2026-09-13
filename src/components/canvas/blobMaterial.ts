import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { blobFragmentShader, blobVertexShader } from "./shaders/liquidBlob";

export function createBlobMaterial() {
  return shaderMaterial(
    {
      uTime: 0,
      uTouchPoint: new THREE.Vector3(),
      uTouchStrength: 0,
    },
    blobVertexShader,
    blobFragmentShader,
  );
}
