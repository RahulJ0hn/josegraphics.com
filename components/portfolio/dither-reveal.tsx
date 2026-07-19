"use client";

import { Canvas, extend, invalidate, useFrame, useThree } from "@react-three/fiber";
import {
  memo,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

type TransitionState = {
  fromIdx: number;
  toIdx: number;
  startTime: number | null;
  active: boolean;
  onSettle: (idx: number) => void;
};

// object-fit: contain — full texture visible, letterboxed on the shorter axis.
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
  transitionRef: React.MutableRefObject<TransitionState>;
}) {
  const materialRef = useRef<InstanceType<typeof DitherMaterial>>(null);
  const { viewport, invalidate: invalidateFrame } = useThree();

  const uvs = useMemo(
    () =>
      textures.map((tex) => {
        if (!tex) {
          return { scale: new THREE.Vector2(1, 1), offset: new THREE.Vector2(0, 0) };
        }
        const img = tex.image as { width: number; height: number };
        return containScaleOffset(img.width / img.height, planeAspect);
      }),
    [textures, planeAspect]
  );

  useEffect(() => {
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
    invalidateFrame();
  }, [textures, uvs, planeAspect, invalidateFrame, transitionRef]);

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

    invalidateFrame();

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

const DitherCanvas = memo(function DitherCanvas({
  textures,
  ratio,
  transitionRef,
}: {
  textures: (THREE.Texture | null)[];
  ratio: number;
  transitionRef: React.MutableRefObject<TransitionState>;
}) {
  return (
    <Canvas
      frameloop="demand"
      gl={{ antialias: false, powerPreference: "high-performance", alpha: false }}
      dpr={1}
      resize={{ offsetSize: true }}
    >
      <color attach="background" args={["#f7f4ec"]} />
      <Scene textures={textures} planeAspect={ratio} transitionRef={transitionRef} />
    </Canvas>
  );
});

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
  const textures = useMemo(() => [tex0, tex1, tex2], [tex0, tex1, tex2]);

  const [displayIndex, setDisplayIndex] = useState(0);
  // Size the frame to the active stage so it fills the border (no spare
  // letterbox from sizing to a wider sibling image).
  const planeAspect = useMemo(() => {
    const tex = textures[displayIndex];
    if (tex?.image) {
      const img = tex.image as { width: number; height: number };
      if (img.width && img.height) return img.width / img.height;
    }
    return ratio;
  }, [textures, displayIndex, ratio]);

  const activeIndexRef = useRef(0);
  const transitionRef = useRef<TransitionState>({
    fromIdx: 0,
    toIdx: 0,
    startTime: null,
    active: false,
    onSettle: (idx: number) => {
      activeIndexRef.current = idx;
    },
  });

  const goTo = (idx: number) => {
    if (idx >= stages.length) return;
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
    invalidate();
    startTransition(() => setDisplayIndex(idx));
  };

  const allLoaded = stages.every((_, i) => textures[i] !== null);
  const singleImage = stages.length <= 1;

  return (
    <div className="w-full">
      {/* Flat frame — no 3D tilt. The old rotateY + overflow:hidden was clipping
          the car/building edges and covering the stage buttons below. */}
      <div
        className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border/60 bg-[#f7f4ec] shadow-2xl"
        style={{ aspectRatio: planeAspect }}
      >
        {singleImage ? (
          <Image
            src={after}
            alt={alt}
            fill
            sizes="700px"
            className="object-contain"
          />
        ) : allLoaded ? (
          <DitherCanvas
            textures={textures}
            ratio={planeAspect}
            transitionRef={transitionRef}
          />
        ) : (
          <div className="absolute inset-0 animate-pulse bg-[#f7f4ec]" />
        )}
      </div>

      {!singleImage && (
        <div className="relative z-10 mt-5 mb-1 flex flex-wrap justify-center gap-2 pb-1">
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
