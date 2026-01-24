import { Pagination } from "./pagination";

export interface DepositRequest {
  amount: number;
}

export interface DepositResponse {
  url: string;
}

export interface WalletTransaction {
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

export interface GetWalletTransactionsQuery {
  type?: "credit" | "debit";
  status?: "completed" | "pending" | "failed";
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface WalletTransactions {
  transactions: WalletTransaction[];
  pagination: Pagination;
}
