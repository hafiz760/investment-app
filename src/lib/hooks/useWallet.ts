"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  DepositRequest,
  DepositResponse,
  WalletTransactions,
  GetWalletTransactionsQuery,
} from "../types/wallet";
import { ApiError } from "../types/error";
import { walletApi } from "../api/walletapi";
import { toast } from "sonner";

export function useWalletDeposit() {
  const queryClient = useQueryClient();
  return useMutation<DepositResponse, ApiError, DepositRequest>({
    mutationFn: (data) => walletApi.deposit(data.amount),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      toast.success("Redirecting to payment...");
      window.location.href = data.url;
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create plan");
    },
  });
}

export function useWalletTransactions(query?: GetWalletTransactionsQuery) {
  return useQuery<WalletTransactions, ApiError>({
    queryKey: ["wallet-transactions", query],
    queryFn: () => walletApi.getUserWallet(query),
  });
}
