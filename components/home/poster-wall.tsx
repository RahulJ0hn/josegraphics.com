"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio";

const TILE_HEIGHT = 150;
// Cap how many pieces feed the wall so soft navigations to Home stay light.
const WALL_ITEMS = portfolioItems.slice(0, 8);

function buildRow(items: PortfolioItem[], rotateBy: number) {
  const rotated = [...items.slice(rotateBy), ...items.slice(0, rotateBy)];
  // doubled so the track can loop seamlessly at -50%
  return [...rotated, ...rotated];
}

const ROWS: { items: PortfolioItem[]; reverse: boolean; duration: number }[] = [
  { items: buildRow(WALL_ITEMS, 0), reverse: false, duration: 62 },
  { items: buildRow(WALL_ITEMS, 3), reverse: true, duration: 74 },
  { items: buildRow(WALL_ITEMS, 5), reverse: false, duration: 84 },
];

export function PosterWall() {
  // Mount after first paint so clicking "Home" can paint the hero immediately
  // instead of waiting on dozens of background images (major INP cost).
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Two animation frames ≈ after the browser has painted the hero text.
    let outer = 0;
    let inner = 0;
    outer = requestAnimationFrame(() => {
      inner = requestAnimationFrame(() => setMounted(true));
    });
    return () => {
      cancelAnimationFrame(outer);
      cancelAnimationFrame(inner);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="flex h-full flex-col justify-center gap-3 opacity-45 sm:gap-4">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={`flex w-max shrink-0 gap-3 sm:gap-4 ${
              row.reverse ? "animate-wall-scroll-reverse" : "animate-wall-scroll"
            }`}
            style={{ animationDuration: `${row.duration}s` }}
          >
            {row.items.map((item, j) => (
              <Image
                key={`${item.slug}-${j}`}
                src={item.after}
                alt=""
                height={TILE_HEIGHT}
                width={Math.round(TILE_HEIGHT * item.ratio)}
                sizes="200px"
                quality={60}
                loading="lazy"
                className="h-[110px] w-auto shrink-0 rounded-md object-cover sm:h-[150px]"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="wall-fade absolute inset-0" />
    </div>
  );
}
