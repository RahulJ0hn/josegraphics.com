import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { HorizontalGallery } from "@/components/portfolio/horizontal-gallery";
import { portfolioItems } from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Raster-to-vector conversions and embroidery digitizing case studies — logos, illustrations, and packaging redrawn by hand.",
};

export default function PortfolioPage() {
  return (
    <div>
      <PageHero
        eyebrow="Portfolio"
        title="Selected work, redrawn by hand."
        lede="Scroll or drag through a few pieces below — open any of them to see the raw source next to the finished vector art."
      />
      <HorizontalGallery items={portfolioItems} />
    </div>
  );
}
