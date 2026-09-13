export const blobVertexShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform vec3 uTouchPoint;
  uniform float uTouchStrength;

  varying vec3 vNormal;
  varying vec3 vViewDir;

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

  float noise3(vec3 p) {
    return (snoise(p.xy) + snoise(p.yz) + snoise(p.zx)) / 3.0;
  }

  float fbm3(vec3 p) {
    float total = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    for (int i = 0; i < 2; i++) {
      total += noise3(p * frequency) * amplitude;
      frequency *= 2.0;
      amplitude *= 0.5;
    }
    return total;
  }

  // Bends the unit sphere into a teardrop: rounded at n.y = -1 (bottom),
  // pinching down to a thin point at n.y = +1 (top).
  vec3 teardropBase(vec3 n) {
    float pinch = smoothstep(-1.0, 1.0, n.y);
    vec3 p = n;
    p.xz *= mix(1.0, 0.16, pow(pinch, 2.2));
    p.y *= 1.55;
    return p;
  }

  vec3 shapePosition(vec3 n) {
    vec3 base = teardropBase(n);

    float wobble = fbm3(n * 1.15 + vec3(0.0, 0.0, uTime * 0.1));
    float touchDist = length(n - uTouchPoint);
    float touchBump = uTouchStrength * exp(-touchDist * touchDist * 2.0);
    float d = wobble * 0.07 + touchBump * 0.14;

    return base * (1.0 + d);
  }

  // Branchless orthonormal basis (Duff et al., "Building an Orthonormal
  // Basis, Revisited") — avoids the seam a naive up-vector switch creates
  // near the poles of the sphere.
  void buildBasis(vec3 n, out vec3 t, out vec3 b) {
    float s = n.z >= 0.0 ? 1.0 : -1.0;
    float a = -1.0 / (s + n.z);
    float bb = n.x * n.y * a;
    t = vec3(1.0 + s * n.x * n.x * a, s * bb, -s * n.x);
    b = vec3(bb, s + n.y * n.y * a, -n.y);
  }

  void main() {
    vec3 n = normalize(normal);
    vec3 displaced = shapePosition(n);

    vec3 tangent, bitangent;
    buildBasis(n, tangent, bitangent);

    float eps = 0.02;
    vec3 n1 = normalize(n + tangent * eps);
    vec3 n2 = normalize(n + bitangent * eps);
    vec3 p1 = shapePosition(n1);
    vec3 p2 = shapePosition(n2);

    vec3 recalculatedNormal = normalize(cross(p1 - displaced, p2 - displaced));

    vNormal = normalize(normalMatrix * recalculatedNormal);
    vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

export const blobFragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;

  varying vec3 vNormal;
  varying vec3 vViewDir;

  vec3 palette(float t) {
    vec3 violet = vec3(0.55, 0.36, 0.95);
    vec3 cyan = vec3(0.22, 0.74, 0.95);
    vec3 gold = vec3(0.95, 0.72, 0.32);
    vec3 rose = vec3(0.96, 0.45, 0.68);

    float a = fract(t);
    vec3 c1 = mix(violet, cyan, smoothstep(0.0, 0.33, a));
    vec3 c2 = mix(c1, gold, smoothstep(0.33, 0.66, a));
    vec3 c3 = mix(c2, rose, smoothstep(0.66, 0.9, a));
    return mix(c3, violet, smoothstep(0.9, 1.0, a));
  }

  void main() {
    vec3 n = normalize(vNormal);
    vec3 v = normalize(vViewDir);
    float fresnel = pow(1.0 - max(dot(v, n), 0.0), 2.2);

    float hue = fresnel * 1.3 + uTime * 0.05 + n.y * 0.3;
    vec3 color = palette(hue);

    float spec = pow(max(dot(reflect(-v, n), normalize(vec3(0.4, 0.6, 0.7))), 0.0), 26.0);
    color += vec3(1.0) * spec * 0.6;

    float alpha = clamp(mix(0.55, 0.98, fresnel), 0.0, 1.0);
    gl_FragColor = vec4(color, alpha);
  }
`;
