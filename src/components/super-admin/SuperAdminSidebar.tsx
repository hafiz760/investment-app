"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  History,
  Settings,
  ChevronLeft,
  X,
  Menu,
  Shield,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/store/hooks";
import { Logo } from "@/components/common/Logo";

const superAdminLinks = [
  { label: "Dashboard", href: "/super-admin", icon: LayoutDashboard },
  { label: "Users", href: "/super-admin/users", icon: Users },
  { label: "Roles", href: "/super-admin/roles", icon: Shield },
  { label: "Investment Plans", href: "/super-admin/plans", icon: TrendingUp },
  { label: "Payment History", href: "/super-admin/payments", icon: History },
  { label: "Settings", href: "/super-admin/settings", icon: Settings },
];

export function SuperAdminSidebar({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      {/* Mobile Backdrop */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-60 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar Overlay for Mobile / Sticky for Desktop */}
      <aside
        className={cn(
          "fixed top-0 left-0 h-screen bg-[#0F1C2E] border-r border-[#D4AF37]/20 z-50 transition-all duration-300 ease-in-out lg:sticky",
          open
            ? "w-72 translate-x-0"
            : "w-0 -translate-x-full lg:w-20 lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* Logo Section */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-white/5">
            <Link href="/super-admin" className="flex items-center gap-2.5">
              <Logo 
                size={open ? "md" : "sm"} 
                className="shrink-0 ring-2 ring-[#D4AF37]/20 transition-all duration-300" 
              />
              <span
                className={cn(
                  "text-lg font-bold tracking-tight text-white transition-opacity duration-300",
                  !open && "lg:opacity-0 lg:hidden"
                )}
              >
                Super Admin
              </span>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gray-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="flex-1 py-6 px-3 space-y-1 overflow-y-auto no-scrollbar">
            {superAdminLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-4 px-3 py-3 rounded-xl transition-all group relative",
                    isActive
                      ? "bg-[#D4AF37]/10 text-[#D4AF37]"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "h-5 w-5 shrink-0 transition-colors",
                      isActive ? "text-[#D4AF37]" : "group-hover:text-[#D4AF37]"
                    )}
                  />
                  <span
                    className={cn(
                      "font-medium whitespace-nowrap transition-all duration-300",
                      !open && "lg:opacity-0 lg:hidden"
                    )}
                  >
                    {link.label}
                  </span>

                  {/* Tooltip for collapsed state */}
                  {!open && (
                    <div className="absolute left-full ml-6 px-2 py-1 bg-[#0F1C2E] border border-[#D4AF37]/20 text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible lg:block transition-all z-50">
                      {link.label}
                    </div>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer Info / Profiling */}
          <div className="p-4 border-t border-white/5">
            <div
              className={cn(
                "flex items-center gap-3 p-2 rounded-xl bg-white/5 transition-all",
                !open && "lg:justify-center"
              )}
            >
              <div className="w-8 h-8 rounded-full bg-[#D4AF37] flex items-center justify-center text-[#0F1C2E] font-bold text-xs shrink-0">
                SA
              </div>
              <div
                className={cn(
                  "flex flex-col min-w-0 transition-opacity",
                  !open && "lg:hidden"
                )}
              >
                <span className="text-sm font-semibold text-white truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[10px] text-gray-500 truncate text-uppercase tracking-wider">
                  {user?.roleName || "Super Admin"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
