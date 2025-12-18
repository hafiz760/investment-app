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
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
];

const dropdowns = [
  {
    label: "Business Divisions",
    items: [
      { label: "All Services", href: "/services" },
      { label: "Coal Dealership", href: "/services#coal" },
      { label: "Cement Dealership", href: "/services#cement" },
      { label: "Bricks Supply", href: "/services#bricks" },
      { label: "Property Dealing", href: "/services#property" },
      { label: "Forex & IT", href: "/services#forex-it" },
    ],
  },
  {
    label: "Investment",
    items: [
      { label: "Investment Plans", href: "/investment" },
      { label: "Investment Overview", href: "/investment#investment-overview" },
      { label: "Pricing Plans", href: "/investment#plans" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "Our Team", href: "/team" },
      { label: "Testimonials", href: "/testimonials" },
      { label: "Blog & News", href: "/blog" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="section-padding sticky top-0 z-40">
      <div className="container mx-auto pt-4">
        {/* DESKTOP CAPSULE */}
        <div className="hidden lg:flex items-center justify-between rounded-full border border-[#D4AF37]/30 bg-[#0F1C2E]/60 backdrop-blur-xl px-6 py-3 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          {/* Logo */}
          <Link href="#home" className="flex items-center gap-2.5">
            <div className="flex items-center justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0F1C2E]">
              IX
            </div>
            <span className="text-base font-semibold tracking-tight text-white">
              InvestaX
            </span>
          </Link>

          {/* Center nav */}
          <nav className="flex items-center gap-8 text-[15px] font-medium">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white/90 hover:text-[#D4AF37] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {dropdowns.map((group) => (
              <DropdownMenu key={group.label}>
                <DropdownMenuTrigger className="inline-flex items-center gap-1.5 text-white/90 hover:text-[#D4AF37] transition-colors outline-none">
                  {group.label}
                  <ChevronDown className="h-3.5 w-3.5" />
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="center"
                  side="bottom"
                  className="mt-2 w-56 border-[#D4AF37]/20 bg-[#0F1C2E] text-white"
                >
                  {group.items.map((item) => (
                    <DropdownMenuItem
                      key={item.label}
                      asChild
                      className="cursor-pointer hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] focus:bg-[#D4AF37]/10 focus:text-[#D4AF37]"
                    >
                      <Link href={item.href}>{item.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            ))}

            <Link
              href="/contact"
              className="text-white/90 hover:text-[#D4AF37] transition-colors"
            >
              Contact Us
            </Link>
          </nav>

          {/* CTA */}
          <Button
            variant="outline"
            className="rounded-full border-2 border-[#D4AF37] px-7 py-2 h-auto bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E] font-medium text-[15px]"
          >
            Invest Now
          </Button>
        </div>

        {/* MOBILE BAR */}
        <div className="flex lg:hidden items-center justify-between rounded-full border border-[#D4AF37]/30 bg-[#0F1C2E]/60 backdrop-blur-xl px-4 py-3">
          <Link href="#home" className="flex items-center gap-2">
            <div className="flex items-center justify-center rounded-md bg-[#D4AF37] px-2.5 py-1 text-xs font-bold text-[#0F1C2E]">
              IX
            </div>
            <span className="text-sm font-semibold tracking-tight text-white">
              InvestaX
            </span>
          </Link>

          <button
            className="p-2 rounded border border-[#D4AF37]/30 text-white hover:bg-[#D4AF37]/10"
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

      {/* MOBILE PANEL */}
      {mobileOpen && (
        <div className="lg:hidden mt-2 mx-4 rounded-2xl border border-[#D4AF37]/30 bg-[#0F1C2E]/95 backdrop-blur-xl">
          <div className="px-4 py-3 flex flex-col gap-2 text-sm">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="py-2 text-white/90 hover:text-[#D4AF37] border-b border-[#D4AF37]/20 last:border-b-0"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {dropdowns.map((group) => (
              <details key={group.label} className="border-b border-[#D4AF37]/20">
                <summary className="py-2 cursor-pointer list-none flex items-center justify-between text-white/90 hover:text-[#D4AF37]">
                  <span>{group.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </summary>
                <div className="pl-3 pb-2 flex flex-col gap-1">
                  {group.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="py-1 text-white/70 hover:text-[#D4AF37]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </details>
            ))}

            <Link
              href="/contact"
              className="py-2 text-white/90 hover:text-[#D4AF37] border-b border-[#D4AF37]/20"
              onClick={() => setMobileOpen(false)}
            >
              Contact Us
            </Link>

            <Button className="mt-2 w-full rounded-full bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E]">
              Invest Now
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
