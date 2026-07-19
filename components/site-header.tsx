"use client";

import Link from "next/link";
import { useLinkStatus } from "next/link";
import { usePathname } from "next/navigation";
import { startTransition, useState } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative font-heading text-sm tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-primary active:text-primary sm:text-base " +
  "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-primary after:opacity-0 after:transition-opacity after:duration-150 " +
  "hover:after:opacity-100 active:after:opacity-100";

function NavLinkLabel({ label }: { label: string }) {
  const { pending } = useLinkStatus();
  return <span className={cn(pending && "text-primary")}>{label}</span>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6 sm:h-28 md:h-32">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={() => startTransition(() => setOpen(false))}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.svg"
            alt={siteConfig.name}
            className="h-14 w-auto sm:h-20 md:h-24"
          />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const active =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(navLinkClass, active && "text-primary after:opacity-100")}
              >
                <NavLinkLabel label={item.label} />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          className="text-foreground md:hidden"
          onClick={() => startTransition(() => setOpen((v) => !v))}
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
                    onClick={() => startTransition(() => setOpen(false))}
                    className={cn(
                      "relative inline-block py-3 font-heading text-base tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-primary active:text-primary",
                      "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-primary after:opacity-0 after:transition-opacity after:duration-150",
                      "hover:after:opacity-100 active:after:opacity-100",
                      active && "text-primary after:opacity-100"
                    )}
                  >
                    <NavLinkLabel label={item.label} />
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
