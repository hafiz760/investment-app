import { Pagination } from "./pagination";
import { InvestmentPlan } from "./plans";

export interface Purchase {
  id: string;
  userId: string;
  planId: string;
  plan: InvestmentPlan;
  stripeSessionId: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  isActive: boolean;
  metadata: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetPurchasesQuery {
  status?: "pending" | "completed" | "failed";
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface PurchasesResponse {
  purchases: Purchase[];
  pagination: Pagination;
}
