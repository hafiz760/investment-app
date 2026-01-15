"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth";
import { InvestmentPlan, CreatePlanRequest, ApiError } from "../types/auth";
import { toast } from "sonner";

export function usePlans() {
  return useQuery<InvestmentPlan[], ApiError>({
    queryKey: ["plans"],
    queryFn: authApi.getPlans,
  });
}

export function useCreatePlan() {
  const queryClient = useQueryClient();
  return useMutation<InvestmentPlan, ApiError, CreatePlanRequest>({
    mutationFn: authApi.createPlan,
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
  return useMutation<InvestmentPlan, ApiError, { id: string; data: Partial<CreatePlanRequest> }>({
    mutationFn: ({ id, data }) => authApi.updatePlan(id, data),
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
    mutationFn: authApi.deletePlan,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
      toast.success("Investment plan deleted successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete plan");
    },
  });
}
