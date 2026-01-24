"use client";

import { useQuery } from "@tanstack/react-query";
import { ApiError } from "../types/error";
import { walletApi } from "../api/walletapi";

export function useWalletBalance() {
  return useQuery<number, ApiError>({
    queryKey: ["wallet-balance"],
    queryFn: async () => {
      const wallet = await walletApi.getUserWallet();
      const balance =
        wallet.transactions
          .filter((transaction: any) => transaction.type === "credit")
          .reduce(
            (acc: number, transaction: any) => acc + transaction.amount,
            0,
          ) -
        wallet.transactions
          .filter((transaction: any) => transaction.type === "debit")
          .reduce(
            (acc: number, transaction: any) => acc + transaction.amount,
            0,
          );
      return balance;
    },
  });
}
