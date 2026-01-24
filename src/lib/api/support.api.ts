import apiClient from "./client.api";
import {
  SupportTicket,
  CreateSupportTicketRequest,
  GetSupportTicketsQuery,
  SupportTicketsResponse,
} from "../types/support";

export const supportApi = {
  createTicket: async (
    data: CreateSupportTicketRequest,
  ): Promise<SupportTicket> => {
    const response = await apiClient.post<SupportTicket>("/support", data);
    return response.data;
  },

  getTickets: async (
    query?: GetSupportTicketsQuery,
  ): Promise<SupportTicketsResponse> => {
    const params = new URLSearchParams();

    if (query?.status) params.append("status", query.status);
    if (query?.priority) params.append("priority", query.priority);
    if (query?.limit) params.append("limit", query.limit.toString());
    if (query?.offset) params.append("offset", query.offset.toString());
    if (query?.startDate) params.append("startDate", query.startDate);
    if (query?.endDate) params.append("endDate", query.endDate);

    const url = `/support/user${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await apiClient.get<SupportTicketsResponse>(url);
    return response.data;
  },

  getTicket: async (ticketId: string): Promise<SupportTicket> => {
    const response = await apiClient.get<SupportTicket>(`/support/${ticketId}`);
    return response.data;
  },
};
