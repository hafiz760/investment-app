import apiClient from "./client.api";
import {
  DepositResponse,
  WalletTransactions,
  GetWalletTransactionsQuery,
  WalletDetails,
} from "../types/wallet";

export const walletApi = {
  getUserWallet: async (
    query?: GetWalletTransactionsQuery,
  ): Promise<WalletTransactions> => {
    const params = new URLSearchParams();

    // Always include offset, default to 0 if not provided
    params.append("offset", (query?.offset ?? 0).toString());

    // Always include limit, default to 50 if not provided
    params.append("limit", (query?.limit ?? 50).toString());

    if (query?.type) params.append("type", query.type);
    if (query?.status) params.append("status", query.status);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);

    const url = `/wallet/transactions?${params.toString()}`;
    const response = await apiClient.get<WalletTransactions>(url);
    return response.data;
  },
  deposit: async (amount: number): Promise<DepositResponse> => {
    const response = await apiClient.post<DepositResponse>("/wallet/top-up", {
      amount,
    });
    return response.data;
  },
  withdraw: async (amount: number): Promise<DepositResponse> => {
    const response = await apiClient.post<DepositResponse>("/wallet/withdraw", {
      amount,
    });
    return response.data;
  },

  getWalletDetails: async (): Promise<WalletDetails> => {
    const response = await apiClient.get<WalletDetails>("/wallet");
    return response.data;
  },
};
