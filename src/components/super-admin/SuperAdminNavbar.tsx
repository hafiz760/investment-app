"use client";

import React from "react";
import { Bell, Menu, User, LogOut, Settings, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLogout } from "@/lib/hooks/useAuth";
import { useAppSelector } from "@/lib/store/hooks";
import { useUserProfile } from "@/lib/hooks/useProfile";
import Image from "next/image";
import Link from "next/link";

export function SuperAdminNavbar({
  setSidebarOpen,
  sidebarOpen,
}: {
  setSidebarOpen: (open: boolean) => void;
  sidebarOpen: boolean;
}) {
  const logout = useLogout();
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;

  // Fetch user profile
  const { data: userProfile } = useUserProfile(userId as string);

  // Get initials for avatar
  const getInitials = () => {
    const firstName = userProfile?.data?.firstName || "";
    const lastName = userProfile?.data?.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || "A";
  };

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

        {/* Breadcrumb */}
        <div className="hidden sm:flex items-center gap-2 text-sm">
          <span className="text-gray-500">Super Admin</span>
          <ChevronRight className="h-3 w-3 text-gray-600" />
          <span className="text-white font-medium">Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        {/* Notification Bell */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-[#D4AF37] relative"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-[#D4AF37] rounded-full border border-[#0F1C2E]" />
          </Button>
        </div>

        <div className="h-8 w-px bg-white/10 hidden sm:block" />

        {/* User Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center gap-3 px-2 hover:bg-white/5 h-10"
            >
              {/* Avatar */}
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-[#D4AF37] flex items-center justify-center text-[#0F1C2E] font-bold">
                {userProfile?.data?.profilePic ? (
                  <Image
                    src={userProfile.data.profilePic}
                    alt="Profile"
                    width={32}
                    height={32}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <span>{getInitials()}</span>
                )}
              </div>

              {/* User Info */}
              <div className="hidden lg:flex flex-col items-start min-w-0">
                <span className="text-sm font-semibold text-white truncate">
                  {userProfile?.data?.username}
                </span>
                <span className="text-[10px] text-[#D4AF37] font-medium leading-none">
                  {userProfile?.data?.roleName || "Super Admin"}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="w-64 bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-2xl"
          >
            {/* User Info Header */}
            <DropdownMenuLabel className="font-normal">
              <div className="flex items-center gap-3 py-2">
                <div className="w-12 h-12 rounded-lg bg-white/10 overflow-hidden flex items-center justify-center">
                  {userProfile?.data?.profilePic ? (
                    <Image
                      src={userProfile.data.profilePic}
                      alt="Profile"
                      width={48}
                      height={48}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <User className="h-6 w-6 text-white" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {userProfile?.data?.firstName} {userProfile?.data?.lastName}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    @{userProfile?.data?.email}
                  </p>
                  <p className="text-[10px] text-[#D4AF37] font-medium mt-1">
                    {userProfile?.data?.roleName || "Super Admin"}
                  </p>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem asChild>
              <Link
                href="/super-admin/settings"
                className="flex w-full items-center cursor-pointer focus:bg-white/5 focus:text-white"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </Link>
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
