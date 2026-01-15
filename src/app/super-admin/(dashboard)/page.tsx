"use client";

import React from "react";
import {
  Users,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import {
  UserGrowthChart,
  PaymentActivityChart,
} from "@/components/admin/AdminCharts";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { usePlans } from "@/lib/hooks/usePlans";
import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Super Admin Overview
        </h1>
        <p className="text-gray-400 mt-1">
          Complete platform control and management metrics.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Users"
          value="2,543"
          icon={<Users className="h-5 w-5 text-[#D4AF37]" />}
          trend={{ value: "12.5%", isPositive: true }}
        />
        <StatsCard
          title="Active Investments"
          value="$1.2M"
          icon={<TrendingUp className="h-5 w-5 text-[#D4AF37]" />}
          trend={{ value: "8.2%", isPositive: true }}
        />
        <StatsCard
          title="Revenue"
          value="$458,230"
          icon={<Wallet className="h-5 w-5 text-[#D4AF37]" />}
          trend={{ value: "4.1%", isPositive: false }}
        />
        <StatsCard
          title="Pending KYC"
          value="18"
          icon={<ShieldCheck className="h-5 w-5 text-[#D4AF37]" />}
          trend={{ value: "Refresh", isPositive: true }}
        />
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-white font-bold text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
                User Growth Analytics
              </h3>
              <p className="text-gray-500 text-xs mt-1">
                Visualizing platform expansion over the current year.
              </p>
            </div>
            <select className="bg-white/5 border-[#D4AF37]/10 text-xs text-gray-400 rounded-lg px-3 py-2 focus:outline-none focus:border-[#D4AF37]/40">
              <option>Last 12 Months</option>
              <option>Last 6 Months</option>
            </select>
          </div>
          <UserGrowthChart />
        </div>

        <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-8 shadow-2xl flex flex-col h-full">
          <div className="mb-8">
            <h3 className="text-white font-bold text-lg flex items-center gap-2">
              <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
              Weekly Volume
            </h3>
            <p className="text-gray-500 text-xs mt-1">
              Transaction activity for the past 7 days.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center">
            <PaymentActivityChart />
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-6">
          <h3 className="text-white font-semibold mb-6 flex items-center justify-between">
            Recent Activity
            <button className="text-[10px] text-[#D4AF37] uppercase tracking-wider hover:underline">
              View All
            </button>
          </h3>
          <div className="space-y-6">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                  <span className="text-[10px] font-bold text-[#D4AF37]">
                    U{i}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white font-medium truncate">
                    New user registration
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#0F1C2E]/60 border border-[#D4AF37]/20 backdrop-blur-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#D4AF37]" />
              Active Investment Plans
            </h3>
            <Link 
              href="/super-admin/plans" 
              className="text-[10px] text-[#D4AF37] uppercase tracking-wider hover:underline"
            >
              Manage Plans
            </Link>
          </div>
          
          <div className="space-y-4">
            <PlansOverviewList />
          </div>
        </div>
      </div>
    </div>
  );
}
function PlansOverviewList() {
  const { data: plans, isLoading } = usePlans();
  
  if (isLoading) return <div className="text-gray-500 text-sm">Loading plans...</div>;
  if (!plans?.length) return <div className="text-gray-500 text-sm italic">No investment plans configured yet.</div>;

  return (
    <div className="grid gap-3">
      {plans.filter(p => p.isActive).slice(0, 4).map((plan) => (
        <div key={plan.id} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#D4AF37]/20 transition-all">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{plan.name}</p>
            <p className="text-[10px] text-gray-400">
              Return: {plan.monthlyReturnMin}%-{plan.monthlyReturnMax}%
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-[#D4AF37] font-bold">${plan.minInvestment.toLocaleString()}+</p>
          </div>
        </div>
      ))}
    </div>
  );
}
