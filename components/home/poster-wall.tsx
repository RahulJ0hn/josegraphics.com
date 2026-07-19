"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio";
import { cn } from "@/lib/utils";

const TILE_HEIGHT = 150;
// Cap how many pieces feed the wall so soft navigations to Home stay light.
const WALL_ITEMS = portfolioItems.slice(0, 8);

function buildRow(items: PortfolioItem[], rotateBy: number) {
  const rotated = [...items.slice(rotateBy), ...items.slice(0, rotateBy)];
  // doubled so the track can loop seamlessly at -50%
  return [...rotated, ...rotated];
}

const ROWS: {
  items: PortfolioItem[];
  reverse: boolean;
  duration: number;
  /** Extra rows only on small screens so the hero wall fills tall phone viewports. */
  mobileOnly?: boolean;
}[] = [
  { items: buildRow(WALL_ITEMS, 0), reverse: false, duration: 62 },
  { items: buildRow(WALL_ITEMS, 2), reverse: true, duration: 68, mobileOnly: true },
  { items: buildRow(WALL_ITEMS, 3), reverse: true, duration: 74 },
  { items: buildRow(WALL_ITEMS, 5), reverse: false, duration: 84 },
  { items: buildRow(WALL_ITEMS, 6), reverse: true, duration: 78, mobileOnly: true },
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
      <div className="flex h-full flex-col justify-evenly gap-2 py-2 opacity-45 sm:justify-center sm:gap-4 sm:py-0">
        {ROWS.map((row, i) => (
          <div
            key={i}
            className={cn(
              "flex w-max shrink-0 gap-2 sm:gap-4",
              row.reverse ? "animate-wall-scroll-reverse" : "animate-wall-scroll",
              row.mobileOnly && "sm:hidden"
            )}
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
                className="h-[88px] w-auto shrink-0 rounded-md object-cover sm:h-[150px]"
              />
            ))}
          </div>
        ))}
      </div>
      <div className="wall-fade absolute inset-0" />
    </div>
  );
}
