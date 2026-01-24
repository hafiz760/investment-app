"use client";

import React from "react";
import { CreditCard, Wallet } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface InvestmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDirectPayment: () => void;
  onWalletPayment: () => void;
  isProcessing: boolean;
}

export function InvestmentDialog({
  open,
  onOpenChange,
  onDirectPayment,
  onWalletPayment,
  isProcessing,
}: InvestmentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-[#0F1C2E] border border-[#D4AF37]/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-white">
            Choose Payment Method
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Select how you would like to complete your investment
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <Button
            onClick={onDirectPayment}
            disabled={isProcessing}
            className="w-full h-auto py-6 px-6 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] text-white transition-all group"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="bg-[#D4AF37] p-3 rounded-lg group-hover:scale-110 transition-transform">
                <CreditCard className="h-6 w-6 text-[#0F1C2E]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">Direct Payment</span>
                <span className="text-sm text-gray-400">Pay with Stripe</span>
              </div>
            </div>
          </Button>

          {/* Wallet Payment Option */}
          <Button
            onClick={onWalletPayment}
            disabled={isProcessing}
            className="w-full h-auto py-6 px-6 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] text-white transition-all group"
          >
            <div className="flex items-center gap-4 w-full">
              <div className="bg-[#D4AF37] p-3 rounded-lg group-hover:scale-110 transition-transform">
                <Wallet className="h-6 w-6 text-[#0F1C2E]" />
              </div>
              <div className="flex flex-col items-start">
                <span className="font-bold text-lg">Pay from Wallet</span>
                <span className="text-sm text-gray-400">
                  Use your wallet balance
                </span>
              </div>
            </div>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
