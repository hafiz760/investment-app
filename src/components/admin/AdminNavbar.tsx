"use client";

import React from "react";
import {
  Bell,
  Search,
  Menu,
  Sun,
  User,
  LogOut,
  Settings,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/hooks/useAuth";

export function AdminNavbar({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}) {
  const logout = useLogout();

  return (
    <header className="h-16 border-b border-[#D4AF37]/20 bg-[#0F1C2E]/60 backdrop-blur-xl flex items-center justify-between px-4 lg:px-8 sticky top-0 z-50">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-white"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Breadcrumb - Demo */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-500">Admin</span>
          <ChevronRight className="h-3 w-3 text-gray-600" />
          <span className="text-white font-medium">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        {/* Search */}
        <div className="hidden md:flex items-center relative w-64 lg:w-80">
          <Search className="absolute left-3 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search records..."
            className="pl-10 bg-white/5 border-[#D4AF37]/10 h-10 text-sm text-white focus:border-[#D4AF37]/50 focus:ring-0"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[#D4AF37] relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border border-[#0F1C2E]" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <Sun className="h-5 w-5" />
          </Button>
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-2 hover:bg-white/5 h-10"
            >
              <div className="w-8 h-8 rounded-lg bg-[#D4AF37] flex items-center justify-center text-[#0F1C2E] font-bold">
                A
              </div>
              <div className="hidden lg:flex flex-col items-start min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  Administrator
                </span>
                <span className="text-[10px] text-[#D4AF37] font-medium leading-none">
                  Super Admin
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-56 bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-2xl"
          >
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="focus:bg-white/5 focus:text-[#D4AF37] cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-white/5 focus:text-[#D4AF37] cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem
              className="text-red-400 focus:text-red-500 focus:bg-red-500/5 cursor-pointer"
              onClick={() => logout()}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
