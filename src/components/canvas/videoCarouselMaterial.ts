import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import { carouselCardFragmentShader, carouselCardVertexShader } from "./shaders/videoCarousel";

export function createCarouselCardMaterial() {
  return shaderMaterial(
    {
      uRadius: 4,
      uMap: null as unknown as THREE.Texture,
      uFocus: 0,
    },
    carouselCardVertexShader,
    carouselCardFragmentShader,
  );
}
