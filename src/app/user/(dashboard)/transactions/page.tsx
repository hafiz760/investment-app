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
import { Search } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";

const transactions = [
  {
    sl: 1,
    trx: "PLI646288105663",
    amount: "$500",
    charge: "$0",
    remarks: "Investment from wallet",
    time: "28.12.2025",
    type: "minus",
  },
  {
    sl: 2,
    trx: "D646288105745",
    amount: "$1,000",
    charge: "$5.5",
    remarks: "Deposit Via Stripe",
    time: "28.12.2025",
    type: "plus",
  },
  {
    sl: 3,
    trx: "PLI646288105662",
    amount: "$500",
    charge: "$0",
    remarks: "Investment from wallet",
    time: "10.12.2025",
    type: "minus",
  },
  {
    sl: 4,
    trx: "D646288105737",
    amount: "$500",
    charge: "$3",
    remarks: "Deposit Via Stripe",
    time: "10.12.2025",
    type: "plus",
  },
  {
    sl: 5,
    trx: "P151300866294",
    amount: "$13.16",
    charge: "$0.66",
    remarks: "Withdraw Request Via Razorpay",
    time: "01.12.2025",
    type: "minus",
  },
  {
    sl: 6,
    trx: "PLI646288105660",
    amount: "$200",
    charge: "$0",
    remarks: "Investment from profit balance",
    time: "17.11.2025",
    type: "minus",
  },
  {
    sl: 7,
    trx: "PLI646288105659",
    amount: "$300",
    charge: "$0",
    remarks: "Investment from profit balance",
    time: "06.11.2025",
    type: "minus",
  },
  {
    sl: 8,
    trx: "T646288105659",
    amount: "$208.33",
    charge: "$0.52",
    remarks: "Deduct $208.85 from the profit balance for payout.",
    time: "06.11.2025",
    type: "minus",
  },
];

export default function TransactionsPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Transactions</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Transactions
        </h1>
      </div>

      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex justify-end border-b border-white/10">
          <DataTableFilter title="Transaction Filter" />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">SL</TableHead>
              <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
              <TableHead className="text-gray-300">AMOUNT</TableHead>
              <TableHead className="text-gray-300">CHARGE</TableHead>
              <TableHead className="text-gray-300">REMARKS</TableHead>
              <TableHead className="text-gray-300">CREATED TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((row) => (
              <TableRow
                key={row.sl}
                className="border-white/5 hover:bg-white/5 text-white"
              >
                <TableCell className="font-medium text-gray-400">
                  {row.sl}
                </TableCell>
                <TableCell className="font-medium">{row.trx}</TableCell>
                <TableCell
                  className={
                    row.type === "plus"
                      ? "text-emerald-400 font-bold"
                      : "text-rose-400 font-bold"
                  }
                >
                  {row.amount}
                </TableCell>
                <TableCell className="text-rose-400">{row.charge}</TableCell>
                <TableCell className="text-gray-300 max-w-[300px] truncate">
                  {row.remarks}
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
