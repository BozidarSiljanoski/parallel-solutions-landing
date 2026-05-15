"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navLinks, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
      data-testid="site-header"
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight"
          data-testid="site-logo"
        >
          <span className="text-teal-600 dark:text-teal-400">Parallel</span>{" "}
          Solutions
        </Link>

        <nav
          className="hidden items-center gap-6 md:flex"
          aria-label="Main navigation"
          data-testid="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden bg-teal-600 text-white hover:bg-teal-500 sm:inline-flex"
            render={
              <a
                href={siteConfig.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="header-book-call"
              />
            }
          >
            <Calendar data-icon="inline-start" />
            Book a call
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button
                  variant="outline"
                  size="icon"
                  className="md:hidden"
                  aria-label="Open menu"
                  data-testid="mobile-menu-trigger"
                />
              }
            >
              <Menu />
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <nav
                className="mt-6 flex flex-col gap-4"
                data-testid="mobile-nav"
              >
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-base font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  className="mt-4 bg-teal-600 text-white hover:bg-teal-500"
                  render={
                    <a
                      href={siteConfig.calendlyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="mobile-book-call"
                    />
                  }
                >
                  <Calendar data-icon="inline-start" />
                  Book a call
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
