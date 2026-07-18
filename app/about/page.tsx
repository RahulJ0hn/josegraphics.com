import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "20 years redrawing raster artwork into scalable vector graphics and embroidery-ready digitized logos, for clients across North America, Europe, the Middle East, and Asia.",
};

const stats = [
  { value: `${new Date().getFullYear() - siteConfig.founded}+`, label: "Years in Business" },
  { value: "24 hr", label: "Support & Turnaround" },
  { value: "6 hr", label: "Rush Job Delivery" },
  { value: "8+", label: "Countries Served" },
];

export default function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="Your in-house art department, wherever you are."
        lede="Jose Graphics is a graphics design studio led by Jose Ajimon, covering every kind of graphics work — advertising, re-creating artwork into scalable formats, template placing, photo enhancing, illustration, and digitizing logos and artwork for embroidery."
      />

      <section className="mx-auto max-w-3xl px-6 pb-16">
        <div className="space-y-6 text-base leading-relaxed text-muted-foreground">
          <p>
            We are a vector conversion studio: we transform pixel-based images —
            JPG, TIFF, or PNG — into scalable, high-quality vector graphics —
            CDR, SVG, EPS, or AI. Every piece is manually redrawn by experts, not
            auto-traced, which is why the line work holds up at any size, from a
            business card to a billboard.
          </p>
          <p>
            Our graphic artists work around the clock to produce and deliver
            artwork on schedule for clients across the United States, Germany,
            the UAE, France, Russia, the United Kingdom, Japan, and China — so
            wherever your working day starts, ours has likely already begun.
          </p>
          <p>
            Hand off the conceptual development and technical layout work to
            us, and keep your team&apos;s focus entirely on creative direction
            and client strategy. Our rates are built for that relationship:
            reasonable, and scaled for volume.
          </p>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 px-6 py-16 sm:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl text-primary">
                {stat.value}
              </div>
              <div className="mt-2 text-xs tracking-wide text-muted-foreground uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
