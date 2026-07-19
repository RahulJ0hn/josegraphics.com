"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { startTransition, useState, type MouseEvent } from "react";
import { Menu, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";

function isModifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return (
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey ||
    event.button !== 0
  );
}

const navLinkClass =
  "relative font-heading text-sm tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-primary sm:text-base " +
  "after:pointer-events-none after:absolute after:inset-x-0 after:-bottom-1 after:h-px after:bg-primary after:opacity-0 after:transition-opacity after:duration-150 " +
  "hover:after:opacity-100";

const navLinkActiveClass = "text-primary after:opacity-100";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function goTo(href: string, event: MouseEvent<HTMLAnchorElement>) {
    if (isModifiedClick(event)) return;
    event.preventDefault();
    // Yield to the browser so the click can paint before the route transition work.
    startTransition(() => {
      setOpen(false);
      router.push(href);
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/95">
      <div className="mx-auto flex h-32 max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="flex items-center gap-3"
          onClick={(event) => goTo("/", event)}
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
                prefetch
                onClick={(event) => goTo(item.href, event)}
                className={cn(navLinkClass, active && navLinkActiveClass)}
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
                    prefetch
                    onClick={(event) => goTo(item.href, event)}
                    className={cn(
                      "relative inline-block py-3 font-heading text-base tracking-[0.15em] uppercase text-foreground/80 transition-colors hover:text-primary",
                      "after:pointer-events-none after:absolute after:inset-x-0 after:bottom-2 after:h-px after:bg-primary after:opacity-0 after:transition-opacity after:duration-150",
                      active ? "text-primary after:opacity-100" : "hover:after:opacity-100"
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
