"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "All Services", href: "/services" },
  { label: "Investment", href: "/investment" },
  { label: "Contact Us", href: "/contact" },
];

export function MainNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  console.log(isAuthenticated, "isAuth");

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    const [path, hash] = href.split("#");

    const normalizedTarget =
      path === ""
        ? pathname
        : (path.startsWith("/") ? path : `/${path}`).replace(/\/$/, "");
    const normalizedCurrent = pathname.replace(/\/$/, "");

    const isSamePage = normalizedTarget === normalizedCurrent;

    if (isSamePage && hash) {
      e.preventDefault();
      const element = document.getElementById(hash);

      // Close menus immediately
      if (mobileOpen) setMobileOpen(false);

      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
          window.history.pushState(null, "", href);
        }, 100);
      }
    } else {
      // Cross-page navigation or non-hash link
      if (mobileOpen) setMobileOpen(false);
    }
  };

  // Handle scrolling when arriving from another page with a hash
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        setTimeout(() => {
          const yOffset = -100;
          const y =
            element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }, 500); // Wait for page content to settle
      }
    }
  }, [pathname]);

  return (
    <header className="section-padding sticky top-0 z-40">
      <div className="container mx-auto pt-4">
        <div className="hidden lg:flex items-center justify-between rounded-full border border-[#D4AF37]/30 bg-[#0F1C2E]/60 backdrop-blur-xl px-6 py-3 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
          <Link
            href="/#hero"
            className="flex items-center gap-2.5"
            onClick={(e) => handleNavClick(e, "/#hero")}
          >
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
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {isAuthenticated ? (
            <Link href="/user/dashboard">
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#D4AF37] px-7 py-2 h-auto bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E] font-medium text-[15px]"
              >
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link href="/login">
              <Button
                variant="outline"
                className="rounded-full border-2 border-[#D4AF37] px-7 py-2 h-auto bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E] font-medium text-[15px]"
              >
                Invest Now
              </Button>
            </Link>
          )}
        </div>

        {/* MOBILE BAR */}
        <div className="flex lg:hidden items-center justify-between rounded-full border border-[#D4AF37]/30 bg-[#0F1C2E]/60 backdrop-blur-xl px-4 py-3">
          <Link
            href="/#hero"
            className="flex items-center gap-2"
            onClick={(e) => handleNavClick(e, "/#hero")}
          >
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
                onClick={(e) => {
                  handleNavClick(e, link.href);
                  setMobileOpen(false);
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link href="/login" onClick={() => setMobileOpen(false)}>
              <Button className="mt-2 w-full rounded-full bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E]">
                Invest Now
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
