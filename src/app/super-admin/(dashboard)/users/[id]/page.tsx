"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Mail,
  Phone,
  Calendar,
  Loader2,
  BadgeCheck,
  Clock,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  User as UserIcon,
} from "lucide-react";
import { useUser, useUpdateKycStatus } from "@/lib/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function UserDetailsPage() {
  const { id } = useParams();
  const userId = typeof id === "string" ? id : null;
  const router = useRouter();

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

  if (isLoading) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-[#D4AF37]">
        <Loader2 className="h-10 w-10 animate-spin" />
        <p className="text-sm font-medium animate-pulse">Fetching user profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-[60vh] flex flex-col items-center justify-center gap-4 text-gray-500 italic">
        <p>User profile not found.</p>
        <Button 
          variant="outline" 
          onClick={() => router.push("/super-admin/users")}
          className="mt-4 border-[#D4AF37]/20 text-white"
        >
          Return to Users
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6 lg:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      {/* Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500 uppercase tracking-[0.2em] font-bold mb-2">
            <span className="hover:text-white cursor-pointer" onClick={() => router.push("/super-admin/users")}>Users</span>
            <span className="text-gray-700">/</span>
            <span className="text-[#D4AF37]">Details</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <UserIcon className="h-8 w-8 text-[#D4AF37]" />
            User Profile
          </h1>
        </div>
        <Button
          variant="outline"
          className="border-white/10 bg-white/5 hover:bg-white/10 text-white rounded-xl h-11 px-6 flex items-center gap-2 transition-all"
          onClick={() => router.push("/super-admin/users")}
        >
          <ChevronLeft className="h-4 w-4" />
          Back to List
        </Button>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        
        {/* Left Column: Profile Card & Authentication */}
        <div className="xl:col-span-1 space-y-6 lg:space-y-8">
          {/* Profile Card */}
          <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D4AF37]/10 to-transparent -z-10" />
            
            <div className="flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 border border-[#D4AF37]/30 flex items-center justify-center relative shadow-2xl overflow-hidden mb-6 transition-transform duration-500 group-hover:scale-105">
                {user.profilePic ? (
                  <img src={user.profilePic} alt={user.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="text-4xl font-bold text-[#D4AF37]">
                    {user.firstName[0]}{user.lastName[0]}
                  </div>
                )}
                <div className="absolute bottom-2 right-2">
                  {user.kycApproved ? (
                    <div className="bg-green-500 rounded-full p-2 border-4 border-[#0F1C2E] shadow-xl">
                      <BadgeCheck className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <div className="bg-yellow-500 rounded-full p-2 border-4 border-[#0F1C2E] shadow-xl">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-white tracking-tight truncate w-full">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-[#D4AF37] font-medium text-lg mt-1 tracking-wide">@{user.username}</p>
              
              <div className="flex items-center gap-2 mt-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em] bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  {user.userType}
                </span>
                <span className={cn(
                  "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.1em]",
                  user.kycApproved 
                    ? "bg-green-500/10 text-green-400 border border-green-500/20" 
                    : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                )}>
                  KYC: {user.kycApproved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                <div className="space-y-0.5">
                  <Label htmlFor="kyc-toggle" className="text-xs font-bold uppercase tracking-widest text-gray-400 cursor-pointer">
                    KYC Verification
                  </Label>
                  <p className="text-[10px] text-gray-500 italic">Toggle to approve or revoke status</p>
                </div>
                <div className="relative flex items-center gap-3">
                  <Switch
                    id="kyc-toggle"
                    checked={user.kycApproved}
                    onCheckedChange={handleToggleKyc}
                    disabled={updateKycMutation.isPending}
                    className="data-[state=checked]:bg-green-500 data-[state=unchecked]:bg-gray-700 h-6 w-11"
                  />
                  {updateKycMutation.isPending && (
                    <Loader2 className="h-4 w-4 animate-spin text-[#D4AF37]" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Account Meta */}
          <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-6">Account Metadata</h3>
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                  <Calendar className="h-3 w-3" /> Registration Data
                </div>
                <p className="text-sm font-semibold text-white">
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString(undefined, {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  }) : "N/A"}
                </p>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 text-gray-500 text-[10px] uppercase tracking-widest font-bold">
                  <ShieldCheck className="h-3 w-3" /> System Identifier
                </div>
                <p className="text-[10px] font-mono font-medium text-gray-400 break-all bg-white/5 p-3 rounded-xl border border-white/5">
                  {user.id}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Detailed Information & Documents */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          
          {/* Contact Details */}
          <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl">
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] mb-8 flex items-center gap-3">
              <span className="w-8 h-px bg-[#D4AF37]/30" />
              Contact Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
                <div className="flex items-center gap-3 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <Mail className="h-4 w-4 text-[#D4AF37]" /> Registered Email
                </div>
                <p className="text-xl font-bold text-white truncate">{user.email}</p>
              </div>
              
              <div className="space-y-2 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all group">
                <div className="flex items-center gap-3 text-gray-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                  <Phone className="h-4 w-4 text-[#D3AF37]" /> Phone Number
                </div>
                <p className="text-xl font-bold text-white">{user.phone || "Not Provided"}</p>
              </div>
            </div>
          </div>

          {/* KYC Documentation */}
          <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-[#D4AF37] flex items-center gap-3">
                <span className="w-8 h-px bg-[#D4AF37]/30" />
                Proof of Identity
              </h3>
              <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                Verification Documents
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* CNIC Front */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Front View</p>
                  {user.cnic_front && (
                    <a href={user.cnic_front} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#D4AF37] hover:underline font-bold uppercase tracking-widest">
                      Expand View
                    </a>
                  )}
                </div>
                <div className="aspect-[16/10] rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer shadow-2xl ring-1 ring-white/10">
                  {user.cnic_front ? (
                    <a href={user.cnic_front} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      <img 
                        src={user.cnic_front} 
                        alt="CNIC Front" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0F1C2E]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-2xl">
                          <ExternalLink className="h-6 w-6 text-[#0F1C2E]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Open Image</span>
                      </div>
                    </a>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-4 italic px-8 text-center bg-gradient-to-b from-white/5 to-transparent">
                      <ShieldCheck className="h-12 w-12 text-gray-700 opacity-20" />
                      <span className="text-xs font-medium tracking-wide">Identity document front view has not been uploaded yet.</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CNIC Back */}
              <div className="space-y-4">
                <div className="flex items-center justify-between px-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Back View</p>
                  {user.cnic_back && (
                    <a href={user.cnic_back} target="_blank" rel="noopener noreferrer" className="text-[10px] text-[#D4AF37] hover:underline font-bold uppercase tracking-widest">
                      Expand View
                    </a>
                  )}
                </div>
                <div className="aspect-[16/10] rounded-3xl bg-white/5 border border-white/10 overflow-hidden relative group cursor-pointer shadow-2xl ring-1 ring-white/10">
                  {user.cnic_back ? (
                    <a href={user.cnic_back} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                      <img 
                        src={user.cnic_back} 
                        alt="CNIC Back" 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#0F1C2E]/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#D4AF37] flex items-center justify-center shadow-2xl">
                          <ExternalLink className="h-6 w-6 text-[#0F1C2E]" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4AF37]">Open Image</span>
                      </div>
                    </a>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-600 gap-4 italic px-8 text-center bg-gradient-to-b from-white/5 to-transparent">
                      <ShieldCheck className="h-12 w-12 text-gray-700 opacity-20" />
                      <span className="text-xs font-medium tracking-wide">Identity document back view has not been uploaded yet.</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Verification Banner */}
          {user.kycApproved ? (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-green-500/10 to-emerald-500/5 border border-green-500/20 flex items-center justify-between shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 blur-[100px] -z-10 group-hover:bg-green-500/10 transition-colors" />
              <div className="flex items-center gap-6">
                <div className="bg-green-500/20 p-4 rounded-2xl text-green-400 font-bold text-xs uppercase tracking-[0.2em] shadow-inner">
                  Verified
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Trust Level Confirmed</p>
                  <p className="text-sm text-gray-500 mt-1 italic tracking-wide">This investor has successfully cleared all background and identity verification protocols.</p>
                </div>
              </div>
              <BadgeCheck className="h-12 w-12 text-green-500 opacity-80" />
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-orange-500/5 border border-yellow-500/20 flex items-center justify-between shadow-2xl">
              <div className="flex items-center gap-6">
                <div className="bg-yellow-500/20 p-4 rounded-2xl text-yellow-400 font-bold text-xs uppercase tracking-[0.2em] shadow-inner">
                  Pending
                </div>
                <div>
                  <p className="text-xl font-bold text-white">Verification Required</p>
                  <p className="text-sm text-gray-500 mt-1 italic tracking-wide">User identity documents are awaiting administrative review and approval.</p>
                </div>
              </div>
              <Clock className="h-12 w-12 text-yellow-500 opacity-80" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
