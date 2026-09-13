"use client";

import { useEffect, useState } from "react";
import * as THREE from "three";

function createPlaceholderTexture(title: string, seed: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");

  if (ctx) {
    const hue = (seed * 47) % 360;
    const gradient = ctx.createLinearGradient(0, 0, 512, 512);
    gradient.addColorStop(0, `hsl(${hue}, 12%, 14%)`);
    gradient.addColorStop(1, `hsl(${hue}, 12%, 5%)`);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 512, 512);

    ctx.fillStyle = "#f5f5f0";
    ctx.font = "bold 42px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const words = title.toUpperCase().split(" ");
    let line = "";
    const lines: string[] = [];
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > 420 && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    if (line) lines.push(line);

    const lineHeight = 52;
    const startY = 256 - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((l, i) => ctx.fillText(l, 256, startY + i * lineHeight, 440));
  }

  return new THREE.CanvasTexture(canvas);
}

export function useClipTexture(slug: string, title: string, seed: number): THREE.Texture | null {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    const placeholder = createPlaceholderTexture(title, seed);
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTexture(placeholder);

    const video = document.createElement("video");
    video.src = `/videos/${slug}.mp4`;
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";

    let videoTexture: THREE.VideoTexture | null = null;

    function onLoaded() {
      video.play().catch(() => {});
      videoTexture = new THREE.VideoTexture(video);
      setTexture(videoTexture);
    }

    video.addEventListener("loadeddata", onLoaded);
    video.load();

    return () => {
      video.removeEventListener("loadeddata", onLoaded);
      video.pause();
      video.removeAttribute("src");
      video.load();
      placeholder.dispose();
      videoTexture?.dispose();
    };
  }, [slug, title, seed]);

  return texture;
}
