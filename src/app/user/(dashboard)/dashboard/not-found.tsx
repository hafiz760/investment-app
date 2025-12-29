import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <div className="p-6 bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-full">
        <FileQuestion className="h-12 w-12 text-[#D4AF37]" />
      </div>
      <h2 className="text-2xl font-bold text-white">
        Dashboard Section Not Found
      </h2>
      <p className="text-gray-400 max-w-md">
        The dashboard section you are looking for doesn't exist or has been
        moved.
      </p>
      <Link href="/user/dashboard">
        <Button className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold">
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
