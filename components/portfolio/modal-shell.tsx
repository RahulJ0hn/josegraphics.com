"use client";

import { useRouter } from "next/navigation";
import { X } from "lucide-react";
import type { ReactNode } from "react";

export function ModalShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const close = () => router.back();

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto bg-background/90 p-4 backdrop-blur-sm sm:p-8">
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute top-5 right-5 z-10 text-foreground/70 transition-colors hover:text-foreground"
      >
        <X size={28} />
      </button>
      <div
        className="w-full max-w-5xl rounded-xl border border-border/60 bg-background p-6 shadow-2xl sm:p-10"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
