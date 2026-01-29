"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RotateCcw } from "lucide-react";

interface DataTableFilterProps<T = any> {
  title?: string;
  onFilterApply: (filters: T) => void;
  currentFilters: T;
  showTypeFilter?: boolean; // Control if transaction type filter shows
}

export function DataTableFilter<T extends Record<string, any>>({
  title = "Filters",
  onFilterApply,
  currentFilters,
  showTypeFilter = true, // Default to showing type filter
}: DataTableFilterProps<T>) {
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState<T>(currentFilters);

  const handleApply = () => {
    onFilterApply(filters);
    setOpen(false);
  };

  const handleReset = () => {
    const resetFilters = {
      ...currentFilters,
      type: undefined,
      status: undefined,
      startDate: undefined,
      endDate: undefined,
      limit: 50,
      offset: 0,
    } as T;
    setFilters(resetFilters);
    onFilterApply(resetFilters);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <Search className="h-4 w-4" />
          Filter
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[#0F1C2E]/95 backdrop-blur-xl border-l border-[#D4AF37]/20 text-white sm:max-w-md p-0 overflow-hidden transition-none duration-0"
      >
        <SheetHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">
            {title}
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-120px)]">
          {/* Transaction Type Filter - Conditionally rendered */}
          {showTypeFilter && (
            <div className="space-y-2.5">
              <Label className="text-gray-400 font-medium text-sm">
                Transaction Type
              </Label>
              <Select
                value={(filters as any).type || "all"}
                onValueChange={(value) =>
                  setFilters({
                    ...filters,
                    type: value === "all" ? undefined : value,
                  } as T)
                }
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                  <SelectValue placeholder="Select Type" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1C2E] border-white/10 text-white">
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="credit">Credit</SelectItem>
                  <SelectItem value="debit">Debit</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Status Filter */}
          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">Status</Label>
            <Select
              value={(filters as any).status || "all"}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  status: value === "all" ? undefined : value,
                } as T)
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1C2E] border-white/10 text-white">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Start Date Filter */}
          <div className="space-y-2.5">
            <Label
              htmlFor="startDate"
              className="text-gray-400 font-medium text-sm"
            >
              Start Date
            </Label>
            <Input
              id="startDate"
              type="date"
              value={(filters as any).startDate || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  startDate: e.target.value || undefined,
                } as T)
              }
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-11"
            />
          </div>

          {/* End Date Filter */}
          <div className="space-y-2.5">
            <Label
              htmlFor="endDate"
              className="text-gray-400 font-medium text-sm"
            >
              End Date
            </Label>
            <Input
              id="endDate"
              type="date"
              value={(filters as any).endDate || ""}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  endDate: e.target.value || undefined,
                } as T)
              }
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-11"
            />
          </div>

          {/* Items Per Page */}
          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">
              Items Per Page
            </Label>
            <Select
              value={(filters as any).limit?.toString() || "50"}
              onValueChange={(value) =>
                setFilters({
                  ...filters,
                  limit: parseInt(value),
                  offset: 0,
                } as T)
              }
            >
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="Select Limit" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1C2E] border-white/10 text-white">
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Action Buttons */}
          <div className="pt-4 space-y-3">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold h-12 shadow-lg shadow-blue-600/20"
              onClick={handleApply}
            >
              <Search className="h-4 w-4" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="w-full bg-white/5 border-white/20 text-white hover:bg-white/10 gap-2 font-semibold h-12"
              onClick={handleReset}
            >
              <RotateCcw className="h-4 w-4" />
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
