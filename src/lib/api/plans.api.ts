import apiClient from "./client.api";
import {
  InvestmentPlan,
  CreatePlanRequest,
  buyPlanRequest,
  buyPlanResponse,
} from "../types/plans";

export const plansApi = {
  getPlans: async (): Promise<InvestmentPlan[]> => {
    const response = await apiClient.get<InvestmentPlan[]>("/plans");
    return response.data;
  },

  createPlan: async (data: CreatePlanRequest): Promise<InvestmentPlan> => {
    const response = await apiClient.post<InvestmentPlan>("/plans", data);
    return response.data;
  },
  updatePlan: async (
    id: string,
    data: Partial<CreatePlanRequest>,
  ): Promise<InvestmentPlan> => {
    const response = await apiClient.patch<InvestmentPlan>(
      `/plans/${id}`,
      data,
    );
    return response.data;
  },
  deletePlan: async (id: string): Promise<void> => {
    await apiClient.delete(`/plans/${id}`);
  },
  buyPlan: async (data: buyPlanRequest): Promise<buyPlanResponse> => {
    const response = await apiClient.post<buyPlanResponse>("/plans/buy", data);
    return response.data;
  },
  buyPlanWithWallet: async (data: { planId: string }): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>("/plans/buy-wallet", data);
    return response.data;
  },
};
