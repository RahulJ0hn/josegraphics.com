import Image from "next/image";
import { portfolioItems, type PortfolioItem } from "@/lib/portfolio";

const TILE_HEIGHT = 150;

function buildRow(items: PortfolioItem[], rotateBy: number) {
  const rotated = [...items.slice(rotateBy), ...items.slice(0, rotateBy)];
  // doubled so the track can loop seamlessly at -50%
  return [...rotated, ...rotated];
}

const ROWS: { items: PortfolioItem[]; reverse: boolean; duration: number }[] = [
  { items: buildRow(portfolioItems, 0), reverse: false, duration: 62 },
  { items: buildRow(portfolioItems, 4), reverse: true, duration: 74 },
  { items: buildRow(portfolioItems, 7), reverse: false, duration: 84 },
];

export function PosterWall() {
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
