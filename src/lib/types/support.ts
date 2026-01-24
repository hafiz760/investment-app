export interface SupportTicket {
  id: string;
  subject: string;
  description: string;
  email: string;
  name: string;
  priority: "low" | "medium" | "high" | "urgent";
  status: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  userId: string | null;
  responseCount: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  messages: SupportMessage[];
  assignedToId: string | null;
}

export interface SupportMessage {
  id: string;
  message: string;
  isFromAdmin: boolean;
  createdAt: string;
  adminName?: string;
}

export interface CreateSupportTicketRequest {
  subject: string;
  description: string;
  email: string;
  name: string;
  priority: "low" | "medium" | "high" | "urgent";
}

export interface GetSupportTicketsQuery {
  status?: "open" | "assigned" | "in_progress" | "resolved" | "closed";
  priority?: "low" | "medium" | "high" | "urgent";
  limit?: number;
  offset?: number;
  startDate?: string;
  endDate?: string;
}

export interface SupportTicketsResponse {
  tickets: SupportTicket[];
  pagination: {
    total: number;
    limit: number;
    offset: number;
    hasMore: boolean;
  };
}

export interface SupportTicketResponse {
  ticket: SupportTicket;
}

