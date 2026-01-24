import apiClient from "./client.api";
import { DepositResponse, WalletTransactions, GetWalletTransactionsQuery } from "../types/wallet";

export const walletApi = {
  getUserWallet: async (query?: GetWalletTransactionsQuery): Promise<WalletTransactions> => {
    const params = new URLSearchParams();

    if (query?.type) params.append("type", query.type);
    if (query?.status) params.append("status", query.status);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);

    const url = `/wallet/transactions${params.toString() ? `?${params.toString()}` : ""}`;
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
};
