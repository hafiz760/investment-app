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
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { cn } from "@/lib/utils";
import { useWalletTransactions, useWalletDetails } from "@/lib/hooks/useWallet";
import { useUserPurchases } from "@/lib/hooks/usePurchases";
import { WalletTransaction } from "@/lib/types/wallet";
import { Purchase } from "@/lib/types/purchse";

export default function DashboardPage() {
  const [showAttention, setShowAttention] = React.useState(true);
  const { data: walletData, isLoading: isLoadingWallet } =
    useWalletTransactions();
  const { data: walletDetails, isLoading: isLoadingWalletDetails } =
    useWalletDetails();
  const { data: purchasesData, isLoading: isLoadingPurchases } =
    useUserPurchases();

  const totalDeposit = React.useMemo(() => {
    if (
      !walletData ||
      !walletData.transactions ||
      !Array.isArray(walletData.transactions)
    ) {
      return 0;
    }
    return walletData.transactions
      .filter((transaction: WalletTransaction) => transaction.type === "credit")
      .reduce(
        (acc: number, transaction: WalletTransaction) =>
          acc + transaction.amount,
        0,
      );
  }, [walletData]);

  const totalInvest = React.useMemo(() => {
    if (!purchasesData?.purchases || purchasesData.purchases.length === 0)
      return 0;
    return purchasesData.purchases.reduce(
      (acc: number, purchase: Purchase) => acc + purchase.amount,
      0,
    );
  }, [purchasesData]);

  const totalTransactions = purchasesData?.purchases?.length || 0;

  const recentDeposit = React.useMemo(() => {
    if (!walletData || !Array.isArray(walletData.transactions)) return 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return walletData.transactions
      .filter((transaction: WalletTransaction) => {
        const transactionDate = new Date(transaction.createdAt);
        return transaction.type === "credit" && transactionDate >= sevenDaysAgo;
      })
      .reduce(
        (acc: number, transaction: WalletTransaction) =>
          acc + transaction.amount,
        0,
      );
  }, [walletData]);

  const recentInvest = React.useMemo(() => {
    if (!purchasesData?.purchases || purchasesData.purchases.length === 0)
      return 0;
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return purchasesData.purchases
      .filter((purchase: any) => {
        const purchaseDate = new Date(purchase.createdAt);
        return purchaseDate >= sevenDaysAgo;
      })
      .reduce((acc: number, purchase: any) => acc + purchase.amount, 0);
  }, [purchasesData]);

  const stats = [
    {
      label: "Balance",
      value: `$${walletDetails?.balance.toFixed(2) ?? "0.00"}`,
      icon: Wallet,
      iconClassName: "bg-blue-50 text-blue-600",
      isLoading: isLoadingWalletDetails,
    },
    {
      label: "Profit Balance",
      value: "$74.71",
      icon: TrendingUp,
      iconClassName: "bg-green-50 text-green-600",
      isLoading: false,
    },
    {
      label: "Total Profit",
      value: "$15,240",
      icon: BadgeDollarSign,
      iconClassName: "bg-indigo-50 text-indigo-600",
      isLoading: false,
    },
    {
      label: "Total Invest",
      value: `$${totalInvest.toFixed(2)}`,
      icon: PieChart,
      iconClassName: "bg-purple-50 text-purple-600",
      isLoading: isLoadingPurchases,
    },
    {
      label: "Current Badge",
      value: "Hyip Victor",
      icon: Medal,
      iconClassName: "bg-yellow-50 text-yellow-600",
      isLoading: false,
    },
    {
      label: "Total Deposit",
      value: `$${totalDeposit.toFixed(2)}`,
      icon: ArrowDownToLine,
      iconClassName: "bg-teal-50 text-teal-600",
      isLoading: isLoadingWallet,
    },
    {
      label: "Total Payout",
      value: "$57.3",
      icon: ArrowUpFromLine,
      iconClassName: "bg-orange-50 text-orange-600",
      isLoading: false,
    },
    {
      label: "Total Ticket",
      value: "3",
      icon: Ticket,
      iconClassName: "bg-rose-50 text-rose-600",
      isLoading: false,
    },
  ];

  const recentActivity = [
    {
      label: "Support",
      value: "0",
      icon: Headphones,
      iconClassName: "bg-gray-50 text-gray-600",
      isLoading: false,
    },
    {
      label: "Withdraw",
      value: "$0",
      icon: ArrowUpFromLine,
      iconClassName: "bg-gray-50 text-gray-600",
      isLoading: false,
    },
    {
      label: "Invest",
      value: `$${recentInvest.toFixed(2)}`,
      icon: Calculator,
      iconClassName: "bg-gray-50 text-gray-600",
      isLoading: isLoadingPurchases,
    },
    {
      label: "Deposit",
      value: `$${recentDeposit.toFixed(2)}`,
      icon: Plus,
      iconClassName: "bg-gray-50 text-gray-600",
      isLoading: isLoadingWallet,
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Dashboard
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
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
                  activity.iconClassName,
                  "p-3 rounded-lg bg-opacity-10",
                )}
              >
                <activity.icon className="h-5 w-5" />
              </div>
              <div className="flex-1">
                {activity.isLoading ? (
                  <div className="flex items-center gap-2">
                    <Loader2 className="h-5 w-5 animate-spin text-[#D4AF37]" />
                    <p className="text-sm text-gray-400">Loading...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-2xl font-bold text-white">
                      {activity.value}
                    </p>
                    <p className="text-sm text-gray-400">{activity.label}</p>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
