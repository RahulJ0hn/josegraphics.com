"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef } from "react";
import type { PortfolioItem } from "@/lib/portfolio";

function lerp(start: number, end: number, ease: number) {
  return start + (end - start) * ease;
}

const AUTO_SCROLL_SPEED = 60; // px/second — constant, default pace
const RESUME_DELAY = 1800; // ms of inactivity before auto-scroll resumes
const LOOP_COPIES = 3;

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
      // one copy's width = total track width / number of copies
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
        if (Math.abs(dx) <= Math.abs(dy)) return; // vertical intent: let the page scroll
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
        {loopItems.map((item, i) => (
          <Link
            key={`${item.slug}-${i}`}
            href={`/portfolio/${item.slug}`}
            className="group block h-[340px] w-[300px] shrink-0"
          >
            <div className="relative h-full w-full overflow-hidden rounded-xl border border-border/60 bg-card shadow-xl transition-colors duration-300 group-hover:border-primary/50">
              <Image
                src={item.after}
                alt={item.title}
                fill
                sizes="300px"
                className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="text-xs tracking-[0.2em] text-primary uppercase">
                  {item.category}
                </p>
                <div className="mt-1 flex items-end justify-between gap-3">
                  <h3 className="font-heading text-xl leading-tight text-foreground">
                    {item.title}
                  </h3>
                  <span className="flex shrink-0 translate-y-1 items-center gap-1 text-xs tracking-wide text-foreground/0 uppercase transition-all duration-300 group-hover:translate-y-0 group-hover:text-foreground/80">
                    View
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
