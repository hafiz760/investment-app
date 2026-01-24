"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  InvestmentPlan,
  CreatePlanRequest,
  buyPlanRequest,
  buyPlanResponse,
  buyPlanWalletRequest,
  buyPlanWalletResponse,
} from "../types/plans";
import { toast } from "sonner";
import { ApiError } from "../types/error";
import { plansApi } from "../api/plans.api";

export function usePlans() {
  return useQuery<InvestmentPlan[], ApiError>({
    queryKey: ["plans"],
    queryFn: plansApi.getPlans,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation<InvestmentPlan, ApiError, CreatePlanRequest>({
    mutationFn: plansApi.createPlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Investment plan created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create plan");
    },
  });
}

export function useUpdatePlan() {
  const queryClient = useQueryClient();
  return useMutation<
    InvestmentPlan,
    ApiError,
    { id: string; data: Partial<CreatePlanRequest> }
  >({
    mutationFn: ({ id, data }) => plansApi.updatePlan(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Investment plan updated successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update plan");
    },
  });
}

export function useDeletePlan() {
  const queryClient = useQueryClient();
  return useMutation<void, ApiError, string>({
    mutationFn: plansApi.deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Investment plan deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete plan");
    },
  });
}

export function usebuyPlan() {
  const queryClient = useQueryClient();
  return useMutation<buyPlanResponse, ApiError, buyPlanRequest>({
    mutationFn: plansApi.buyPlan,
    onSuccess: (data) => {
      toast.success("Redirecting to payment...");
      // DON'T redirect here - let the component handle it
      // This prevents the hooks error during mutation callback
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create plan");
    },
  });
}

export function useBuyPlanWithWallet() {
  const queryClient = useQueryClient();
  return useMutation<buyPlanWalletResponse, ApiError, buyPlanWalletRequest>({
    mutationFn: plansApi.buyPlanWithWallet,
    onSuccess: (data) => {
      toast.success(data.message || "Plan purchased successfully with wallet!");
      queryClient.invalidateQueries({ queryKey: ["wallet-transactions"] });
      queryClient.invalidateQueries({ queryKey: ["purchases"] });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to purchase plan with wallet");
    },
  });
}
