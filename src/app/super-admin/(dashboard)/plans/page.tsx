"use client";

import React, { useState } from "react";
import { Plus, MoreVertical, Edit2, Trash2, TrendingUp, Power, PowerOff } from "lucide-react";
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
import { usePlans, useDeletePlan, useUpdatePlan } from "@/lib/hooks/usePlans";
import { InvestmentPlan } from "@/lib/types/auth";
import { PlanDialog } from "@/components/super-admin/PlanDialog";

export default function PlansPage() {
  const { data: plans, isLoading } = usePlans();
  const deletePlanMutation = useDeletePlan();
  const updatePlanMutation = useUpdatePlan();
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEdit = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };

  const handleCreate = () => {
    setSelectedPlan(null);
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this investment plan?")) {
      await deletePlanMutation.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (plan: InvestmentPlan) => {
    await updatePlanMutation.mutateAsync({
      id: plan.id,
      data: { isActive: !plan.isActive },
    });
  };

  const columns: ColumnDef<InvestmentPlan>[] = [
    {
      accessorKey: "name",
      header: "Plan Name",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="font-semibold text-white">{row.original.name}</span>
          <span className="text-[10px] text-gray-500 font-mono">{row.original.id}</span>
        </div>
      ),
    },
    {
      accessorKey: "investment",
      header: "Investment Range",
      cell: ({ row }) => (
        <span className="text-gray-300">
          ${row.original.minInvestment.toLocaleString()} - ${row.original.maxInvestment.toLocaleString()}
        </span>
      ),
    },
    {
      accessorKey: "monthlyReturn",
      header: "Monthly Return",
      cell: ({ row }) => (
        <span className="text-[#D4AF37] font-bold">
          {row.original.monthlyReturnMin}% - {row.original.monthlyReturnMax}%
        </span>
      ),
    },
    {
      accessorKey: "growth",
      header: "Annual / 3Y Growth",
      cell: ({ row }) => (
        <div className="flex flex-col">
          <span className="text-xs text-gray-300">
            Year: {row.original.annualGrowthMin}%-{row.original.annualGrowthMax}%
          </span>
          <span className="text-xs text-blue-400">
            3Y: {row.original.threeYearGrowthMin}%-{row.original.threeYearGrowthMax}%
          </span>
        </div>
      ),
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={cn(
            "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
            row.original.isActive
              ? "bg-green-500/10 text-green-400 border-green-500/20"
              : "bg-red-500/10 text-red-400 border-red-500/20"
          )}
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
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
                <Edit2 className="h-3.5 w-3.5" /> Edit Plan
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => handleToggleStatus(row.original)}
                className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]"
              >
                {row.original.isActive ? (
                  <>
                    <PowerOff className="h-3.5 w-3.5" /> Deactivate
                  </>
                ) : (
                  <>
                    <Power className="h-3.5 w-3.5" /> Activate
                  </>
                )}
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
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <TrendingUp className="h-8 w-8 text-[#D4AF37]" />
            Investment Plans
          </h1>
          <p className="text-gray-400 mt-1">Configure and manage investment products for users.</p>
        </div>
        <Button 
          onClick={handleCreate}
          className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold rounded-xl h-11 px-6 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
        >
          <Plus className="h-5 w-5 mr-2" /> Add New Plan
        </Button>
      </div>

      <AdminDataTable
        columns={columns}
        data={plans || []}
        isLoading={isLoading}
        searchPlaceholder="Search plans by name..."
      />

      <PlanDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        plan={selectedPlan} 
      />
    </div>
  );
}
