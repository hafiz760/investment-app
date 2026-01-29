import apiClient from "./client.api";
import { PurchasesResponse, GetPurchasesQuery } from "../types/purchse";

export const purchaseApi = {
  getUserPurchases: async (
    query?: GetPurchasesQuery,
  ): Promise<PurchasesResponse> => {
    const params = new URLSearchParams();

    // Always include offset and limit
    params.append("offset", (query?.offset ?? 0).toString());
    params.append("limit", (query?.limit ?? 50).toString());

    if (query?.status) params.append("status", query.status);
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);

    const url = `/purchases/user?${params.toString()}`;
    const response = await apiClient.get<PurchasesResponse>(url);
    return response.data;
  },
};
