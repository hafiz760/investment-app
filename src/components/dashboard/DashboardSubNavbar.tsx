"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Wallet,
  ShoppingBag,
  Heart,
  ArrowDownCircle,
  ArrowUpCircle,
  Grid2X2,
  ChevronDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const links = [
  { label: "Dashboard", href: "/user/dashboard", icon: LayoutDashboard },
  {
    label: "Investment",
    href: "/user/investment",
    icon: Wallet,
    dropdown: [
      { label: "Plan", href: "/user/investment/plan" },
      { label: "History", href: "/user/investment/history" },
    ],
  },
  { label: "Orders", href: "/user/orders", icon: ShoppingBag },
  { label: "Wishlist", href: "/user/wishlist", icon: Heart },
  {
    label: "Deposit",
    href: "/user/deposit",
    icon: ArrowDownCircle,
    dropdown: [
      { label: "Deposit Money", href: "/user/deposit" },
      { label: "Deposit History", href: "/user/deposit/history" },
    ],
  },
  {
    label: "Withdraw",
    href: "/user/withdraw",
    icon: ArrowUpCircle,
    dropdown: [
      { label: "Withdraw Money", href: "/user/withdraw" },
      { label: "Withdraw History", href: "/user/withdraw/history" },
    ],
  },
  {
    label: "More",
    href: "/user/more",
    icon: Grid2X2,
    dropdown: [
      { label: "Transactions", href: "/user/transactions" },
      { label: "Support Ticket", href: "/user/support" },
      { label: "Two Factor", href: "/user/profile/2fa" },
      { label: "Notification", href: "/user/profile/notifications" },
    ],
  },
];

export function DashboardSubNavbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-[#0F1C2E]/40 border-b border-[#D4AF37]/20 overflow-x-auto backdrop-blur-md sticky top-16 z-40">
      <div className="container-custom flex items-center h-12 lg:h-14 gap-6 no-scrollbar">
        {links.map((link) => {
          const Icon = link.icon;
          const isActive = pathname.startsWith(link.href);

          if (link.dropdown) {
            return (
              <DropdownMenu key={link.label}>
                <DropdownMenuTrigger asChild>
                  <button
                    className={cn(
                      "flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 border-transparent h-full px-1 outline-none",
                      isActive
                        ? "text-[#D4AF37] border-[#D4AF37]"
                        : "text-gray-300 hover:text-[#D4AF37]"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                    <ChevronDown className="h-3 w-3" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="w-48 bg-[#0F1C2E] border-[#D4AF37]/20 text-white"
                >
                  {link.dropdown.map((subItem) => (
                    <DropdownMenuItem
                      key={subItem.label}
                      asChild
                      className="focus:bg-[#D4AF37]/10 focus:text-[#D4AF37]"
                    >
                      <Link href={subItem.href}>{subItem.label}</Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={cn(
                "flex items-center gap-2 text-sm font-medium whitespace-nowrap transition-colors border-b-2 border-transparent h-full px-1",
                isActive
                  ? "text-[#D4AF37] border-[#D4AF37]"
                  : "text-gray-300 hover:text-[#D4AF37]"
              )}
            >
              <Icon className="h-4 w-4" />
              {link.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
