"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import * as THREE from "three";
import { VideoCard } from "./VideoCard";
import type { VideoClip } from "@/content/types";

const RADIUS = 5.5;
const CURVE_RADIUS = 14;
const CENTER_WIDTH = 6.6;
const CENTER_HEIGHT = 4.5;
const SIDE_WIDTH = 2.6;
const SIDE_HEIGHT = 1.8;
const ANGLE_STEP = Math.PI / 3.6;

export function VideoCarouselScene({
  clips,
  currentIndex,
}: {
  clips: VideoClip[];
  currentIndex: number;
}) {
  const spinGroupRef = useRef<THREE.Group>(null);
  const spinValueRef = useRef(0);
  const prevPropIndexRef = useRef(currentIndex);
  const [displayIndex, setDisplayIndex] = useState(currentIndex);
  const count = clips.length;

  useEffect(() => {
    if (currentIndex === prevPropIndexRef.current) return;
    const group = spinGroupRef.current;
    const forward = (currentIndex - prevPropIndexRef.current + count) % count === 1;
    prevPropIndexRef.current = currentIndex;

    if (!group) {
      setDisplayIndex(currentIndex);
      return;
    }

    const targetRotation = forward ? -ANGLE_STEP : ANGLE_STEP;
    gsap.to(spinValueRef, {
      current: targetRotation,
      duration: 0.7,
      ease: "power3.inOut",
      onUpdate: () => {
        group.rotation.y = spinValueRef.current;
      },
      onComplete: () => {
        spinValueRef.current = 0;
        group.rotation.y = 0;
        setDisplayIndex(currentIndex);
      },
    });
  }, [currentIndex, count]);

  const prevIndex = (displayIndex - 1 + count) % count;
  const nextIndex = (displayIndex + 1) % count;

  return (
    <group ref={spinGroupRef}>
      <VideoCard
        key={`prev-${clips[prevIndex].id}`}
        slug={clips[prevIndex].slug}
        title={clips[prevIndex].title}
        seed={prevIndex + 1}
        angle={-ANGLE_STEP}
        radius={RADIUS}
        curveRadius={CURVE_RADIUS}
        width={SIDE_WIDTH}
        height={SIDE_HEIGHT}
        focus={0.15}
      />
      <VideoCard
        key={`current-${clips[displayIndex].id}`}
        slug={clips[displayIndex].slug}
        title={clips[displayIndex].title}
        seed={displayIndex + 1}
        angle={0}
        radius={RADIUS}
        curveRadius={CURVE_RADIUS}
        width={CENTER_WIDTH}
        height={CENTER_HEIGHT}
        focus={1}
      />
      <VideoCard
        key={`next-${clips[nextIndex].id}`}
        slug={clips[nextIndex].slug}
        title={clips[nextIndex].title}
        seed={nextIndex + 1}
        angle={ANGLE_STEP}
        radius={RADIUS}
        curveRadius={CURVE_RADIUS}
        width={SIDE_WIDTH}
        height={SIDE_HEIGHT}
        focus={0.15}
      />
    </group>
  );
}
