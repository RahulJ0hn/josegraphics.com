"use client";

import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import Image from "next/image";
import { DitherMaterial } from "@/components/portfolio/dither-material";

extend({ DitherMaterial });

declare module "@react-three/fiber" {
  interface ThreeElements {
    ditherMaterial: Partial<InstanceType<typeof DitherMaterial>> & {
      ref?: React.Ref<InstanceType<typeof DitherMaterial>>;
    };
  }
}

const TRANSITION_MS = 1400;

type Stage = { key: string; label: string; src: string };

// "object-fit: contain" for a texture sampled inside a differently-shaped
// plane: the full texture stays visible, letterboxed on the shorter axis,
// instead of being cropped to fill (which is what "cover" math would do).
// This matters here because before/wireframe/vector images for the same
// piece are each cropped independently and rarely share an identical aspect
// ratio, even though the plane itself is sized to just the vector's ratio.
function containScaleOffset(textureAspect: number, planeAspect: number) {
  if (textureAspect > planeAspect) {
    const scaleY = textureAspect / planeAspect;
    return {
      scale: new THREE.Vector2(1, scaleY),
      offset: new THREE.Vector2(0, 0.5 - scaleY / 2),
    };
  }
  const scaleX = planeAspect / textureAspect;
  return {
    scale: new THREE.Vector2(scaleX, 1),
    offset: new THREE.Vector2(0.5 - scaleX / 2, 0),
  };
}

function useDisposableTexture(url: string | null) {
  const [texture, setTexture] = useState<THREE.Texture | null>(null);

  useEffect(() => {
    if (!url) {
      setTexture(null);
      return;
    }
    let cancelled = false;
    const loader = new THREE.TextureLoader();
    let loaded: THREE.Texture | null = null;

    loader.load(url, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      if (cancelled) {
        tex.dispose();
        return;
      }
      loaded = tex;
      setTexture(tex);
    });

    return () => {
      cancelled = true;
      loaded?.dispose();
    };
  }, [url]);

  return texture;
}

function ease(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function Scene({
  textures,
  planeAspect,
  transitionRef,
}: {
  textures: (THREE.Texture | null)[];
  planeAspect: number;
  transitionRef: React.MutableRefObject<{
    fromIdx: number;
    toIdx: number;
    startTime: number | null;
    active: boolean;
    onSettle: (idx: number) => void;
  }>;
}) {
  const materialRef = useRef<InstanceType<typeof DitherMaterial>>(null);
  const { viewport, invalidate } = useThree();

  const uvs = useMemo(
    () =>
      textures.map((tex) => {
        if (!tex) return { scale: new THREE.Vector2(1, 1), offset: new THREE.Vector2(0, 0) };
        const img = tex.image as { width: number; height: number };
        return containScaleOffset(img.width / img.height, planeAspect);
      }),
    [textures, planeAspect]
  );

  useEffect(() => {
    // Show the current stage immediately on mount/texture-load — otherwise
    // the shader's default (empty) textures render as solid black until the
    // first toggle click ever starts a transition.
    const material = materialRef.current;
    const initial = textures[transitionRef.current.fromIdx];
    if (material && initial) {
      material.uFrom = initial;
      material.uTo = initial;
      material.uFromScale = uvs[transitionRef.current.fromIdx].scale;
      material.uFromOffset = uvs[transitionRef.current.fromIdx].offset;
      material.uToScale = uvs[transitionRef.current.fromIdx].scale;
      material.uToOffset = uvs[transitionRef.current.fromIdx].offset;
      material.uProgress = 0;
    }
    invalidate();
  }, [textures, uvs, planeAspect, invalidate, transitionRef]);

  useFrame((state) => {
    const material = materialRef.current;
    const t = transitionRef.current;
    if (!material || !t.active) return;

    if (t.startTime === null) t.startTime = state.clock.elapsedTime * 1000;
    const elapsed = state.clock.elapsedTime * 1000 - t.startTime;
    const progress = Math.min(1, elapsed / TRANSITION_MS);

    const fromTex = textures[t.fromIdx];
    const toTex = textures[t.toIdx];
    if (fromTex) material.uFrom = fromTex;
    if (toTex) material.uTo = toTex;
    material.uFromScale = uvs[t.fromIdx].scale;
    material.uFromOffset = uvs[t.fromIdx].offset;
    material.uToScale = uvs[t.toIdx].scale;
    material.uToOffset = uvs[t.toIdx].offset;
    material.uProgress = ease(progress);

    invalidate();

    if (progress >= 1) {
      t.active = false;
      t.startTime = null;
      t.onSettle(t.toIdx);
    }
  });

  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <ditherMaterial ref={materialRef} toneMapped={false} />
    </mesh>
  );
}

export function DitherReveal({
  before,
  wireframe,
  after,
  alt,
  ratio,
}: {
  before: string | null;
  wireframe: string | null;
  after: string;
  alt: string;
  ratio: number;
}) {
  const stages: Stage[] = [
    before && { key: "original", label: "Original", src: before },
    wireframe && { key: "wireframe", label: "Wireframe", src: wireframe },
    { key: "vector", label: "Vector Art", src: after },
  ].filter((s): s is Stage => Boolean(s));

  const tex0 = useDisposableTexture(stages[0]?.src ?? null);
  const tex1 = useDisposableTexture(stages[1]?.src ?? null);
  const tex2 = useDisposableTexture(stages[2]?.src ?? null);
  const textures = [tex0, tex1, tex2];

  const [displayIndex, setDisplayIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const transitionRef = useRef({
    fromIdx: 0,
    toIdx: 0,
    startTime: null as number | null,
    active: false,
    onSettle: (idx: number) => {
      activeIndexRef.current = idx;
    },
  });

  const goTo = (idx: number) => {
    if (idx >= stages.length) return;
    // If a transition is already in flight, treat wherever it was headed as
    // the starting point — otherwise a quick second click would snap back
    // to the last fully-settled stage instead of interrupting cleanly.
    const t = transitionRef.current;
    const currentIdx = t.active ? t.toIdx : activeIndexRef.current;
    if (idx === currentIdx) return;
    transitionRef.current = {
      fromIdx: currentIdx,
      toIdx: idx,
      startTime: null,
      active: true,
      onSettle: (settledIdx) => {
        activeIndexRef.current = settledIdx;
      },
    };
    setDisplayIndex(idx);
  };

  const allLoaded = stages.every((_, i) => textures[i] !== null);
  const singleImage = stages.length <= 1;

  return (
    <div>
      <div style={{ perspective: "700px" }}>
        <div
          style={{ aspectRatio: ratio, transform: "rotateY(-28deg) rotateX(4deg)" }}
          className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-card shadow-2xl"
        >
          {singleImage ? (
            <Image src={after} alt={alt} fill sizes="700px" className="object-contain p-6" />
          ) : allLoaded ? (
            <Canvas
              frameloop="demand"
              gl={{ antialias: true }}
              dpr={[1, 2]}
              resize={{ offsetSize: true }}
            >
              <Scene textures={textures} planeAspect={ratio} transitionRef={transitionRef} />
            </Canvas>
          ) : null}
        </div>
      </div>

      {!singleImage && (
        <div className="mt-5 flex justify-center gap-2">
          {stages.map((stage, i) => (
            <button
              key={stage.key}
              type="button"
              onClick={() => goTo(i)}
              className={`rounded-full border px-4 py-2 text-xs tracking-wide uppercase transition-colors ${
                displayIndex === i
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border/60 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {stage.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
