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
import { Search } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";

const withdrawHistory = [
  {
    sl: 1,
    trx: "P151300866294",
    amount: "10 INR",
    charge: "0.5 INR",
    time: "01.12.2025",
    status: "Generated",
    action: "--",
  },
  {
    sl: 2,
    trx: "P151300866293",
    amount: "70 EUR",
    charge: "0.5 EUR",
    time: "30.11.2025",
    status: "Pending",
    action: "Confirm",
  },
  {
    sl: 3,
    trx: "P151300866292",
    amount: "70 EUR",
    charge: "0.5 EUR",
    time: "30.11.2025",
    status: "Pending",
    action: "Confirm",
  },
  {
    sl: 4,
    trx: "P151300866291",
    amount: "200 EUR",
    charge: "0.5 EUR",
    time: "06.11.2025",
    status: "Generated",
    action: "--",
  },
  {
    sl: 5,
    trx: "P151300866290",
    amount: "10 CAD",
    charge: "0.5 CAD",
    time: "03.11.2025",
    status: "Pending",
    action: "Confirm",
  },
  {
    sl: 6,
    trx: "P151300866289",
    amount: "10 EUR",
    charge: "0.5 EUR",
    time: "03.11.2025",
    status: "Generated",
    action: "--",
  },
];

export default function WithdrawHistoryPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Withdraw History</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Withdraw History
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Withdraw Filter" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">SL</TableHead>
              <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
              <TableHead className="text-gray-300">AMOUNT</TableHead>
              <TableHead className="text-gray-300">CHARGE</TableHead>
              <TableHead className="text-gray-300">CREATED TIME</TableHead>
              <TableHead className="text-gray-300">STATUS</TableHead>
              <TableHead className="text-right text-gray-300">ACTION</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {withdrawHistory.map((row) => (
              <TableRow
                key={row.sl}
                className="border-white/5 hover:bg-white/5 text-white"
              >
                <TableCell className="font-medium text-gray-400">
                  {row.sl}
                </TableCell>
                <TableCell className="font-medium">{row.trx}</TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell className="text-rose-400">{row.charge}</TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        row.status === "Pending"
                          ? "h-2 w-2 rounded-full bg-slate-400"
                          : "h-2 w-2 rounded-full bg-cyan-400"
                      }
                    />
                    <Badge
                      variant="secondary"
                      className={
                        row.status === "Pending"
                          ? "bg-slate-400/10 text-slate-400 border-none font-medium"
                          : "bg-cyan-400/10 text-cyan-400 border-none font-medium"
                      }
                    >
                      {row.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {row.action === "Confirm" ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-white/30"
                    >
                      Confirm
                    </Button>
                  ) : (
                    <span className="text-gray-500 pr-4">--</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
