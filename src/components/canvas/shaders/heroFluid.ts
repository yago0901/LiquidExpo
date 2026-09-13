export const fluidVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export function createFluidFragmentShader(octaves: number) {
  return /* glsl */ `
    precision highp float;

    varying vec2 vUv;

    uniform float uTime;
    uniform vec2 uResolution;
    uniform vec2 uMouse;
    uniform float uMouseStrength;
    uniform float uDissolve;

    vec3 permute(vec3 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                          -0.577350269189626, 0.024390243902439);
      vec2 i = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x = a0.x * x0.x + h.x * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float fbm(vec2 p) {
      float total = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for (int i = 0; i < ${octaves}; i++) {
        total += snoise(p * frequency) * amplitude;
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return total;
    }

    vec3 palette(float t) {
      vec3 voidColor = vec3(0.02, 0.016, 0.04);
      vec3 violet = vec3(0.35, 0.19, 0.72);
      vec3 cyan = vec3(0.14, 0.6, 0.85);
      vec3 gold = vec3(0.72, 0.52, 0.14);

      vec3 color = mix(voidColor, violet, smoothstep(0.0, 0.5, t));
      color = mix(color, gold, smoothstep(0.45, 0.78, t));
      color = mix(color, cyan, smoothstep(0.88, 1.0, t));
      return color;
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspectUv = (uv - 0.5) * vec2(uResolution.x / max(uResolution.y, 1.0), 1.0) + 0.5;

      float fallSpeed = 0.045;
      vec2 flow = aspectUv * 2.4;
      flow.y += uTime * fallSpeed * 6.0;

      vec2 warpA = vec2(
        fbm(flow + uTime * 0.02),
        fbm(flow + vec2(5.2, 1.3) - uTime * 0.015)
      );
      vec2 warped = flow + warpA * 0.6;

      vec2 toMouse = aspectUv - uMouse;
      float mouseDist = length(toMouse);
      float ripple = sin(mouseDist * 18.0 - uTime * 3.0) * exp(-mouseDist * 4.0) * uMouseStrength;
      warped += normalize(toMouse + 0.0001) * ripple * 0.4;

      float n = fbm(warped + warpA * 0.5) * 0.5 + 0.5;

      float shift = 0.006 + length(aspectUv - 0.5) * 0.01;
      float nR = fbm(warped + warpA * 0.5 + vec2(shift, 0.0)) * 0.5 + 0.5;
      float nB = fbm(warped + warpA * 0.5 - vec2(shift, 0.0)) * 0.5 + 0.5;

      vec3 color = palette(n);
      color.r = palette(nR).r;
      color.b = palette(nB).b;

      color = mix(color, vec3(0.02, 0.016, 0.04), uDissolve);

      float vignette = smoothstep(1.05, 0.35, length(uv - 0.5));
      color *= mix(0.55, 1.0, vignette);

      gl_FragColor = vec4(color, 1.0);
    }
  `;
}
