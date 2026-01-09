"use client";

import React from "react";
import {
  Download,
  MoreVertical,
  ExternalLink,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";
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

interface PaymentRecord {
  id: string;
  transactionId: string;
  user: string;
  amount: string;
  method: string;
  status: "Completed" | "Pending" | "Failed";
  date: string;
}

const dummyPayments: PaymentRecord[] = [
  {
    id: "1",
    transactionId: "TRX-982341",
    user: "John Doe",
    amount: "$150.00",
    method: "Crypto (USDT)",
    status: "Completed",
    date: "2024-03-20 14:30",
  },
  {
    id: "2",
    transactionId: "TRX-982342",
    user: "Jane Smith",
    amount: "$500.00",
    method: "Bank Transfer",
    status: "Pending",
    date: "2024-03-20 12:15",
  },
  {
    id: "3",
    transactionId: "TRX-982343",
    user: "Mike Johnson",
    amount: "$2,400.00",
    method: "Crypto (BTC)",
    status: "Completed",
    date: "2024-03-19 09:45",
  },
  {
    id: "4",
    transactionId: "TRX-982344",
    user: "Sarah Wilson",
    amount: "$75.00",
    method: "Internal Wallet",
    status: "Failed",
    date: "2024-03-19 18:00",
  },
  {
    id: "5",
    transactionId: "TRX-982345",
    user: "Robert Brown",
    amount: "$1,200.00",
    method: "Crypto (ETH)",
    status: "Completed",
    date: "2024-03-18 11:20",
  },
  {
    id: "6",
    transactionId: "TRX-982346",
    user: "Emily Davis",
    amount: "$300.00",
    method: "Crypto (USDT)",
    status: "Completed",
    date: "2024-03-17 15:10",
  },
  {
    id: "7",
    transactionId: "TRX-982347",
    user: "Chris Miller",
    amount: "$4,500.00",
    method: "Bank Transfer",
    status: "Completed",
    date: "2024-03-16 10:05",
  },
  {
    id: "8",
    transactionId: "TRX-982348",
    user: "Anna Taylor",
    amount: "$1,000.00",
    method: "Crypto (BTC)",
    status: "Pending",
    date: "2024-03-15 22:30",
  },
];

const columns: ColumnDef<PaymentRecord>[] = [
  {
    accessorKey: "transactionId",
    header: "Transaction ID",
    cell: ({ row }) => (
      <span className="font-mono text-xs text-[#D4AF37] font-bold">
        {row.original.transactionId}
      </span>
    ),
  },
  {
    accessorKey: "user",
    header: "User",
    cell: ({ row }) => (
      <span className="font-medium text-white">{row.original.user}</span>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => (
      <span className="font-bold text-white text-base">
        {row.original.amount}
      </span>
    ),
  },
  {
    accessorKey: "method",
    header: "Method",
    cell: ({ row }) => (
      <span className="text-xs text-gray-400">{row.original.method}</span>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <span
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit shadow-sm",
            status === "Completed"
              ? "bg-green-500/10 text-green-400 border border-green-500/20"
              : status === "Pending"
              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          )}
        >
          {status === "Completed" ? (
            <CheckCircle2 className="h-3 w-3" />
          ) : status === "Pending" ? (
            <Clock className="h-3 w-3" />
          ) : (
            <XCircle className="h-3 w-3" />
          )}
          {status}
        </span>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date Time",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-white"
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white shadow-xl"
        >
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
            <ExternalLink className="h-3.5 w-3.5" /> View Receipt
          </DropdownMenuItem>
          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
            <Clock className="h-3.5 w-3.5" /> TRX Log
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

export default function AdminPaymentsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Payment History
          </h1>
          <p className="text-gray-400 mt-1">
            Detailed log of all financial transactions.
          </p>
        </div>
        <Button
          variant="outline"
          className="border-[#D4AF37]/20 text-[#D4AF37] hover:bg-[#D4AF37]/10 h-11 px-6"
        >
          <Download className="h-5 w-5 mr-2" />
          Export CSV
        </Button>
      </div>

      <AdminDataTable
        columns={columns}
        data={dummyPayments}
        searchPlaceholder="Search transactions..."
      />
    </div>
  );
}
