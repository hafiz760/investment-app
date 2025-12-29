"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const paymentMethods = [
  {
    id: "stripe",
    name: "Stripe",
    image: "/images/payments/stripe.png",
    description:
      "Send form your payment gateway. your bank may charge you a cash advance fee.",
  },
  {
    id: "bank",
    name: "Bank Transfer",
    image: "/images/payments/bank.png",
    description:
      "Send form your payment gateway. your bank may charge you a cash advance fee.",
  },
  {
    id: "razorpay",
    name: "RazorPay",
    image: "/images/payments/razorpay.png",
    description:
      "Send form your payment gateway. your bank may charge you a cash advance fee.",
  },
  {
    id: "midtrans",
    name: "Midtrans",
    image: "/images/payments/midtrans.png",
    description:
      "Send form your payment gateway. your bank may charge you a cash advance fee.",
  },
];

export default function DepositPage() {
  const [selectedMethod, setSelectedMethod] = React.useState("stripe");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Deposit</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Deposit
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white">
                Select Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-6 p-6 rounded-xl border transition-all cursor-pointer relative overflow-hidden",
                    selectedMethod === method.id
                      ? "border-[#D4AF37]/50 bg-[#D4AF37]/5 ring-1 ring-[#D4AF37]/20"
                      : "hover:border-white/20 border-white/10"
                  )}
                >
                  {selectedMethod === method.id && (
                    <div className="absolute top-0 right-0 w-1 h-full bg-[#D4AF37]" />
                  )}
                  <div className="h-16 w-16 bg-white/5 border border-white/10 rounded-full flex items-center justify-center overflow-hidden shrink-0 shadow-2xl p-2">
                    {/* Placeholder for real logos */}
                    <div className="flex items-center justify-center font-bold text-xs text-[#D4AF37] bg-[#D4AF37]/10 w-full h-full rounded-full">
                      {method.name.charAt(0)}
                    </div>
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-lg font-bold mb-1 text-white">
                      {method.name}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {method.description}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Payment Summary Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl sticky top-40 overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white">
                Payment Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Select Currency
                </label>
                <Select>
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-lg text-white">
                    <SelectValue placeholder="Select Currency" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white">
                    <SelectItem value="usd">USD</SelectItem>
                    <SelectItem value="eur">EUR</SelectItem>
                    <SelectItem value="gbp">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Enter Amount
                </label>
                <Input
                  placeholder="Enter amount"
                  className="h-12 bg-white/5 border-white/10 rounded-lg text-white placeholder:text-gray-500"
                />
              </div>

              <Button className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] py-8 rounded-lg font-bold text-lg shadow-lg shadow-[#D4AF37]/10 transition-all">
                Make Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
