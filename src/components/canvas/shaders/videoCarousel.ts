export const carouselCardVertexShader = /* glsl */ `
  precision highp float;

  uniform float uRadius;

  varying vec2 vUv;

  void main() {
    vUv = uv;

    vec3 pos = position;
    float angle = pos.x / uRadius;
    vec3 curved = vec3(sin(angle) * uRadius, pos.y, cos(angle) * uRadius - uRadius);

    gl_Position = projectionMatrix * modelViewMatrix * vec4(curved, 1.0);
  }
`;

export const carouselCardFragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uMap;
  uniform float uFocus;

  varying vec2 vUv;

  void main() {
    vec2 uv = vec2(1.0 - vUv.x, vUv.y);
    vec3 color = texture2D(uMap, uv).rgb;

    float gray = dot(color, vec3(0.299, 0.587, 0.114));
    color = mix(vec3(gray) * 0.6, color, uFocus);
    color *= mix(0.45, 1.0, uFocus);

    float vignette = smoothstep(0.75, 0.0, length(vUv - 0.5));
    color *= mix(0.85, 1.0, vignette);

    gl_FragColor = vec4(color, 1.0);
  }
`;
