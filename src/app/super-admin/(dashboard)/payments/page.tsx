"use client";

import React, { useState } from "react";
import {
  Download,
  MoreVertical,
  ExternalLink,
  Clock,
  CheckCircle2,
  XCircle,
  Loader2,
  Filter as FilterIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";
import { DataTablePagination } from "@/components/ui/pagination";
import { useWalletTransactions } from "@/lib/hooks/useWallet";
import { useUserPurchases } from "@/lib/hooks/usePurchases";
import { GetWalletTransactionsQuery } from "@/lib/types/wallet";
import { GetPurchasesQuery } from "@/lib/types/purchse";

type ViewMode = "deposits" | "transactions";

export default function AdminPaymentsPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("deposits");
  const [depositQuery, setDepositQuery] = useState<GetWalletTransactionsQuery>({
    limit: 10,
    offset: 0,
    type: "credit", // Only show deposits (credit transactions)
  });
  const [transactionQuery, setTransactionQuery] = useState<GetPurchasesQuery>({
    limit: 10,
    offset: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch data based on view mode
  const {
    data: depositData,
    isLoading: isLoadingDeposits,
    error: depositError,
  } = useWalletTransactions(viewMode === "deposits" ? depositQuery : undefined);

  const {
    data: transactionData,
    isLoading: isLoadingTransactions,
    error: transactionError,
  } = useUserPurchases(
    viewMode === "transactions" ? transactionQuery : undefined,
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (status: string) => {
    return (
      <span
        className={cn(
          "flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider w-fit shadow-sm",
          status === "completed"
            ? "bg-green-500/10 text-green-400 border border-green-500/20"
            : status === "pending"
              ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20",
        )}
      >
        {status === "completed" ? (
          <CheckCircle2 className="h-3 w-3" />
        ) : status === "pending" ? (
          <Clock className="h-3 w-3" />
        ) : (
          <XCircle className="h-3 w-3" />
        )}
        {status}
      </span>
    );
  };

  const getTypeBadge = (type: string) => {
    const typeColors = {
      credit: "bg-blue-500/10 text-blue-500 border-blue-500/20",
      debit: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    };

    return (
      <Badge
        className={`${typeColors[type as keyof typeof typeColors] || "bg-gray-500/10 text-gray-500"}`}
      >
        {type.toUpperCase()}
      </Badge>
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (viewMode === "deposits") {
      setDepositQuery((prev) => ({
        ...prev,
        offset: (page - 1) * (prev.limit || 10),
      }));
    } else {
      setTransactionQuery((prev) => ({
        ...prev,
        offset: (page - 1) * (prev.limit || 10),
      }));
    }
  };

  const handleFilterApply = (filters: any) => {
    setCurrentPage(1);
    if (viewMode === "deposits") {
      setDepositQuery({
        ...filters,
        type: "credit", // Always filter credit for deposits
        offset: 0,
      });
    } else {
      setTransactionQuery({
        ...filters,
        offset: 0,
      });
    }
  };

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
    setCurrentPage(1);
  };

  // Check if filters are active
  const hasActiveFilters =
    viewMode === "deposits"
      ? depositQuery.status || depositQuery.startDate || depositQuery.endDate
      : transactionQuery.status ||
        transactionQuery.startDate ||
        transactionQuery.endDate;

  const isLoading = isLoadingDeposits || isLoadingTransactions;
  const error = depositError || transactionError;

  // Get current data based on view mode
  const currentData = viewMode === "deposits" ? depositData : transactionData;
  const itemsPerPage =
    viewMode === "deposits"
      ? depositData?.pagination?.limit || depositQuery.limit || 10
      : transactionData?.pagination?.limit || transactionQuery.limit || 10;
  const totalPages = currentData?.pagination
    ? Math.ceil(currentData.pagination.total / itemsPerPage)
    : 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading financial data...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-400">
        Failed to load financial data
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Financial Ledger
          </h1>
          <p className="text-gray-400 mt-1">
            Global view of all platform transactions and payouts.
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

      {/* View Mode Toggle & Filter */}
      <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
        <div className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10">
          {/* View Mode Buttons */}
          <div className="flex items-center gap-2">
            <Button
              variant={viewMode === "deposits" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("deposits")}
              className={cn(
                "h-9",
                viewMode === "deposits"
                  ? "bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/10",
              )}
            >
              Deposit History
            </Button>
            <Button
              variant={viewMode === "transactions" ? "default" : "outline"}
              size="sm"
              onClick={() => handleViewModeChange("transactions")}
              className={cn(
                "h-9",
                viewMode === "transactions"
                  ? "bg-[#D4AF37] text-black hover:bg-[#D4AF37]/90"
                  : "bg-white/5 border-white/20 text-white hover:bg-white/10",
              )}
            >
              User Transactions
            </Button>
          </div>

          {/* Filter & Active Badge */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                <FilterIcon className="h-3 w-3 mr-1" />
                Filters Active
              </Badge>
            )}
            <DataTableFilter
              title={
                viewMode === "deposits"
                  ? "Deposit Filters"
                  : "Transaction Filters"
              }
              onFilterApply={handleFilterApply}
              currentFilters={
                viewMode === "deposits" ? depositQuery : transactionQuery
              }
              showTypeFilter={false}
            />
          </div>
        </div>

        {/* Deposits Table */}
        {viewMode === "deposits" && (
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-300">SL</TableHead>
                <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
                <TableHead className="text-gray-300">TYPE</TableHead>
                <TableHead className="text-gray-300">METHOD</TableHead>
                <TableHead className="text-gray-300">AMOUNT</TableHead>
                <TableHead className="text-gray-300">STATUS</TableHead>
                <TableHead className="text-gray-300">DATE</TableHead>
                <TableHead className="text-gray-300">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {depositData && depositData.transactions.length > 0 ? (
                depositData.transactions.map((transaction, index) => (
                  <TableRow
                    key={transaction.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="text-gray-300">
                      {(depositQuery.offset || 0) + index + 1}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-[#D4AF37] font-bold">
                        {transaction.id.substring(0, 8)}...
                      </span>
                    </TableCell>
                    <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                    <TableCell className="text-gray-300 text-xs">
                      {transaction.referenceType
                        .replace("_", " ")
                        .toUpperCase()}
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-white text-base">
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                    <TableCell>
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
                            <ExternalLink className="h-3.5 w-3.5" /> View
                            Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
                            <Clock className="h-3.5 w-3.5" /> Transaction Log
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={8}
                    className="text-center py-10 text-gray-400"
                  >
                    No deposits found
                    {hasActiveFilters && (
                      <p className="text-sm mt-2">Try adjusting your filters</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* Transactions Table */}
        {viewMode === "transactions" && (
          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-300">SL</TableHead>
                <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
                <TableHead className="text-gray-300">PLAN</TableHead>
                <TableHead className="text-gray-300">AMOUNT</TableHead>
                <TableHead className="text-gray-300">STATUS</TableHead>
                <TableHead className="text-gray-300">DATE</TableHead>
                <TableHead className="text-gray-300">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactionData && transactionData.purchases.length > 0 ? (
                transactionData.purchases.map((purchase, index) => (
                  <TableRow
                    key={purchase.id}
                    className="border-white/10 hover:bg-white/5 transition-colors"
                  >
                    <TableCell className="text-gray-300">
                      {(transactionQuery.offset || 0) + index + 1}
                    </TableCell>
                    <TableCell>
                      <span className="font-mono text-xs text-[#D4AF37] font-bold">
                        {purchase.id.substring(0, 8)}...
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium text-white">
                        {purchase.plan.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="font-bold text-white text-base">
                        ${purchase.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(purchase.status)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(purchase.createdAt)}
                    </TableCell>
                    <TableCell>
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
                            <ExternalLink className="h-3.5 w-3.5" /> View
                            Details
                          </DropdownMenuItem>
                          <DropdownMenuItem className="flex items-center gap-2 cursor-pointer focus:bg-white/5 focus:text-[#D4AF37]">
                            <Clock className="h-3.5 w-3.5" /> Transaction Log
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="text-center py-10 text-gray-400"
                  >
                    No transactions found
                    {hasActiveFilters && (
                      <p className="text-sm mt-2">Try adjusting your filters</p>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}

        {/* Pagination */}
        {currentData?.pagination && currentData.pagination.total > 0 && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={currentData.pagination.total}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>
    </div>
  );
}
