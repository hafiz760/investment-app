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

const depositHistory = [
  {
    sl: 1,
    trx: "D646288105745",
    method: "Stripe",
    methodType: "logo",
    amount: "1000 USD",
    charge: "5.5 USD",
    status: "Success",
    time: "28.12.2025",
  },
  {
    sl: 2,
    trx: "D646288105744",
    method: "Binance",
    methodType: "logo",
    amount: "1 BTC",
    charge: "0 BTC",
    status: "Pending",
    time: "26.12.2025",
  },
  {
    sl: 3,
    trx: "D646288105743",
    method: "Stripe",
    methodType: "logo",
    amount: "1000 USD",
    charge: "5.5 USD",
    status: "Pending",
    time: "18.12.2025",
  },
  {
    sl: 4,
    trx: "D646288105742",
    method: "Bank Transfer",
    methodType: "logo",
    amount: "100 USD",
    charge: "0.5 USD",
    status: "Request",
    time: "18.12.2025",
  },
  {
    sl: 5,
    trx: "D646288105738",
    method: "PayStack",
    methodType: "logo",
    amount: "2000 USD",
    charge: "0.5 USD",
    status: "Pending",
    time: "13.12.2025",
  },
  {
    sl: 6,
    trx: "D646288105737",
    method: "Stripe",
    methodType: "logo",
    amount: "500 USD",
    charge: "3 USD",
    status: "Success",
    time: "10.12.2025",
  },
  {
    sl: 7,
    trx: "D646288105736",
    method: "Bank Transfer",
    methodType: "logo",
    amount: "1000 USD",
    charge: "0.5 USD",
    status: "Pending",
    time: "10.12.2025",
  },
];

export default function DepositHistoryPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Payment History</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Payment History
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Deposit Filter" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">SL</TableHead>
              <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
              <TableHead className="text-gray-300">METHOD</TableHead>
              <TableHead className="text-gray-300">AMOUNT</TableHead>
              <TableHead className="text-gray-300">CHARGE</TableHead>
              <TableHead className="text-gray-300">STATUS</TableHead>
              <TableHead className="text-gray-300">CREATED TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {depositHistory.map((row) => (
              <TableRow
                key={row.sl}
                className="border-white/5 hover:bg-white/5 text-white"
              >
                <TableCell className="font-medium text-gray-400">
                  {row.sl}
                </TableCell>
                <TableCell className="font-medium">{row.trx}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold text-[#D4AF37]">
                      {row.method.charAt(0)}
                    </div>
                    {row.method}
                  </div>
                </TableCell>
                <TableCell>{row.amount}</TableCell>
                <TableCell className="text-rose-400">{row.charge}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div
                      className={
                        row.status === "Success"
                          ? "h-2 w-2 rounded-full bg-cyan-400"
                          : row.status === "Pending"
                          ? "h-2 w-2 rounded-full bg-slate-400"
                          : "h-2 w-2 rounded-full bg-blue-400"
                      }
                    />
                    <Badge
                      variant="secondary"
                      className={
                        row.status === "Success"
                          ? "bg-cyan-400/10 text-cyan-400 border-none font-medium"
                          : row.status === "Pending"
                          ? "bg-slate-400/10 text-slate-400 border-none font-medium"
                          : "bg-blue-400/10 text-blue-400 border-none font-medium"
                      }
                    >
                      {row.status}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-gray-400">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
