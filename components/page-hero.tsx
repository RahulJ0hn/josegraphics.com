export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-24 pb-16 text-center">
      <p className="font-heading text-xs tracking-[0.35em] text-primary uppercase">
        {eyebrow}
      </p>
      <h1 className="mt-5 font-heading text-4xl leading-tight sm:text-5xl">
        {title}
      </h1>
      {lede && (
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">
          {lede}
        </p>
      )}
    </div>
  );
}
