import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/page-hero";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphics designing, vector conversion, embroidery digitizing, photo enhancing, and illustration — with sub-18-hour standard turnaround and 6-hour rush jobs.",
};

const timeline = [
  {
    title: "Graphics Designing",
    detail: "Concepts and layouts built for print, apparel, and brand systems.",
  },
  {
    title: "Vector Conversion",
    detail: "Raster art redrawn by hand into scalable AI, EPS, SVG, and CDR.",
  },
  {
    title: "Embroidery Digitizing",
    detail: "Logos and artwork turned into stitch-ready files for production.",
  },
  {
    title: "Illustrations",
    detail: "Custom line art and full-color illustrations for campaigns and catalogs.",
  },
  {
    title: "Virtual Mockups",
    detail: "Product and imprint previews so clients see the finish before press.",
  },
  {
    title: "Photo Enhancing",
    detail: "Cleanup, color, and detail work that keeps source photos production-usable.",
  },
  {
    title: "Template Placing",
    detail: "Artwork fitted precisely into die-lines, templates, and imprint areas.",
  },
  {
    title: "Advertising Art",
    detail: "Campaign-ready graphics for ads, packaging, and promotional formats.",
  },
  {
    title: "Image Editing",
    detail: "Retouching and edits that support the vector and digitizing pipeline.",
  },
];

const imprintMethods = [
  "Hot Stamping",
  "Laser Engraving",
  "Screen Printing",
  "Deboss",
  "Emboss",
  "Epoxy",
  "Transfer",
  "Label Pins",
];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Every stage of production art."
        lede="From a first raster scan to a factory-ready embroidery file — one pipeline, redrawn for the imprint method your job needs."
      />

      {/* Center timeline — no boxes / cards */}
      <section className="relative mx-auto max-w-4xl px-6 pb-24">
        {/* Vertical rule */}
        <div
          className="absolute top-0 bottom-0 left-6 w-px bg-primary/35 md:left-1/2 md:-translate-x-px"
          aria-hidden="true"
        />

        <ol className="relative space-y-14 md:space-y-20">
          {timeline.map((item, index) => {
            const onRight = index % 2 === 1;
            return (
              <li key={item.title} className="relative md:grid md:grid-cols-2 md:gap-16">
                {/* Node on the line */}
                <span
                  className="absolute top-2 left-6 z-10 size-2.5 -translate-x-1/2 rounded-full bg-primary md:left-1/2"
                  aria-hidden="true"
                />

                <div
                  className={cn(
                    "pl-10 md:pl-0",
                    onRight
                      ? "md:col-start-2 md:text-left"
                      : "md:col-start-1 md:text-right md:pr-4"
                  )}
                >
                  <p className="font-heading text-[0.65rem] tracking-[0.35em] text-primary uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-3 font-mango text-3xl leading-[1.1] text-foreground sm:text-4xl">
                    {item.title}
                  </h2>
                  <p
                    className={cn(
                      "mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground",
                      !onRight && "md:ml-auto"
                    )}
                  >
                    {item.detail}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Speed proof — quiet, not a card grid */}
      <section className="border-y border-border/60">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-10 px-6 py-16 text-center sm:flex-row sm:justify-center sm:gap-20">
          <div>
            <p className="font-mango text-5xl text-primary sm:text-6xl">18h</p>
            <p className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Standard turnaround
            </p>
          </div>
          <div className="hidden h-12 w-px bg-border/60 sm:block" aria-hidden="true" />
          <div>
            <p className="font-mango text-5xl text-primary sm:text-6xl">6h</p>
            <p className="mt-2 text-xs tracking-[0.25em] text-muted-foreground uppercase">
              Rush jobs
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <p className="font-heading text-xs tracking-[0.3em] text-primary uppercase">
          Imprint methods
        </p>
        <p className="mt-5 text-sm leading-relaxed text-muted-foreground sm:text-base">
          {imprintMethods.join(" · ")}
        </p>
        <p className="mt-8 text-sm text-muted-foreground">
          24-hour support · any volume · tools: Illustrator, CorelDraw, Photoshop, Wilcom
        </p>
        <div className="mt-10 flex justify-center">
          <Link href="/contact" className={buttonVariants({ size: "lg" })}>
            Start a project
          </Link>
        </div>
      </section>
    </div>
  );
}
