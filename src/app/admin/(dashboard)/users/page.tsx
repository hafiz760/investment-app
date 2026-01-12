"use client";

import React from "react";
import { Plus, MoreVertical, Edit2, ShieldAlert, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AdminDataTable } from "@/components/admin/AdminDataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useUsers } from "@/lib/hooks/useAuth";
import { User } from "@/lib/types/auth";
import { useRouter } from "next/navigation";

const columns: ColumnDef<User>[] = [
  {
    accessorKey: "firstName",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-white">
          {row.original.firstName} {row.original.lastName}
        </span>
        <span className="text-xs text-gray-500">@{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "userType",
    header: "Role",
    cell: ({ row }) => (
      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
        {row.original.userType}
      </span>
    ),
  },
  {
    accessorKey: "kycApproved",
    header: "KYC Status",
    cell: ({ row }) => {
      const isApproved = row.original.kycApproved;
      return (
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
            isApproved
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
          )}
        >
          {isApproved ? "Approved" : "Pending"}
        </span>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Join Date",
    cell: ({ row }) =>
      row.original.createdAt
        ? new Date(row.original.createdAt).toLocaleDateString()
        : "N/A",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div onClick={(e) => e.stopPropagation()}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-400 hover:text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-xl"
          >
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
              <Edit2 className="h-3.5 w-3.5" /> Edit Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
              <ShieldAlert className="h-3.5 w-3.5" /> Verification
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-red-500/10 text-red-400 focus:text-red-500">
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ),
  },
];

export default function AdminUsersPage() {
  const { data: response, isLoading } = useUsers();
  const users = response?.data || [];

  const router = useRouter();

  const handleRowClick = (user: User) => {
    router.push(`/admin/users/${user.id}`);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            User Management
          </h1>
          <p className="text-gray-400 mt-1">
            Manage and monitor all platform users.
          </p>
        </div>
        <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold rounded-xl h-11 px-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
          <Plus className="h-5 w-5 mr-2" />
          Add New User
        </Button>
      </div>

      <AdminDataTable
        columns={columns}
        data={users}
        isLoading={isLoading}
        onRowClick={handleRowClick}
        searchPlaceholder="Search users by name or email..."
      />
    </div>
  );
}
