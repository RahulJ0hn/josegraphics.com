"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function ModalShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className="fixed inset-0 z-[60] overflow-y-auto bg-background/90 backdrop-blur-sm">
      <div className="flex min-h-full items-start justify-center px-4 py-10 sm:items-center sm:px-8 sm:py-12">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="fixed top-5 right-5 z-10 text-foreground/70 transition-colors hover:text-foreground"
        >
          <X size={28} />
        </button>
        <div
          className="w-full max-w-5xl overflow-visible rounded-xl border border-border/60 bg-background p-6 shadow-2xl sm:p-10"
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
