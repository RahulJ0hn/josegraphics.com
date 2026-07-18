import { notFound } from "next/navigation";
import { ModalShell } from "@/components/portfolio/modal-shell";
import { WorkDetail } from "@/components/portfolio/work-detail";
import { getPortfolioItem } from "@/lib/portfolio";

export default async function PortfolioDetailModal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = getPortfolioItem(slug);
  if (!item) notFound();

  return (
    <ModalShell>
      <WorkDetail item={item} />
    </ModalShell>
  );
}
