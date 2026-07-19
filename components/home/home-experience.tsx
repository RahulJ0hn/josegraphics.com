import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { PosterWall } from "@/components/home/poster-wall";
import { TypewriterHeadline } from "@/components/home/typewriter-headline";

export function HomeExperience() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border/60">
        <PosterWall />
        <div className="relative mx-auto max-w-3xl px-6 py-32 text-center sm:py-44">
          <p className="animate-in fade-in slide-in-from-bottom-2 font-heading text-xs tracking-[0.35em] text-primary uppercase duration-700 sm:text-sm">
            Vector Conversion &amp; Embroidery Digitizing
          </p>
          <TypewriterHeadline />
          <p className="animate-in fade-in slide-in-from-bottom-4 mt-6 text-base leading-relaxed text-muted-foreground delay-100 duration-700 sm:text-lg md:text-xl">
            20 years redrawing artwork by hand into vector art and
            embroidery-ready files, trusted by clients worldwide.
          </p>
          <div className="animate-in fade-in slide-in-from-bottom-4 mt-10 flex justify-center delay-150 duration-700">
            <Link href="/portfolio" className={buttonVariants({ size: "lg" })}>
              View our work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-border/60">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="font-heading text-xs tracking-[0.35em] text-primary uppercase sm:text-sm">
            How we work with you
          </p>
          <h2 className="mt-6 font-mango text-3xl leading-[1.15] text-foreground sm:text-5xl">
            We are ready to operate as your{" "}
            <span className="text-primary">internal art studio</span> and{" "}
            <span className="text-primary">creative graphic production hub</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Hand off conceptual development and technical layout work to us —
            keep your focus on creative direction and client strategy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-3">
          <Link href="/about" className="group rounded-lg border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40">
            <p className="text-xs tracking-[0.2em] text-primary uppercase">About</p>
            <h3 className="mt-3 font-heading text-xl">Your in-house art department</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              20 years redrawing artwork by hand for clients worldwide.
            </p>
          </Link>
          <Link href="/services" className="group rounded-lg border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40">
            <p className="text-xs tracking-[0.2em] text-primary uppercase">Services</p>
            <h3 className="mt-3 font-heading text-xl">Every stage of production art</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Vector conversion, embroidery digitizing, illustration, and more.
            </p>
          </Link>
          <Link href="/portfolio" className="group rounded-lg border border-border/60 bg-card/40 p-6 transition-colors hover:border-primary/40">
            <p className="text-xs tracking-[0.2em] text-primary uppercase">Portfolio</p>
            <h3 className="mt-3 font-heading text-xl">Selected work, redrawn by hand</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Open any piece to see the source photo next to the vector art.
            </p>
          </Link>
        </div>
      </section>

      <section className="border-t border-border/60 bg-card/40">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <h2 className="font-heading text-3xl sm:text-4xl">Have artwork to convert?</h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Send it over — we&apos;ll come back with a quote and a turnaround time,
            usually within 18 hours.
          </p>
          <div className="mt-8 flex justify-center">
            <Link href="/contact" className={buttonVariants({ size: "lg" })}>
              Start a project
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
