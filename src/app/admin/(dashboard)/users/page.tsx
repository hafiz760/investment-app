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

interface UserRecord {
  id: string;
  name: string;
  email: string;
  username: string;
  status: "Active" | "Pending" | "Suspended";
  joinDate: string;
}

const dummyUsers: UserRecord[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    username: "johndoe",
    status: "Active",
    joinDate: "2024-03-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    username: "janesmith",
    status: "Pending",
    joinDate: "2024-03-18",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    username: "mikej",
    status: "Active",
    joinDate: "2024-02-10",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    username: "sarahw",
    status: "Suspended",
    joinDate: "2024-01-22",
  },
  {
    id: "5",
    name: "Robert Brown",
    email: "robert@example.com",
    username: "robertb",
    status: "Active",
    joinDate: "2024-03-01",
  },
  {
    id: "6",
    name: "Emily Davis",
    email: "emily@example.com",
    username: "emilyd",
    status: "Active",
    joinDate: "2024-03-05",
  },
  {
    id: "7",
    name: "Chris Miller",
    email: "chris@example.com",
    username: "chrism",
    status: "Pending",
    joinDate: "2024-03-20",
  },
  {
    id: "8",
    name: "Anna Taylor",
    email: "anna@example.com",
    username: "annat",
    status: "Active",
    joinDate: "2024-02-28",
  },
];

const columns: ColumnDef<UserRecord>[] = [
  {
    accessorKey: "name",
    header: "Full Name",
    cell: ({ row }) => (
      <div className="flex flex-col">
        <span className="font-semibold text-white">{row.original.name}</span>
        <span className="text-xs text-gray-500">@{row.original.username}</span>
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email Address",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm",
            status === "Active"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : status === "Pending"
              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          )}
        >
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "joinDate",
    header: "Join Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
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
    ),
  },
];

export default function AdminUsersPage() {
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
        data={dummyUsers}
        searchPlaceholder="Search users by name or email..."
      />
    </div>
  );
}
