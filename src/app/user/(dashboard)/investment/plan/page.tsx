"use client";

import React from "react";
import { PricingCard } from "@/components/dashboard/PricingCard";

const plans = [
  {
    title: "STANDARD",
    price: "$500",
    period: "1 Year",
    features: [
      { label: "Return Period 5 Hour", included: true },
      { label: "Number of Return 25 Times", included: true },
      { label: "1 Days Maturity", included: true },
      { label: "5% Profit", included: true },
      { label: "No Capital Back", included: false },
    ],
  },
  {
    title: "PROFESSIONAL",
    price: "$300",
    period: "2 Month",
    features: [
      { label: "Return Period 1 Hour", included: true },
      { label: "Number of Return 12 Times", included: true },
      { label: "2 Days Maturity", included: true },
      { label: "$5 Profit", included: true },
      { label: "Capital Back", included: true },
    ],
  },
  {
    title: "STARTER",
    price: "$200",
    period: "6 Month",
    features: [
      { label: "Return Period 1 Month", included: true },
      { label: "Number of Return 6 Times", included: true },
      { label: "10 Days Maturity", included: true },
      { label: "5% Profit", included: true },
      { label: "Capital Back", included: true },
    ],
  },
  {
    title: "PREMIUM",
    price: "$1,000",
    period: "2 Year",
    features: [
      { label: "Return Period 1 Hour", included: true },
      { label: "Number of Return 25 Times", included: true },
      { label: "1 Days Maturity", included: true },
      { label: "10% Profit", included: true },
      { label: "No Capital Back", included: false },
    ],
  },
];

export default function InvestmentPlanPage() {
  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-[#D4AF37] font-medium">Investment Plan</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Investment Plan
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <PricingCard key={plan.title} {...plan} />
        ))}
      </div>
    </div>
  );
}
