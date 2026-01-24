"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { ApiError } from "../types/error";
import {
  SupportTicket,
  CreateSupportTicketRequest,
  GetSupportTicketsQuery,
  SupportTicketsResponse,
} from "../types/support";
import { supportApi } from "../api/support.api";

export function useCreateSupportTicket() {
  const queryClient = useQueryClient();
  return useMutation<SupportTicket, ApiError, CreateSupportTicketRequest>({
    mutationFn: supportApi.createTicket,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["support-tickets"] });
      toast.success("Support ticket created successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to create support ticket");
    },
  });
}

export function useSupportTickets(query?: GetSupportTicketsQuery) {
  return useQuery<SupportTicketsResponse, ApiError>({
    queryKey: ["support-tickets", query],
    queryFn: () => supportApi.getTickets(query),
  });
}

export function useSupportTicket(ticketId: string) {
  return useQuery<SupportTicket, ApiError>({
    queryKey: ["support-ticket", ticketId],
    queryFn: () => supportApi.getTicket(ticketId),
    enabled: !!ticketId,
  });
}
