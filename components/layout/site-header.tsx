"use client";

import Link from "next/link";
import { useState } from "react";
import { Calendar, Menu } from "lucide-react";

import { SiteLogo } from "@/components/layout/site-logo";
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
      className="sticky top-0 z-50 border-b border-border/80 bg-background/95 backdrop-blur-sm"
      data-testid="site-header"
    >
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between gap-6 px-4 md:h-20 md:px-6">
        <SiteLogo />

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Main navigation"
          data-testid="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors duration-200 hover:text-brand"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            className="hidden shadow-sm sm:inline-flex"
            render={
              <Link href={siteConfig.bookingSectionHref} data-testid="header-book-call" />
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
                <SheetTitle className="font-heading">Menu</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1" data-testid="mobile-nav">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted"
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  className="mt-6 shadow-sm"
                  render={
                    <Link
                      href={siteConfig.bookingSectionHref}
                      onClick={() => setOpen(false)}
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
