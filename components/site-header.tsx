"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-32 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt={siteConfig.name} className="h-24 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative font-heading text-sm tracking-[0.15em] uppercase transition-colors hover:text-primary sm:text-base",
                  "after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                  active
                    ? "text-primary after:scale-x-100"
                    : "text-foreground/80 after:scale-x-0 hover:after:scale-x-100"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border/60 bg-background md:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-6 py-4">
            {siteConfig.nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "relative inline-block py-3 font-heading text-base tracking-[0.15em] uppercase transition-colors hover:text-primary",
                      "after:absolute after:inset-x-0 after:bottom-2 after:h-px after:origin-left after:bg-primary after:transition-transform after:duration-300 after:ease-out",
                      active
                        ? "text-primary after:scale-x-100"
                        : "text-foreground/80 after:scale-x-0"
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
