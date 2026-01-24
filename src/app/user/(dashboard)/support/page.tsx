"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Loader2, MessageSquarePlus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { DataTablePagination } from "@/components/ui/pagination";
import { toast } from "sonner";
import {
  useCreateSupportTicket,
  useSupportTickets,
  useSupportTicket,
} from "@/lib/hooks/useSupport";
import {
  SupportTicket,
  SupportMessage,
  GetSupportTicketsQuery,
} from "@/lib/types/support";

// Zod validation schema
const supportTicketSchema = z.object({
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must be less than 100 characters"),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters"),
  email: z.string().email("Please enter a valid email address"),
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  priority: z.enum(["low", "medium", "high", "urgent"]).refine((val) => val, {
    message: "Please select a priority level",
  }),
});

type SupportTicketFormData = z.infer<typeof supportTicketSchema>;

function SupportStatusBadge({
  status,
}: {
  status: "open" | "assigned" | "in_progress" | "resolved" | "closed";
}) {
  const styles = {
    open: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    assigned: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    in_progress: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    resolved: "bg-green-500/10 text-green-500 border-green-500/20",
    closed: "bg-gray-500/10 text-gray-500 border-gray-500/20",
  };

  const displayText = {
    open: "Open",
    assigned: "Assigned",
    in_progress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
  };

  return (
    <Badge variant="outline" className={`capitalize ${styles[status]}`}>
      {displayText[status]}
    </Badge>
  );
}

function PriorityBadge({
  priority,
}: {
  priority: "low" | "medium" | "high" | "urgent";
}) {
  const styles = {
    low: "bg-gray-500/10 text-gray-400 border-gray-500/20",
    medium: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
    high: "bg-orange-500/10 text-orange-500 border-orange-500/20",
    urgent: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <Badge variant="outline" className={`capitalize ${styles[priority]}`}>
      {priority}
    </Badge>
  );
}

function SupportFilterSheet({
  query,
  onQueryChange,
}: {
  query: GetSupportTicketsQuery;
  onQueryChange: (query: GetSupportTicketsQuery) => void;
}) {
  const [statusValue, setStatusValue] = useState<string>(query.status || "all");
  const [priorityValue, setPriorityValue] = useState<string>(
    query.priority || "all",
  );
  const [startDate, setStartDate] = useState<string>(query.startDate || "");
  const [endDate, setEndDate] = useState<string>(query.endDate || "");

  const handleApply = () => {
    const filteredQuery: GetSupportTicketsQuery = {};

    if (statusValue !== "all") filteredQuery.status = statusValue as any;
    if (priorityValue !== "all") filteredQuery.priority = priorityValue as any;
    if (startDate) filteredQuery.startDate = startDate;
    if (endDate) filteredQuery.endDate = endDate;

    setCurrentPage(1);
    onQueryChange(filteredQuery);
  };

  const handleReset = () => {
    setStatusValue("all");
    setPriorityValue("all");
    setStartDate("");
    setEndDate("");
    onQueryChange({});
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-white/5 border-white/20 text-white hover:bg-white/10"
        >
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="bg-[#0F1C2E]/95 backdrop-blur-xl border-l border-[#D4AF37]/20 text-white sm:max-w-md p-0 overflow-hidden"
      >
        <SheetHeader className="p-6 border-b border-white/10 flex flex-row items-center justify-between">
          <SheetTitle className="text-xl font-bold text-white">
            Support Ticket Filters
          </SheetTitle>
        </SheetHeader>
        <div className="p-6 space-y-6">
          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">Status</Label>
            <Select value={statusValue} onValueChange={setStatusValue}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1C2E] border-white/20">
                <SelectItem
                  value="all"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  All Statuses
                </SelectItem>
                <SelectItem
                  value="open"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Open
                </SelectItem>
                <SelectItem
                  value="assigned"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Assigned
                </SelectItem>
                <SelectItem
                  value="in_progress"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  In Progress
                </SelectItem>
                <SelectItem
                  value="resolved"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Resolved
                </SelectItem>
                <SelectItem
                  value="closed"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Closed
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">
              Priority
            </Label>
            <Select value={priorityValue} onValueChange={setPriorityValue}>
              <SelectTrigger className="bg-white/5 border-white/10 text-white h-11">
                <SelectValue placeholder="All Priorities" />
              </SelectTrigger>
              <SelectContent className="bg-[#0F1C2E] border-white/20">
                <SelectItem
                  value="all"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  All Priorities
                </SelectItem>
                <SelectItem
                  value="low"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Low
                </SelectItem>
                <SelectItem
                  value="medium"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Medium
                </SelectItem>
                <SelectItem
                  value="high"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  High
                </SelectItem>
                <SelectItem
                  value="urgent"
                  className="text-white focus:bg-white/10 focus:text-white"
                >
                  Urgent
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">
              Start Date
            </Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-11"
            />
          </div>

          <div className="space-y-2.5">
            <Label className="text-gray-400 font-medium text-sm">
              End Date
            </Label>
            <Input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="bg-white/5 border-white/10 text-white h-11"
            />
          </div>

          <div className="pt-4 space-y-3">
            <Button
              className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] gap-2 font-semibold h-12"
              onClick={handleApply}
            >
              <Filter className="h-4 w-4" />
              Apply Filters
            </Button>
            <Button
              variant="outline"
              className="w-full border-gray-400 text-gray-800 bg-gray-100 hover:bg-gray-200 hover:border-gray-500 gap-2"
              onClick={handleReset}
            >
              Reset Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export default function SupportPage() {
  // State management
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<SupportTicket | null>(
    null,
  );
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [query, setQuery] = useState<GetSupportTicketsQuery>({
    limit: 50,
    offset: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);

  // Hooks
  const createTicketMutation = useCreateSupportTicket();
  const { data: ticketsResponse, isLoading, error } = useSupportTickets(query);
  const { data: ticketDetail, isLoading: isLoadingTicketDetail } =
    useSupportTicket(selectedTicket?.id || "");

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<SupportTicketFormData>({
    resolver: zodResolver(supportTicketSchema),
  });

  // Event handlers
  const onSubmit = useCallback(
    async (data: SupportTicketFormData) => {
      try {
        await createTicketMutation.mutateAsync(data);
        setShowCreateForm(false);
        reset();
      } catch (error) {
        // Error handled by mutation
      }
    },
    [createTicketMutation, reset],
  );

  const handleRowClick = useCallback((ticket: SupportTicket) => {
    setSelectedTicket(ticket);
    setIsDetailDialogOpen(true);
  }, []);

  const handleQueryChange = useCallback((newQuery: GetSupportTicketsQuery) => {
    // Always include pagination defaults
    setQuery({
      ...newQuery,
      limit: 50,
      offset: 0,
    });
    setCurrentPage(1);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
    setQuery((prev) => ({
      ...prev,
      offset: (page - 1) * 50,
    }));
  }, []);

  // Format date helper
  const formatDate = useCallback((dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  // Memoized tickets
  const tickets = useMemo(
    () => ticketsResponse?.tickets || [],
    [ticketsResponse],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
        <span className="ml-2 text-gray-400">Loading support tickets...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-gray-400">
        Failed to load support tickets
      </div>
    );
  }

  return (
    <>
      <div className="space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-[#D4AF37] font-medium">Support</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            Support Center
          </h1>
        </div>

        {/* Create Ticket Button */}
        <div className="flex justify-end">
          <Button
            onClick={() => setShowCreateForm(true)}
            className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] gap-2"
          >
            <MessageSquarePlus className="h-4 w-4" />
            Create Support Ticket
          </Button>
        </div>

        {/* Tickets Table */}
        <div className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-4 flex justify-end border-b border-white/10">
            <SupportFilterSheet
              query={query}
              onQueryChange={handleQueryChange}
            />
          </div>

          <Table>
            <TableHeader>
              <TableRow className="bg-white/5 border-white/10 hover:bg-white/5">
                <TableHead className="text-gray-300">SL</TableHead>
                <TableHead className="text-gray-300">SUBJECT</TableHead>
                <TableHead className="text-gray-300">STATUS</TableHead>
                <TableHead className="text-gray-300">PRIORITY</TableHead>
                <TableHead className="text-gray-300">RESPONSES</TableHead>
                <TableHead className="text-gray-300">CREATED DATE</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {tickets.length > 0 ? (
                tickets.map((ticket, index) => (
                  <TableRow
                    key={ticket.id}
                    className="border-white/10 hover:bg-white/5 transition-colors cursor-pointer"
                    onClick={() => handleRowClick(ticket)}
                  >
                    <TableCell className="text-gray-300">{index + 1}</TableCell>

                    <TableCell className="text-white font-medium">
                      {ticket.subject}
                    </TableCell>

                    <TableCell>
                      <SupportStatusBadge status={ticket.status} />
                    </TableCell>

                    <TableCell>
                      <PriorityBadge priority={ticket.priority} />
                    </TableCell>

                    <TableCell className="text-gray-300">
                      {ticket.responseCount}
                    </TableCell>

                    <TableCell className="text-gray-300">
                      {formatDate(ticket.createdAt)}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-10 text-gray-400"
                  >
                    No support tickets found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {ticketsResponse?.pagination && (
          <DataTablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(ticketsResponse.pagination.total / 50)}
            onPageChange={handlePageChange}
            totalItems={ticketsResponse.pagination.total}
            itemsPerPage={50}
          />
        )}
      </div>

      {/* Create Ticket Dialog */}
      <Dialog open={showCreateForm} onOpenChange={setShowCreateForm}>
        <DialogContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
              Create Support Ticket
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Submit a support request and we'll get back to you as soon as
              possible.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-300">
                  Full Name *
                </Label>
                <Input
                  id="name"
                  {...register("name")}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="priority" className="text-gray-300">
                Priority Level *
              </Label>
              <Select
                onValueChange={(value) => setValue("priority", value as any)}
              >
                <SelectTrigger className="bg-white/5 border-white/10 text-white">
                  <SelectValue placeholder="Select priority level" />
                </SelectTrigger>
                <SelectContent className="bg-[#0F1C2E] border-white/20">
                  <SelectItem
                    value="low"
                    className="text-white focus:bg-white/10 focus:text-white"
                  >
                    Low - General inquiry
                  </SelectItem>
                  <SelectItem
                    value="medium"
                    className="text-white focus:bg-white/10 focus:text-white"
                  >
                    Medium - Issue affecting functionality
                  </SelectItem>
                  <SelectItem
                    value="high"
                    className="text-white focus:bg-white/10 focus:text-white"
                  >
                    High - Major issue
                  </SelectItem>
                  <SelectItem
                    value="urgent"
                    className="text-white focus:bg-white/10 focus:text-white"
                  >
                    Urgent - Critical issue
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.priority && (
                <p className="text-sm text-red-500">
                  {errors.priority.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject" className="text-gray-300">
                Subject *
              </Label>
              <Input
                id="subject"
                {...register("subject")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600"
                placeholder="Brief description of your issue"
              />
              {errors.subject && (
                <p className="text-sm text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-gray-300">
                Description *
              </Label>
              <Textarea
                id="description"
                {...register("description")}
                className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 min-h-32"
                placeholder="Please provide detailed information about your issue..."
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="border-gray-400 text-gray-800 bg-gray-100 hover:bg-gray-200 hover:border-gray-500"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createTicketMutation.isPending}
                className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] gap-2"
              >
                {createTicketMutation.isPending && (
                  <Loader2 className="h-4 w-4 animate-spin" />
                )}
                Submit Ticket
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
              Support Ticket Details
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Complete information about this support ticket
            </DialogDescription>
          </DialogHeader>

          {isLoadingTicketDetail ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37] mr-2" />
              <span className="text-gray-400">Loading ticket details...</span>
            </div>
          ) : ticketDetail ? (
            <div className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Subject</p>
                  <p className="text-white font-semibold text-lg">
                    {ticketDetail.subject}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Status</p>
                  <div>
                    <SupportStatusBadge status={ticketDetail.status} />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Priority</p>
                  <div>
                    <PriorityBadge priority={ticketDetail.priority} />
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Assigned To</p>
                  <p className="text-white">
                    {ticketDetail.assignedToId || "Not assigned"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Response Count</p>
                  <p className="text-white">{ticketDetail.responseCount}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Name</p>
                  <p className="text-white">{ticketDetail.name}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Email</p>
                  <p className="text-white">{ticketDetail.email}</p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Is Active</p>
                  <p
                    className={`text-sm ${ticketDetail.isActive ? "text-green-500" : "text-red-500"}`}
                  >
                    {ticketDetail.isActive ? "Active" : "Inactive"}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Created At</p>
                  <p className="text-white">
                    {formatDate(ticketDetail.createdAt)}
                  </p>
                </div>

                <div className="space-y-1">
                  <p className="text-sm text-gray-400">Updated At</p>
                  <p className="text-white">
                    {formatDate(ticketDetail.updatedAt)}
                  </p>
                </div>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4">
                <p className="text-sm text-gray-400">Description</p>
                <div className="bg-white/5 rounded-lg p-4">
                  <p className="text-white whitespace-pre-wrap">
                    {ticketDetail.description}
                  </p>
                </div>
              </div>

              {ticketDetail.messages && ticketDetail.messages.length > 0 && (
                <div className="space-y-2 border-t border-white/10 pt-4">
                  <p className="text-sm text-gray-400">
                    Messages ({ticketDetail.messages.length})
                  </p>
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {ticketDetail.messages.map((message: any, index: any) => (
                      <div
                        key={message.id || index}
                        className={`p-4 rounded-lg ${
                          message.isFromAdmin
                            ? "bg-[#D4AF37]/10 border border-[#D4AF37]/20"
                            : "bg-white/5 border border-white/10"
                        }`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <span className="text-sm font-medium text-gray-400">
                            {message.isFromAdmin
                              ? message.adminName || "Support Agent"
                              : "You"}
                          </span>
                          <span className="text-xs text-gray-500">
                            {formatDate(message.createdAt)}
                          </span>
                        </div>
                        <p className="text-white whitespace-pre-wrap">
                          {message.message}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">Ticket details not found</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
