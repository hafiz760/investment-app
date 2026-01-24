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
import { Loader2 } from "lucide-react";
import { DataTableFilter } from "@/components/dashboard/DataTableFilter";
import { DataTablePagination } from "@/components/ui/pagination";
import { useWalletTransactions } from "@/lib/hooks/useWallet";
import { GetWalletTransactionsQuery } from "@/lib/types/wallet";
import { useState } from "react";

interface WalletTransaction {
  id: string;
  walletId: string;
  amount: number;
  type: "credit" | "debit";
  status: "completed" | "pending" | "failed";
  description: string;
  referenceId: string;
  referenceType: string;
  metadata: {
    type: string;
    userId: string;
    sessionId: string;
    paymentIntentId: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function DepositHistoryPage() {
  const [query, setQuery] = useState<GetWalletTransactionsQuery>({
    limit: 50,
    offset: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error } = useWalletTransactions(query);
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

  const handleRowClick = (transaction: WalletTransaction) => {
    setSelectedTransaction(transaction);
    setIsDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQuery((prev) => ({
      ...prev,
      offset: (page - 1) * 50,
    }));
  };

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
            {data && data.transactions.length > 0 ? (
              data.transactions.map(
                (transaction: WalletTransaction, index: number) => (
                  <TableRow
                    key={transaction.id}
                    className="border-white/10 hover:bg-white/5 cursor-pointer transition-colors"
                    onClick={() => handleRowClick(transaction)}
                  >
                    <TableCell className="text-gray-300">{index + 1}</TableCell>
                    <TableCell className="text-gray-300 font-mono text-xs">
                      {transaction.id.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="text-gray-300">
                      {transaction.referenceType
                        .replace("_", " ")
                        .toUpperCase()}
                    </TableCell>
                    <TableCell className="text-[#D4AF37] font-semibold">
                      ${transaction.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="text-gray-300">$0.00</TableCell>
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
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {data?.pagination && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(data.pagination.total / 50)}
            onPageChange={handlePageChange}
            totalItems={data.pagination.total}
            itemsPerPage={50}
          />
        )}
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
                  <p className="text-white uppercase">
                    {selectedTransaction.type}
                  </p>
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

              {/* Metadata Section */}
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
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
