import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Graphics designing, vector conversion, embroidery digitizing, photo enhancing, and illustration — with sub-18-hour standard turnaround and 6-hour rush jobs.",
};

const services = [
  "Graphics Designing",
  "Advertising",
  "Re-creating Artwork into Scalable Formats",
  "Template Placing",
  "Virtual Mockups",
  "Photo Enhancing",
  "Image Editing",
  "Illustrations",
  "Digitizing Logos & Artwork for Embroidery",
];

const offers = [
  "24-hour service & support",
  "Any volume of artwork handled",
  "Discounts available for high volume",
  "Standard turnaround under 18 hours",
  "Rush jobs undertaken within 6 hours",
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

const tools = ["Adobe Illustrator", "CorelDraw", "Photoshop", "Wilcom"];

export default function ServicesPage() {
  return (
    <div>
      <PageHero
        eyebrow="Services"
        title="Every stage of production art, covered."
        lede="From a first raster scan to a factory-ready embroidery file, our team handles the full pipeline — re-created for whichever imprint method your job needs."
      />

      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border/60 bg-border/60 sm:grid-cols-3">
          {services.map((service) => (
            <div key={service} className="bg-card px-6 py-8">
              <p className="font-heading text-base leading-snug">{service}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-xs tracking-[0.2em] text-primary uppercase">
              We Offer
            </h2>
            <ul className="mt-5 space-y-3">
              {offers.map((offer) => (
                <li
                  key={offer}
                  className="border-b border-border/60 pb-3 text-sm text-muted-foreground last:border-0"
                >
                  {offer}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-heading text-xs tracking-[0.2em] text-primary uppercase">
              Imprint Methods We Re-create For
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {imprintMethods.map((method) => (
                <span
                  key={method}
                  className="rounded-full border border-border/60 px-3 py-1 text-xs text-muted-foreground"
                >
                  {method}
                </span>
              ))}
            </div>

            <h2 className="mt-10 font-heading text-xs tracking-[0.2em] text-primary uppercase">
              Specialized In
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {tools.map((tool) => (
                <span
                  key={tool}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
