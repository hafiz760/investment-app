"use client";

import { useQuery } from "@tanstack/react-query";
import { PurchasesResponse, GetPurchasesQuery } from "../types/purchse";
import { ApiError } from "../types/error";
import { purchaseApi } from "../api/purchase.api";

export function useUserPurchases(query?: GetPurchasesQuery) {
  return useQuery<PurchasesResponse, ApiError>({
    queryKey: ["user-purchases", query],
    queryFn: () => purchaseApi.getUserPurchases(query),
  });
}