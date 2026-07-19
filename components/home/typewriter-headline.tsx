"use client";

import { useEffect, useState } from "react";

const LINES = [
  "Every piece starts as a point.",
  "Your internal art studio.",
  "Your creative production hub.",
  "Hand-drawn. Production-ready.",
  "Vector art in under 18 hours.",
] as const;

const TYPE_MS = 55;
const DELETE_MS = 32;
const HOLD_MS = 2200;
const GAP_MS = 400;

export function TypewriterHeadline() {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState<string>(LINES[0]);
  const [deleting, setDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      const id = window.setInterval(() => {
        setIndex((i) => (i + 1) % LINES.length);
      }, 3500);
      return () => window.clearInterval(id);
    }

    const full = LINES[index];

    if (!deleting && text === full) {
      const id = window.setTimeout(() => setDeleting(true), HOLD_MS);
      return () => window.clearTimeout(id);
    }

    if (deleting && text === "") {
      const id = window.setTimeout(() => {
        setDeleting(false);
        setIndex((i) => (i + 1) % LINES.length);
      }, GAP_MS);
      return () => window.clearTimeout(id);
    }

    const id = window.setTimeout(
      () => {
        setText((prev) =>
          deleting ? prev.slice(0, -1) : full.slice(0, prev.length + 1)
        );
      },
      deleting ? DELETE_MS : TYPE_MS
    );

    return () => window.clearTimeout(id);
  }, [text, deleting, index, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) setText(LINES[index]);
  }, [index, reducedMotion]);

  return (
    <h1
      className="animate-in fade-in slide-in-from-bottom-4 mt-6 min-h-[2.4em] font-mango text-3xl leading-[1.1] text-foreground duration-700 sm:min-h-[2.1em] sm:text-6xl md:text-7xl"
      aria-live="polite"
    >
      <span>{reducedMotion ? LINES[index] : text}</span>
      {!reducedMotion && (
        <span
          className="ml-1 inline-block h-[0.85em] w-[0.08em] translate-y-[0.08em] bg-primary align-baseline animate-type-caret"
          aria-hidden="true"
        />
      )}
    </h1>
  );
}
