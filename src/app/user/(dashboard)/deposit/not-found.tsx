import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="p-6 bg-muted rounded-full">
        <FileQuestion className="h-12 w-12 text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-bold">Dashboard Section Not Found</h2>
      <p className="text-muted-foreground max-w-md">
        The dashboard section you are looking for doesn't exist or has been
        moved.
      </p>
      <Link href="/user/dashboard">
        <Button>Back to Dashboard</Button>
      </Link>
    </div>
  );
}
