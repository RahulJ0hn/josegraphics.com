"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PortfolioItem } from "@/lib/portfolio";

function lerp(start: number, end: number, ease: number) {
  return start + (end - start) * ease;
}

const AUTO_SCROLL_SPEED = 60;
const RESUME_DELAY = 1800;
const LOOP_COPIES = 3;
/** Max height of the artwork well; width follows each item's native ratio. */
const IMAGE_MAX_HEIGHT = 260;

function frameSize(ratio: number) {
  const height = IMAGE_MAX_HEIGHT;
  const width = Math.round(height * ratio);
  return { width, height };
}

export function HorizontalGallery({ items }: { items: PortfolioItem[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const loopItems = Array.from({ length: LOOP_COPIES }, () => items).flat();

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    const scroll = { current: 0, target: 0 };
    let setWidth = 0;
    let rafId = 0;
    let lastFrameTime = 0;
    let lastInteraction = 0;
    let hovering = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTarget = 0;
    let touchDragging = false;

    const recalcSetWidth = () => {
      setWidth = track.scrollWidth / LOOP_COPIES;
    };

    const wrap = () => {
      while (scroll.target >= setWidth) {
        scroll.target -= setWidth;
        scroll.current -= setWidth;
      }
      while (scroll.target < 0) {
        scroll.target += setWidth;
        scroll.current += setWidth;
      }
    };

    const onWheel = (event: WheelEvent) => {
      event.preventDefault();
      lastInteraction = performance.now();
      scroll.target += event.deltaY;
      wrap();
    };

    const onTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
      touchStartTarget = scroll.target;
      touchDragging = false;
    };

    const onTouchMove = (event: TouchEvent) => {
      const dx = touchStartX - event.touches[0].clientX;
      const dy = touchStartY - event.touches[0].clientY;

      if (!touchDragging) {
        if (Math.abs(dx) <= Math.abs(dy)) return;
        touchDragging = true;
      }

      event.preventDefault();
      lastInteraction = performance.now();
      scroll.target = touchStartTarget + dx;
      wrap();
    };

    const onMouseEnter = () => {
      hovering = true;
    };
    const onMouseLeave = () => {
      hovering = false;
    };

    const render = (time: number) => {
      const dt = lastFrameTime ? time - lastFrameTime : 0;
      lastFrameTime = time;

      const idle = time - lastInteraction > RESUME_DELAY;
      if (idle && !hovering && dt > 0) {
        scroll.target += (AUTO_SCROLL_SPEED * dt) / 1000;
        wrap();
      }

      scroll.current = lerp(scroll.current, scroll.target, 0.08);
      track.style.transform = `translate3d(${-scroll.current}px, 0, 0)`;
      rafId = requestAnimationFrame(render);
    };

    recalcSetWidth();
    rafId = requestAnimationFrame(render);

    container.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("mouseenter", onMouseEnter);
    container.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("resize", recalcSetWidth);

    return () => {
      cancelAnimationFrame(rafId);
      container.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("mouseenter", onMouseEnter);
      container.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", recalcSetWidth);
    };
  }, [items]);

  return (
    <div ref={containerRef} className="relative h-[420px] overflow-hidden">
      <div ref={trackRef} className="flex h-full w-max items-center gap-6 px-[8vw] will-change-transform">
        {loopItems.map((item, i) => {
          const { width, height } = frameSize(item.ratio);
          return (
            <Link
              key={`${item.slug}-${i}`}
              href={`/portfolio/${item.slug}`}
              className="group block shrink-0"
              style={{ width }}
            >
              <div className="rounded-xl border border-border/60 bg-card shadow-xl transition-colors duration-300 group-hover:border-primary/40">
                <div
                  className="relative overflow-hidden rounded-t-xl bg-[#f7f4ec]"
                  style={{ width, height, aspectRatio: `${item.ratio}` }}
                >
                  {/* Same recropped file as the detail popup — frame matches its ratio. */}
                  <Image
                    src={item.after}
                    alt={item.title}
                    fill
                    sizes={`${width}px`}
                    className="object-contain"
                  />
                </div>

                <div className="px-4 py-3">
                  <p className="text-xs tracking-[0.2em] text-primary uppercase">
                    {item.category}
                  </p>
                  <div className="mt-1 flex items-end justify-between gap-3">
                    <h3 className="font-heading text-lg leading-tight text-foreground">
                      {item.title}
                    </h3>
                    <span className="flex shrink-0 items-center gap-1 text-xs tracking-wide text-foreground/50 uppercase transition-colors group-hover:text-foreground/80">
                      View
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
