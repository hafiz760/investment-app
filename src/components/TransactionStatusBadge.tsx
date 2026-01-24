import { Badge } from "@/components/ui/badge";

export function TransactionStatusBadge({
  status,
}: {
  status: "pending" | "completed" | "failed";
}) {
  const statusStyles = {
    completed: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    failed: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  };

  return (
    <Badge variant="outline" className={`capitalize ${statusStyles[status]}`}>
      {status}
    </Badge>
  );
}
