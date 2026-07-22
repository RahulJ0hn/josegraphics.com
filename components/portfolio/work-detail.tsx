import { DitherReveal } from "@/components/portfolio/dither-reveal";
import type { PortfolioItem } from "@/lib/portfolio";

export function WorkDetail({ item }: { item: PortfolioItem }) {
  return (
    <div className="grid items-center gap-10 md:grid-cols-[1fr_1.3fr]">
      <div className="text-left">
        <p className="text-xs tracking-[0.2em] text-primary uppercase">
          {item.category}
        </p>
        <h1 className="mt-3 font-heading text-3xl leading-tight sm:text-4xl">
          {item.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">{item.client}</p>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {item.description}
        </p>
      </div>

      <DitherReveal
        before={item.before}
        wireframe={item.wireframe}
        after={item.after}
        afterLabel={item.afterLabel}
        alt={item.title}
        ratio={item.ratio}
      />
    </div>
  );
}
