"use client";

import React from "react";
import Link from "next/link";
import { Search, Bell, User, CheckCircle2, Clock, XCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
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
import { Badge } from "@/components/ui/badge";

export function DashboardNavbar() {
  const { user } = useAppSelector((state) => state.auth);
  const userId = user?.id;
  const { data: userProfile, isLoading: isLoadingProfile } = useUserProfile(
    userId as string,
  );
  const logout = useLogout();

  const handleLogout = async () => {
    await logout();
  };

  // Get KYC status
  const getKycStatus = () => {
    if (!userProfile?.data) return null;

    const kycApproved = userProfile.data.kycApproved;
    const hasKycDocs =
      userProfile.data.profilePic || userProfile.data.cnic_front;

    if (kycApproved) {
      return {
        label: "Verified",
        icon: <CheckCircle2 className="w-3 h-3" />,
        className: "bg-green-500/10 text-green-500 border-green-500/20",
      };
    } else if (hasKycDocs) {
      return {
        label: "Pending",
        icon: <Clock className="w-3 h-3" />,
        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      };
    } else {
      return {
        label: "Not Verified",
        icon: <XCircle className="w-3 h-3" />,
        className: "bg-red-500/10 text-red-500 border-red-500/20",
      };
    }
  };

  const kycStatus = getKycStatus();

  return (
    <header className="border-b border-[#D4AF37]/20 bg-[#0F1C2E]/60 backdrop-blur-xl text-white h-16 flex items-center px-4 lg:px-6 sticky top-0 z-50">
      <div className="flex items-center gap-4 w-full justify-between">
        <Link href="/user/dashboard" className="flex items-center gap-2.5">
          <Logo className="ring-2 ring-[#D4AF37]/20" />
          <span className="text-lg font-bold tracking-tight text-[#0F1C2E] dark:text-white">
            InvestaX
          </span>
        </Link>
        {/* <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search a menu"
            className="pl-10 bg-white/5 border-[#D4AF37]/20 rounded-lg h-10 w-full text-white placeholder:text-gray-400 focus:border-[#D4AF37]/50"
          />
        </div> */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* KYC Status Badge */}
          {kycStatus && (
            <Badge
              variant="outline"
              className={`hidden lg:flex items-center gap-1.5 text-xs px-3 py-1.5 ${kycStatus.className}`}
            >
              {kycStatus.icon}
              {kycStatus.label}
            </Badge>
          )}

          <Button
            variant="ghost"
            size="icon"
            className="relative group hover:bg-white/5"
          >
            <Bell className="h-5 w-5 text-gray-400 group-hover:text-[#D4AF37]" />
            <span className="absolute top-2.5 right-2.5 h-2 w-2 bg-red-500 rounded-full border-2 border-card" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full bg-white/10 hover:bg-white/20 overflow-hidden outline-none ring-offset-[#0F1C2E] w-10 h-10 p-0"
              >
                {userProfile?.data?.profilePic ? (
                  <Image
                    src={userProfile.data.profilePic}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <User className="h-5 w-5 text-white" />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white w-64"
            >
              {/* User Info Section */}
              <DropdownMenuLabel className="font-normal">
                <div className="flex items-center gap-3 py-2">
                  <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden flex items-center justify-center">
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
                      {userProfile?.data?.username}
                    </p>
                    <p className="text-xs text-gray-400 truncate">
                      {userProfile?.data?.email}
                    </p>
                  </div>
                </div>
              </DropdownMenuLabel>

              {/* KYC Status for mobile */}
              {kycStatus && (
                <DropdownMenuLabel className="font-normal py-0 pb-2 lg:hidden">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400">KYC Status:</span>
                    <Badge
                      variant="outline"
                      className={`flex items-center gap-1 text-[10px] px-2 py-0.5 ${kycStatus.className}`}
                    >
                      {kycStatus.icon}
                      {kycStatus.label}
                    </Badge>
                  </div>
                </DropdownMenuLabel>
              )}

              <DropdownMenuSeparator className="bg-white/10" />

              {/* Menu Items */}
              <DropdownMenuItem asChild>
                <Link
                  href="/user/profile"
                  className="flex w-full items-center cursor-pointer focus:bg-white/5 focus:text-white"
                >
                  Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer focus:bg-white/5 focus:text-white">
                <Link
                  href="/user/settings"
                  className="flex w-full items-center cursor-pointer focus:bg-white/5 focus:text-white"
                >
                  Settings
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="bg-white/10" />

              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-400 hover:text-red-500 focus:text-red-500 cursor-pointer focus:bg-red-500/10"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
