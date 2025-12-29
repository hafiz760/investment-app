"use client";

import React from "react";
import { Search } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function WishlistPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Wishlist</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Wishlist
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Wishlist Filter" />
        </div>
        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">NO</TableHead>
              <TableHead className="text-gray-300">IMAGE</TableHead>
              <TableHead className="text-gray-300">TITLE</TableHead>
              <TableHead className="text-gray-300">PRICE</TableHead>
              <TableHead className="text-right text-gray-300">ACTION</TableHead>
            </TableRow>
          </TableHeader>
        </Table>

        <div className="flex flex-col items-center justify-center p-20 text-center space-y-4">
          <div className="relative h-48 w-48 flex items-center justify-center">
            {/* Simple representation of the illustration */}
            <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-full blur-2xl" />
            <Search className="h-20 w-20 text-white/10 relative z-10" />
            <div className="absolute bottom-4 right-4 h-8 w-8 bg-white/5 rotate-12" />
            <div className="absolute top-4 left-4 h-6 w-6 bg-white/5 -rotate-12" />
          </div>
          <p className="text-gray-400 font-medium text-lg">No data to show</p>
        </div>
      </div>
    </div>
  );
}
