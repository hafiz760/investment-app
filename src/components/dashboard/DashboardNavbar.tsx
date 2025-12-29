"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, User, Sun } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function DashboardNavbar() {
  return (
    <header className="border-b border-[#D4AF37]/20 bg-[#0F1C2E]/60 backdrop-blur-xl text-white h-16 flex items-center px-4 lg:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4 w-full justify-between">
        {/* Logo Section */}
        <Link href="/user/dashboard" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0F1C2E]">
            IX
          </div>
          <span className="text-lg font-bold tracking-tight text-[#0F1C2E] dark:text-white">
            InvestaX
          </span>
        </Link>

        {/* Search Bar - Responsive */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search a menu"
            className="pl-10 bg-white/5 border-[#D4AF37]/20 rounded-lg h-10 w-full text-white placeholder:text-gray-400 focus:border-[#D4AF37]/50"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 lg:gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="relative group hover:bg-white/5"
          >
            <Bell className="h-5 w-5 text-gray-400 group-hover:text-[#D4AF37]" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-card" />
          </Button>

          <Button variant="ghost" size="icon" className="hover:bg-white/5">
            <Sun className="h-5 w-5 text-gray-400" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 overflow-hidden outline-none ring-offset-[#0F1C2E]"
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white"
            >
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem className="text-destructive">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
