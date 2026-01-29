"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Loader2, Filter } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";
import { DataTablePagination } from "@/components/ui/pagination";
import { useWalletTransactions } from "@/lib/hooks/useWallet";
import {
  GetWalletTransactionsQuery,
  WalletTransaction,
} from "@/lib/types/wallet";
import { useState } from "react";

export default function DepositHistoryPage() {
  const [query, setQuery] = useState<GetWalletTransactionsQuery>({
    limit: 10,
    offset: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useWalletTransactions(query);
  console.log(data);
  const [selectedTransaction, setSelectedTransaction] =
    useState<WalletTransaction | null>(null);
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

  const getStatusBadge = (status: string) => {
    const statusColors = {
      completed: "bg-green-500/10 text-green-500 border-green-500/20",
      pending: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
      failed: "bg-red-500/10 text-red-500 border-red-500/20",
    };

    return (
      <Badge
        className={`${statusColors[status as keyof typeof statusColors] || "bg-gray-500/10 text-gray-500"}`}
      >
        {status.toUpperCase()}
      </Badge>
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

  const handleRowClick = (transaction: WalletTransaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery((prev) => ({
      ...prev,
      offset: (page - 1) * (prev.limit || 50),
    }));
  };

  const handleFilterApply = (filters: GetWalletTransactionsQuery) => {
    setCurrentPage(1); // Reset to first page when filters change
    setQuery({
      ...filters,
      offset: 0, // Reset offset
    });
  };

  // Check if any filters are active
  const hasActiveFilters =
    query.type || query.status || query.startDate || query.endDate;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading Deposit History...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-400">
        Failed to load Deposit History
      </div>
    );
  }

  const itemsPerPage = data?.pagination?.limit || query.limit || 50;
  const totalPages = data?.pagination
    ? Math.ceil(data.pagination.total / (data.pagination.limit || itemsPerPage))
    : 1;

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Deposit History</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Deposit History
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
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
              <TableHead className="text-gray-300">SL</TableHead>
              <TableHead className="text-gray-300">TRANSACTION ID</TableHead>
              <TableHead className="text-gray-300">TYPE</TableHead>
              <TableHead className="text-gray-300">METHOD</TableHead>
              <TableHead className="text-gray-300">AMOUNT</TableHead>
              <TableHead className="text-gray-300">STATUS</TableHead>
              <TableHead className="text-gray-300">CREATED TIME</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data && data.transactions.length > 0 ? (
              data.transactions.map(
                (transaction: WalletTransaction, index: number) => (
                  <TableRow
                    key={transaction.id}
                    className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(transaction)}
                  >
                    <TableCell className="text-gray-300">
                      {(query.offset || 0) + index + 1}
                    </TableCell>
                    <TableCell className="text-gray-300 font-mono text-xs">
                      {transaction.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell>{getTypeBadge(transaction.type)}</TableCell>
                    <TableCell className="text-gray-300">
                      {transaction.referenceType
                        .replace("_", " ")
                        .toUpperCase()}
                    </TableCell>
                    <TableCell className="text-[#D4AF37] font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="text-gray-300">
                      {formatDate(transaction.createdAt)}
                    </TableCell>
                  </TableRow>
                ),
              )
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

          {selectedTransaction && (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Transaction ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTransaction.id}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Wallet ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTransaction.walletId}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Amount</p>
                  <p className="text-[#D4AF37] font-semibold text-lg">
                    ${selectedTransaction.amount.toFixed(2)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Type</p>
                  <div>{getTypeBadge(selectedTransaction.type)}</div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Status</p>
                  <div>{getStatusBadge(selectedTransaction.status)}</div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Description</p>
                  <p className="text-white">
                    {selectedTransaction.description}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Reference ID</p>
                  <p className="text-white font-mono text-sm break-all">
                    {selectedTransaction.referenceId}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Reference Type</p>
                  <p className="text-white">
                    {selectedTransaction.referenceType}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="text-white">
                    {formatDate(selectedTransaction.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Updated At</p>
                  <p className="text-white">
                    {formatDate(selectedTransaction.updatedAt)}
                  </p>
                </div>
              </div>
              {selectedTransaction.metadata && (
                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-3 font-semibold">
                    Payment Metadata
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">User ID</p>
                      <p className="text-white font-mono text-sm break-all">
                        {selectedTransaction.metadata.userId}
                      </p>
                    </div>

                    <div className="space-y-1">
                      <p className="text-sm text-gray-400">Session ID</p>
                      <p className="text-white font-mono text-sm break-all">
                        {selectedTransaction.metadata.sessionId}
                      </p>
                    </div>

                    <div className="space-y-1 col-span-2">
                      <p className="text-sm text-gray-400">Payment Intent ID</p>
                      <p className="text-white font-mono text-sm break-all">
                        {selectedTransaction.metadata.paymentIntentId}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
