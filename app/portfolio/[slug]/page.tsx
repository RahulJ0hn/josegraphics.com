import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WorkDetail } from "@/components/portfolio/work-detail";
import { getPortfolioItem, portfolioItems } from "@/lib/portfolio";

export function generateStaticParams() {
  return portfolioItems.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) return {};

  return {
    title: item.title,
    description: item.description,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <WorkDetail item={item} />
    </div>
  );
}
