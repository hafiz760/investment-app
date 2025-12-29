"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Eye } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";

const ordersData = [
  { id: "#14734", date: "30.09.2025", total: "$322.5", status: "Pending" },
  { id: "#14733", date: "30.09.2025", total: "$217.5", status: "Pending" },
  { id: "#14732", date: "29.09.2025", total: "$217.5", status: "Pending" },
  { id: "#14728", date: "20.08.2025", total: "$720", status: "Pending" },
  { id: "#14726", date: "20.08.2025", total: "$820", status: "Pending" },
];

export default function OrdersPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Orders</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Orders</h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Order Filter" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">ORDER</TableHead>
              <TableHead className="text-gray-300">DATE</TableHead>
              <TableHead className="text-gray-300">TOTAL</TableHead>
              <TableHead className="text-gray-300">STATUS</TableHead>
              <TableHead className="text-right text-gray-300">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersData.map((order) => (
              <TableRow
                key={order.id}
                className="border-white/5 hover:bg-white/5 text-white"
              >
                <TableCell className="font-medium text-gray-400">
                  {order.id}
                </TableCell>
                <TableCell>{order.date}</TableCell>
                <TableCell className="font-semibold">{order.total}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-[#D4AF37]" />
                    <Badge
                      variant="secondary"
                      className="bg-[#D4AF37]/10 text-[#D4AF37] border-none font-medium"
                    >
                      {order.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-2 bg-white/5 border-white/20 text-gray-300 hover:text-white hover:bg-white/10"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
