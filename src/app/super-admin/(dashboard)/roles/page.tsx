"use client";

import React, { useState } from "react";
import { Plus, MoreVertical, Edit2, Shield, Trash2, Check, X } from "lucide-react";
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
import { useRoles, useDeleteRole } from "@/lib/hooks/useRoles";
import { ApiRole, Permission } from "@/lib/types/auth";
import { RoleDialog } from "@/components/super-admin/RoleDialog";

export default function RolesPage() {
  const { data: roles, isLoading } = useRoles();
  const deleteRoleMutation = useDeleteRole();
  const [selectedRole, setSelectedRole] = useState<ApiRole | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (role: ApiRole) => {
    setSelectedRole(role);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedRole(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      await deleteRoleMutation.mutateAsync(id);
    }
  };

  const columns: ColumnDef<ApiRole>[] = [
    {
      accessorKey: "name",
      header: "Role Name",
      cell: ({ row }) => (
        <span className="font-semibold text-white">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "permissions",
      header: "Permissions Detail",
      cell: ({ row }) => (
        <div className="flex flex-wrap gap-x-3 gap-y-2">
          {["User", "Role", "Investment", "Payment", "Setting"].map((module) => {
            const p = row.original.permissions.find(perm => perm.moduleName === module);
            if (!p) return null;
            return (
              <div key={module} className="flex items-center gap-1.5 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase">{module}:</span>
                <div className="flex gap-0.5">
                  <span className={cn("text-[10px] w-3 h-3 flex items-center justify-center rounded", p.read ? "bg-green-500/20 text-green-400" : "text-gray-600/30 font-thin")}>R</span>
                  <span className={cn("text-[10px] w-3 h-3 flex items-center justify-center rounded", p.write ? "bg-blue-500/20 text-blue-400" : "text-gray-600/30 font-thin")}>W</span>
                  <span className={cn("text-[10px] w-3 h-3 flex items-center justify-center rounded", p.update ? "bg-purple-500/20 text-purple-400" : "text-gray-600/30 font-thin")}>U</span>
                  <span className={cn("text-[10px] w-3 h-3 flex items-center justify-center rounded", p.delete ? "bg-red-500/20 text-red-400" : "text-gray-600/30 font-thin")}>D</span>
                </div>
              </div>
            );
          })}
        </div>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Created",
      cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <div onClick={(e) => e.stopPropagation()}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-xl">
              <DropdownMenuItem 
                onClick={() => handleEdit(row.original)}
                className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]"
              >
                <Edit2 className="h-3.5 w-3.5" /> Edit Role
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleDelete(row.original.id)}
                className="flex items-center gap-2 cursor-pointer focus:bg-red-500/10 text-red-400 focus:text-red-500"
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Role Management</h1>
          <p className="text-gray-400 mt-1">Define roles and manage their modular permissions.</p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold rounded-xl h-11 px-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Role
        </Button>
      </div>

      <AdminDataTable
        columns={columns}
        data={roles || []}
        isLoading={isLoading}
        searchPlaceholder="Search roles..."
      />

      <RoleDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        role={selectedRole} 
      />
    </div>
  );
}
