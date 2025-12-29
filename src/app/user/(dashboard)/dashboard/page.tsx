"use client";

import React from "react";
import {
  Megaphone,
  X,
  Wallet,
  TrendingUp,
  BadgeDollarSign,
  PieChart,
  Medal,
  ArrowDownToLine,
  ArrowUpFromLine,
  Ticket,
  Headphones,
  History,
  Calculator,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { cn } from "@/lib/utils";

const stats = [
  {
    label: "Balance",
    value: "$500.6",
    icon: Wallet,
    iconClass: "bg-blue-50 text-blue-600",
  },
  {
    label: "Profit Balance",
    value: "$74.71",
    icon: TrendingUp,
    iconClass: "bg-green-50 text-green-600",
  },
  {
    label: "Total Profit",
    value: "$15,240",
    icon: BadgeDollarSign,
    iconClass: "bg-indigo-50 text-indigo-600",
  },
  {
    label: "Total Invest",
    value: "$136,300",
    icon: PieChart,
    iconClass: "bg-purple-50 text-purple-600",
  },
  {
    label: "Current Badge",
    value: "Hyip Victor",
    icon: Medal,
    iconClass: "bg-yellow-50 text-yellow-600",
  },
  {
    label: "Total Deposit",
    value: "$11,978.47",
    icon: ArrowDownToLine,
    iconClass: "bg-teal-50 text-teal-600",
  },
  {
    label: "Total Payout",
    value: "$57.3",
    icon: ArrowUpFromLine,
    iconClass: "bg-orange-50 text-orange-600",
  },
  {
    label: "Total Ticket",
    value: "3",
    icon: Ticket,
    iconClass: "bg-rose-50 text-rose-600",
  },
];

const recentActivity = [
  {
    label: "Support",
    value: "0",
    icon: Headphones,
    iconClass: "bg-gray-50 text-gray-600",
  },
  {
    label: "Withdraw",
    value: "$0",
    icon: ArrowUpFromLine,
    iconClass: "bg-gray-50 text-gray-600",
  },
  {
    label: "Invest",
    value: "$500",
    icon: Calculator,
    iconClass: "bg-gray-50 text-gray-600",
  },
  {
    label: "Deposit",
    value: "$1,000",
    icon: Plus,
    iconClass: "bg-gray-50 text-gray-600",
  },
];

export default function DashboardPage() {
  const [showAttention, setShowAttention] = React.useState(true);

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
      </div>

      {/* Attention Alert */}
      {showAttention && (
        <div className="relative bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 shadow-2xl">
          <div className="p-4 bg-[#D4AF37]/10 rounded-full">
            <Megaphone className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-xl font-bold mb-1 text-white">Attention!</h3>
            <p className="text-gray-400">
              Please allow your browser to get instant push notification. Allow
              it from notification setting.
            </p>
          </div>
          <Button className="bg-[#4169E1] hover:bg-[#3152C3] text-white px-8 py-6 rounded-xl font-semibold shadow-lg shadow-blue-500/20">
            Allow me
          </Button>
          <button
            onClick={() => setShowAttention(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard
            key={stat.label}
            {...stat}
            iconClassName={stat.iconClass}
          />
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <History className="h-5 w-5 text-[#D4AF37]" />
          <h2 className="text-xl font-bold text-white">
            Recent Activity (7 Days)
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentActivity.map((activity) => (
            <div
              key={activity.label}
              className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 rounded-xl p-6 shadow-2xl flex items-center gap-4"
            >
              <div
                className={cn(
                  activity.iconClass,
                  "p-3 rounded-lg bg-opacity-10"
                )}
              >
                <activity.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">
                  {activity.value}
                </p>
                <p className="text-sm text-gray-400">{activity.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
