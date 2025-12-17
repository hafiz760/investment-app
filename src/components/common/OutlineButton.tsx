import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface OutlineButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function OutlineButton({ 
  children, 
  size = "lg", 
  className = "",
  ...props 
}: OutlineButtonProps) {
  return (
    <Button
      size={size}
      variant="outline"
      className={`border-2 border-[#D4AF37]/50 bg-transparent text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] font-semibold ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

