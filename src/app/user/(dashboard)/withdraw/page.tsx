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

const withdrawMethods = [
  {
    id: "bank",
    name: "Bank Transfer",
    description: "Payment will receive within 9 hours",
  },
  {
    id: "flutterwave",
    name: "Flutterwave",
    description: "Payment will receive within 1 days",
  },
  {
    id: "razorpay",
    name: "Razorpay",
    description: "Payment will receive within 1 days",
  },
  {
    id: "paystack",
    name: "Paystack",
    description: "Payment will receive within 1 days",
  },
  {
    id: "coinbase",
    name: "Coinbase",
    description: "Payment will receive within 1 days",
  },
];

export default function WithdrawPage() {
  const [selectedMethod, setSelectedMethod] = React.useState("bank");

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Withdraw</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Withdraw
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Withdraw Methods */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white">
                Select Withdraw Method
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              {withdrawMethods.map((method) => (
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

        {/* Withdraw Summary Sidebar */}
        <div className="space-y-6">
          <Card className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl sticky top-40 overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/10">
              <CardTitle className="text-base font-bold text-white">
                Withdraw Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-300">
                  Balance Type
                </label>
                <Select defaultValue="wallet">
                  <SelectTrigger className="h-12 bg-white/5 border-white/10 rounded-lg text-white">
                    <SelectValue placeholder="Select Balance" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#0F1C2E] border-[#D4AF37]/20 text-white">
                    <SelectItem value="wallet">
                      Wallet Balance - $500.6
                    </SelectItem>
                    <SelectItem value="profit">
                      Profit Balance - $74.71
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

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

              <Button className="w-full bg-[#0F1C2E] hover:bg-[#1a2d46] text-white py-8 rounded-lg font-bold text-lg border border-[#D4AF37]/20 shadow-lg transition-all">
                Withdraw
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
