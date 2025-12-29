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
import { Search, X } from "lucide-react";

interface DataTableFilterProps {
  title?: string;
}

export function DataTableFilter({
  title = "Deposit Filter",
}: DataTableFilterProps) {
  const [open, setOpen] = useState(false);

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
        className="bg-[#0F1C2E]/95 backdrop-blur-xl border-l border-[#D4AF37]/20 text-white sm:max-w-md p-0 overflow-hidden"
      >
        <SheetHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">
            {title}
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(false)}
            className="text-white/60 hover:text-white hover:bg-white/5 h-8 w-8"
          >
            <X className="h-5 w-5" />
          </Button>
        </SheetHeader>

        <div className="p-6 space-y-6">
          <div className="space-y-2.5">
            <Label
              htmlFor="trx_id"
              className="text-gray-400 font-medium text-sm"
            >
              Transaction ID
            </Label>
            <Input
              id="trx_id"
              placeholder="Transaction ID"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus-visible:ring-[#D4AF37]/50 h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label
              htmlFor="date_range"
              className="text-gray-400 font-medium text-sm"
            >
              Date Range
            </Label>
            <div className="relative">
              <Input
                id="date_range"
                placeholder="Select Dates"
                readOnly
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 cursor-pointer focus-visible:ring-[#D4AF37]/50 h-11"
              />
            </div>
          </div>

          <div className="pt-4">
            <Button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white gap-2 font-semibold h-12 shadow-lg shadow-blue-600/20"
              onClick={() => setOpen(false)}
            >
              <Search className="h-4 w-4" />
              Apply
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
