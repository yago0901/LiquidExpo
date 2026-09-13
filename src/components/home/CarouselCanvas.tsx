"use client";

import { Canvas } from "@react-three/fiber";
import { VideoCarouselScene } from "@/components/canvas/VideoCarouselScene";
import type { VideoClip } from "@/content/types";

export function CarouselCanvas({
  clips,
  currentIndex,
}: {
  clips: VideoClip[];
  currentIndex: number;
}) {
  return (
    <Canvas
      camera={{ position: [0, 0, -2.2], rotation: [0, Math.PI, 0], fov: 58 }}
      dpr={[1, 2]}
      gl={{ antialias: true }}
    >
      <VideoCarouselScene clips={clips} currentIndex={currentIndex} />
    </Canvas>
  );
}
