"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

const mainLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
];

const dropdowns = [
  {
    label: "Services",
    items: [
      { label: "Coal Dealership", href: "#coal" },
      { label: "Cement Dealership", href: "#cement" },
      { label: "Bricks Supply", href: "#bricks" },
      { label: "Property Dealing", href: "#property" },
      { label: "Forex & IT", href: "#forex-it" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "Investment Overview", href: "#overview" },
      { label: "Investment Plans", href: "#plans" },
      { label: "Team", href: "#team" },
      { label: "Testimonials", href: "#testimonials" },
      { label: "FAQs", href: "#faqs" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40">
      <div className="container mx-auto px-4 lg:px-8 py-4">
        {/* DESKTOP CAPSULE */}
        <div className="hidden lg:flex items-center justify-between rounded-[999px] border border-accent/60 bg-background/90 px-8 py-3 shadow-[0_0_0_1px_rgba(0,0,0,0.35)]">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-3">
            <div className="flex items-center justify-center rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground">
              IX
            </div>
            <span className="text-lg font-semibold tracking-tight text-foreground">
              InvestaX
            </span>
          </Link>

          {/* Center nav */}
          <nav className="flex items-center gap-10 text-sm">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-foreground/80 hover:text-accent transition-colors"
              >
                {link.label}
              </a>
            ))}

            {dropdowns.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger className="inline-flex items-center gap-1 text-foreground/80 hover:text-accent transition-colors outline-none">
                  {group.label}
                  <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  side="bottom"
                  className="mt-2 w-56 border-border bg-background"
                >
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      asChild
                      className="cursor-pointer hover:bg-accent/10 hover:text-accent"
                    >
                      <a href={item.href}>{item.label}</a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <a
              href="#contact"
              className="text-foreground/80 hover:text-accent transition-colors"
            >
              Contact Us
            </a>
          </nav>

          {/* CTA */}
          <Button
            variant="outline"
            className="rounded-full border border-accent px-8 py-2 h-auto bg-transparent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Get Started
          </Button>
        </div>

        {/* MOBILE BAR */}
        <div className="flex lg:hidden items-center justify-between">
          <Link href="#home" className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground">
              IX
            </div>
            <span className="text-base font-semibold tracking-tight text-foreground">
              InvestaX
            </span>
          </Link>

          <button
            className="p-2 rounded border border-border text-foreground"
            onClick={() => setMobileOpen((p) => !p)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* MOBILE PANEL (kept simple) */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="px-4 py-3 flex flex-col gap-2 text-sm">
            {mainLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="py-2 border-b border-border/60 last:border-b-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}

            {dropdowns.map((group) => (
              <details key={group.label} className="border-b border-border/60">
                <summary className="py-2 cursor-pointer list-none flex items-center justify-between">
                  <span>{group.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="pl-3 pb-2 flex flex-col gap-1">
                  {group.items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="py-1 text-muted-foreground hover:text-accent"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </details>
            ))}

            <a
              href="#contact"
              className="py-2 border-b border-border/60"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </a>

            <Button className="mt-2 w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              Get Started
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
