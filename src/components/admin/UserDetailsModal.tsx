"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUser, useUpdateKycStatus } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";
import {
  Mail,
  Phone,
  Calendar,
  Loader2,
  BadgeCheck,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { Switch } from "../ui/switch";
import { Label } from "../ui/label";

interface UserDetailsModalProps {
  userId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UserDetailsModal({
  userId,
  isOpen,
  onClose,
}: UserDetailsModalProps) {
  const { data: response, isLoading } = useUser(userId || "");
  const user = response?.data;

  const updateKycMutation = useUpdateKycStatus();

  const handleToggleKyc = (checked: boolean) => {
    if (!userId) return;
    updateKycMutation.mutate({
      id: userId,
      data: { kycApproved: checked },
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-2xl overflow-hidden p-0 rounded-3xl">
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-r from-[#D4AF37]/20 to-[#4169E1]/20 pb-0" />
        
        <DialogHeader className="p-8 pb-0 relative z-10">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="p-8 pt-4 relative z-10">
          {isLoading ? (
            <div className="h-64 flex flex-col items-center justify-center gap-4 text-[#D4AF37]">
              <Loader2 className="h-10 w-10 animate-spin" />
              <p className="text-sm font-medium animate-pulse">Fetching user details...</p>
            </div>
          ) : user ? (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex items-center gap-6">
                <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center relative shadow-xl overflow-hidden">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt={user.firstName} className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-3xl font-bold text-[#D4AF37]">
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                  )}
                  <div className="absolute bottom-1 right-1">
                    {user.kycApproved ? (
                      <div className="bg-green-500 rounded-full p-1 border-2 border-[#0F1C2E]">
                        <BadgeCheck className="h-3 w-3 text-white" />
                      </div>
                    ) : (
                      <div className="bg-yellow-500 rounded-full p-1 border-2 border-[#0F1C2E]">
                        <Clock className="h-3 w-3 text-white" />
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-bold text-white tracking-tight">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-[#D4AF37] font-medium">@{user.username}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {user.userType}
                    </span>
                    <span className={cn(
                      "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      user.kycApproved 
                        ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                        : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                    )}>
                      KYC: {user.kycApproved ? "Approved" : "Pending"}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-3">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
                      <Label htmlFor="kyc-toggle" className="text-[10px] font-bold uppercase tracking-widest text-gray-400 cursor-pointer">
                        KYC Status
                      </Label>
                      <div className="relative flex items-center">
                        <Switch
                          id="kyc-toggle"
                          checked={user.kycApproved}
                          onCheckedChange={handleToggleKyc}
                          disabled={updateKycMutation.isPending}
                        />
                        {updateKycMutation.isPending && (
                          <Loader2 className="h-3 w-3 animate-spin absolute -right-5 text-[#D4AF37]" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Mail className="h-3.5 w-3.5" /> Email Address
                  </div>
                  <p className="text-sm font-semibold text-white truncate">{user.email}</p>
                </div>
                <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Phone className="h-3.5 w-3.5" /> Phone Number
                  </div>
                  <p className="text-sm font-semibold text-white">{user.phone || "N/A"}</p>
                </div>
                <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <Calendar className="h-3.5 w-3.5" /> Join Date
                  </div>
                  <p className="text-sm font-semibold text-white">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    }) : "N/A"}
                  </p>
                </div>
                <div className="space-y-1 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                    <ShieldCheck className="h-3.5 w-3.5" /> Account ID
                  </div>
                  <p className="text-[10px] font-mono font-medium text-gray-400">{user.id}</p>
                </div>
              </div>

              {/* KYC Documents Preview (Placeholder) */}
              {user.kycApproved && (
                <div className="p-4 rounded-2xl bg-green-500/5 border border-green-500/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-green-500/20 p-2 rounded-xl text-green-400 font-bold text-xs uppercase tracking-tighter shadow-inner">KYC</div>
                    <div>
                      <p className="text-sm font-bold text-white leading-none">Verified Investor</p>
                      <p className="text-xs text-gray-500 mt-1 italic">All documentation approved</p>
                    </div>
                  </div>
                  <BadgeCheck className="h-6 w-6 text-green-400" />
                </div>
              )}
            </div>
          ) : (
            <div className="h-64 flex items-center justify-center text-gray-500 italic">
              Could not load user data.
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
