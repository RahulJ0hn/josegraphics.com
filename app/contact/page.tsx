import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { siteConfig, whatsappHref } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Jose Graphics — email, WhatsApp, or the form below. We reply within one business day.",
};

export default function ContactPage() {
  return (
    <div>
      <PageHero
        eyebrow="Contact Us"
        title="Tell us what you need drawn."
        lede="Send over the artwork and a note on format or imprint method — we'll come back with a quote and turnaround time."
      />

      <section className="mx-auto grid max-w-4xl gap-12 px-6 pb-24 md:grid-cols-[1.2fr_1fr]">
        <ContactForm />

        <div className="space-y-4">
          <a
            href={whatsappHref("Hi Jose Graphics, I'd like to discuss a project.")}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40"
          >
            <MessageCircle className="mt-0.5 shrink-0 text-primary" size={22} />
            <div>
              <p className="font-heading text-sm">WhatsApp</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.whatsappDisplay}
              </p>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-start gap-4 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40"
          >
            <Mail className="mt-0.5 shrink-0 text-primary" size={22} />
            <div>
              <p className="font-heading text-sm">Artwork & Quotes</p>
              <p className="mt-1 text-sm text-muted-foreground">{siteConfig.email}</p>
            </div>
          </a>

          <a
            href={`mailto:${siteConfig.secondaryEmail}`}
            className="flex items-start gap-4 rounded-lg border border-border/60 bg-card/40 p-5 transition-colors hover:border-primary/40"
          >
            <Mail className="mt-0.5 shrink-0 text-primary" size={22} />
            <div>
              <p className="font-heading text-sm">Jose Ajimon</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {siteConfig.secondaryEmail}
              </p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
