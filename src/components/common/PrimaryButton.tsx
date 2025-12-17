import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

export default function PrimaryButton({ 
  children, 
  size = "lg", 
  className = "",
  ...props 
}: PrimaryButtonProps) {
  return (
    <Button
      size={size}
      className={`bg-[#D4AF37] text-[#0F1C2E] hover:bg-[#C4A037] font-semibold border-0 ${className}`}
      {...props}
    >
      {children}
    </Button>
  );
}

