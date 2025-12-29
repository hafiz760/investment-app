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
import { Search, HelpCircle, Info } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";

const historyData = [
  {
    sl: 1,
    plan: "Standard",
    profit: "$25",
    period: "Every 5 Hour",
    received: "25.00 x 0 = $0",
    upcoming: "0d 3h 37m 17s",
  },
  {
    sl: 2,
    plan: "Standard",
    profit: "$25",
    period: "Every 5 Hour",
    received: "25.00 x 0 = $0",
    upcoming: "Time has passed",
  },
  {
    sl: 3,
    plan: "Starter",
    profit: "$10",
    period: "Every 1 Month",
    received: "10.00 x 0 = $0",
    upcoming: "Time has passed",
  },
  {
    sl: 4,
    plan: "Professional",
    profit: "$5",
    period: "Every 1 Hour",
    received: "5.00 x 0 = $0",
    upcoming: "Time has passed",
  },
  {
    sl: 5,
    plan: "Starter",
    profit: "$10",
    period: "Every 1 Month",
    received: "10.00 x 0 = $0",
    upcoming: "Time has passed",
  },
  {
    sl: 6,
    plan: "Premium",
    profit: "$100",
    period: "Every 1 Hour",
    received: "100.00 x 0 = $0",
    upcoming: "Time has passed",
  },
];

export default function InvestmentHistoryPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Plan Investment</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Plan Investment
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Investment Filter" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="w-16">SL</TableHead>
              <TableHead>PLAN</TableHead>
              <TableHead>
                <div className="flex items-center gap-1">
                  PROFIT <HelpCircle className="h-3 w-3" />
                </div>
              </TableHead>
              <TableHead>RETURN PERIOD</TableHead>
              <TableHead>RECEIVED AMOUNT</TableHead>
              <TableHead>UPCOMING PAYMENT</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {historyData.map((row) => (
              <TableRow
                key={row.sl}
                className="border-white/5 hover:bg-white/5"
              >
                <TableCell className="font-medium text-gray-400">
                  {row.sl}
                </TableCell>
                <TableCell className="font-semibold text-[#D4AF37]">
                  {row.plan}
                </TableCell>
                <TableCell className="text-white">{row.profit}</TableCell>
                <TableCell className="text-white">{row.period}</TableCell>
                <TableCell className="text-white">
                  <div className="flex items-center gap-2 text-white">
                    {row.received}
                    <Info className="h-3 w-3 text-gray-400" />
                  </div>
                </TableCell>
                <TableCell
                  className={
                    row.upcoming.includes("passed")
                      ? "text-rose-400"
                      : "text-gray-300"
                  }
                >
                  {row.upcoming}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
