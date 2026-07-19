import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

// Dither "pixel wave" transition: a diagonal wavefront sweeps across the
// image as uProgress goes 0 -> 1, gated by an ordered (Bayer) dither
// threshold so the boundary reads as a spreading grid of pixels forming,
// rather than a plain soft wipe.
const fragmentShader = /* glsl */ `
  uniform sampler2D uFrom;
  uniform sampler2D uTo;
  uniform float uProgress;
  uniform vec2 uFromScale;
  uniform vec2 uFromOffset;
  uniform vec2 uToScale;
  uniform vec2 uToOffset;
  uniform vec3 uBgColor;
  varying vec2 vUv;

  const mat4 BAYER = mat4(
     0.0,  8.0,  2.0, 10.0,
    12.0,  4.0, 14.0,  6.0,
     3.0, 11.0,  1.0,  9.0,
    15.0,  7.0, 13.0,  5.0
  ) / 16.0;

  float bayerValue(vec2 fragCoord) {
    ivec2 p = ivec2(mod(fragCoord, 4.0));
    return BAYER[p.x][p.y];
  }

  // Samples as "object-fit: contain" — uv landing outside the texture's own
  // [0,1] range (the letterboxed margin) falls back to a flat background
  // color instead of a stretched/clamped edge pixel.
  vec3 sampleContained(sampler2D tex, vec2 uv) {
    if (uv.x < 0.0 || uv.x > 1.0 || uv.y < 0.0 || uv.y > 1.0) {
      return uBgColor;
    }
    return texture2D(tex, uv).rgb;
  }

  void main() {
    vec2 fromUv = vUv * uFromScale + uFromOffset;
    vec2 toUv = vUv * uToScale + uToOffset;

    vec3 fromColor = sampleContained(uFrom, fromUv);
    vec3 toColor = sampleContained(uTo, toUv);

    float waveCoord = (vUv.x + (1.0 - vUv.y)) * 0.5;
    float edge = 0.08;
    float reveal = 1.0 - smoothstep(uProgress - edge, uProgress + edge, waveCoord);
    // offset so no cell's threshold sits exactly at 0, which would otherwise
    // always pass step() and leak a persistent dot grid at zero reveal
    float threshold = bayerValue(gl_FragCoord.xy) + (1.0 / 32.0);
    float mask = step(threshold, reveal);

    vec3 color = mix(fromColor, toColor, mask);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export const DitherMaterial = shaderMaterial(
  {
    uFrom: new THREE.Texture(),
    uTo: new THREE.Texture(),
    uProgress: 0,
    uFromScale: new THREE.Vector2(1, 1),
    uFromOffset: new THREE.Vector2(0, 0),
    uToScale: new THREE.Vector2(1, 1),
    uToOffset: new THREE.Vector2(0, 0),
    uBgColor: new THREE.Color("#f7f4ec"),
  },
  vertexShader,
  fragmentShader
);
