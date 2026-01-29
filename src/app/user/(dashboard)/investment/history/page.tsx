"use client";

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, Filter } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";
import { DataTablePagination } from "@/components/ui/pagination";
import { useUserPurchases } from "@/lib/hooks/usePurchases";
import { GetPurchasesQuery } from "@/lib/types/purchse";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Purchase } from "@/lib/types/purchse";

function TransactionStatusBadge({
  status,
}: {
  status: "pending" | "completed" | "failed" | "refunded";
}) {
  const styles = {
    completed: "bg-green-500/10 text-green-500 border-green-500/20",
    pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    failed: "bg-red-500/10 text-red-500 border-red-500/20",
    refunded: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  };

  return (
    <Badge variant="outline" className={`capitalize ${styles[status]}`}>
      {status.toUpperCase()}
    </Badge>
  );
}

export default function TransactionsPage() {
  const [query, setQuery] = useState<GetPurchasesQuery>({
    limit: 10,
    offset: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useUserPurchases(query);
  const [selectedTx, setSelectedTx] = useState<Purchase | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleRowClick = (transaction: Purchase) => {
    setSelectedTx(transaction);
    setIsDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery((prev) => ({
      ...prev,
      offset: (page - 1) * (prev.limit || 10),
    }));
  };

  const handleFilterApply = (filters: GetPurchasesQuery) => {
    setCurrentPage(1);
    setQuery({
      ...filters,
      offset: 0,
    });
  };

  // Check if any filters are active
  const hasActiveFilters = query.status || query.startDate || query.endDate;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading transactions...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-400">
        Failed to load transactions
      </div>
    );
  }

  const transactions = data?.purchases || [];
  const itemsPerPage = data?.pagination?.limit || query.limit || 10;
  const totalPages = data?.pagination
    ? Math.ceil(data.pagination.total / itemsPerPage)
    : 1;

  return (
    <>
      <div className="space-y-8 pb-12">
        {/* Header */}
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
          <div className="p-4 flex justify-between items-center border-b border-white/10">
            <div className="flex items-center gap-2">
              {hasActiveFilters && (
                <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]/20">
                  <Filter className="h-3 w-3 mr-1" />
                  Filters Active
                </Badge>
              )}
            </div>
            <DataTableFilter
              title="Transaction Filters"
              onFilterApply={handleFilterApply}
              currentFilters={query}
              showTypeFilter={false} // Hide transaction type filter for purchases
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-300">SL</TableHead>
                <TableHead className="text-gray-300">PLAN</TableHead>
                <TableHead className="text-gray-300">AMOUNT</TableHead>
                <TableHead className="text-gray-300">CHARGES</TableHead>
                <TableHead className="text-gray-300">STATUS</TableHead>
                <TableHead className="text-gray-300">CREATED DATE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {transactions.length > 0 ? (
                transactions.map((tx, index) => (
                  <TableRow
                    key={tx.id}
                    className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(tx)}
                  >
                    <TableCell className="text-gray-300">
                      {(query.offset || 0) + index + 1}
                    </TableCell>

                    <TableCell className="text-white font-medium">
                      {tx.plan.name}
                    </TableCell>

                    <TableCell className="text-[#D4AF37] font-semibold">
                      ${tx.amount.toFixed(2)}
                    </TableCell>

                    <TableCell className="text-gray-300">$0.00</TableCell>

                    <TableCell>
                      <TransactionStatusBadge status={tx.status} />
                    </TableCell>

                    <TableCell className="text-gray-300">
                      {formatDate(tx.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
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

          {/* Pagination */}
          {data?.pagination && data.pagination.total > 0 && (
            <DataTablePagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={data.pagination.total}
              itemsPerPage={itemsPerPage}
            />
          )}
        </div>
      </div>

      {/* Transaction Detail Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
              Transaction Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete information about this transaction
            </DialogDescription>
          </DialogHeader>

          {selectedTx && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTx.id}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Stripe Session ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTx.stripeSessionId}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Plan Name</p>
                  <p className="text-white font-semibold text-lg">
                    {selectedTx.plan.name}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="text-[#D4AF37] font-semibold text-lg">
                    ${selectedTx.amount.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Currency</p>
                  <p className="text-white uppercase">{selectedTx.currency}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Status</p>
                  <div>
                    <TransactionStatusBadge status={selectedTx.status} />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">User ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTx.userId}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Plan ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTx.planId}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="text-white">
                    {formatDate(selectedTx.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Updated At</p>
                  <p className="text-white">
                    {formatDate(selectedTx.updatedAt)}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
