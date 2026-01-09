"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface LoaderButtonProps extends ButtonProps {
  loading?: boolean;
  loadingText?: string;
}

const LoaderButton = React.forwardRef<HTMLButtonElement, LoaderButtonProps>(
  (
    { children, loading = false, loadingText, className, disabled, ...props },
    ref
  ) => {
    return (
      <Button
        ref={ref}
        disabled={loading || disabled}
        className={cn(className)}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {loading ? loadingText || children : children}
      </Button>
    );
  }
);

LoaderButton.displayName = "LoaderButton";

export { LoaderButton };
