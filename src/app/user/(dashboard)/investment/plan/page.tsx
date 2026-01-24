"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Check, X, Loader2, CreditCard, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  usePlans,
  usebuyPlan,
  useBuyPlanWithWallet,
} from "@/lib/hooks/usePlans";
import { useWalletBalance } from "@/lib/hooks/useWalletBalance";
import { buyPlanRequest } from "@/lib/types/plans";

export default function InvestmentPlanPage() {
  // ========== ALL HOOKS MUST BE CALLED UNCONDITIONALLY ==========
  // 1. All useState hooks
  const [showDialog, setShowDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  
  // 2. All router/navigation hooks
  const router = useRouter();
  
  // 3. All query hooks
  const { data: currentBalance = 0, isLoading: isLoadingBalance } = useWalletBalance();
  const { data: plans, isLoading, error } = usePlans();
  const buyPlanMutation = usebuyPlan();
  const buyPlanWalletMutation = useBuyPlanWithWallet();

  // 4. All useEffect hooks
  useEffect(() => {
    // Handle successful wallet purchase
    if (buyPlanWalletMutation.isSuccess && !showDialog) {
      const timer = setTimeout(() => {
        router.push("/user/dashboard?payment=success");
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [buyPlanWalletMutation.isSuccess, showDialog, router]);

  // 5. All useCallback hooks
  const handleInvestClick = useCallback((plan: any) => {
    setSelectedPlan(plan);
    setShowDialog(true);
  }, []);

  const handleDirectPayment = useCallback(async () => {
    if (!selectedPlan) return;

    const BASE_URL = process.env.NEXT_PUBLIC_APP_URL;
    const buyData: buyPlanRequest = {
      planId: selectedPlan.id,
      successUrl: `${BASE_URL}/user/dashboard?payment=success`,
      cancelUrl: `${BASE_URL}/user/dashboard?payment=cancelled`,
    };
    
    try {
      const response = await buyPlanMutation.mutateAsync(buyData);
      setShowDialog(false);
      // Handle redirect here to prevent hooks error
      if (response?.url) {
        window.location.href = response.url;
      }
    } catch (error) {
      setShowDialog(false);
    }
  }, [selectedPlan, buyPlanMutation]);

  const handleWalletPayment = useCallback(async () => {
    if (!selectedPlan) return;

    const planPrice = parseFloat(selectedPlan.price.replace("$", ""));

    if (currentBalance <= 0 || currentBalance < planPrice) {
      setShowDialog(false);
      setTimeout(() => {
        router.push("/user/deposit");
      }, 100);
      return;
    }

    try {
      await buyPlanWalletMutation.mutateAsync({ planId: selectedPlan.id });
      setShowDialog(false);
    } catch (error) {
      setShowDialog(false);
    }
  }, [selectedPlan, currentBalance, buyPlanWalletMutation, router]);

  // ========== DERIVED STATE (NO HOOKS AFTER THIS) ==========
  const isProcessing = buyPlanMutation.isPending || buyPlanWalletMutation.isPending;

  const transformedPlans = React.useMemo(() => {
    return plans?.map((plan) => ({
      id: plan.id,
      title: plan.name.toUpperCase(),
      price: `$${plan.price}`,
      period: "Flexible Investment",
      features: [
        { label: `Min Investment: $${plan.minInvestment}`, included: true },
        { label: `Max Investment: $${plan.maxInvestment}`, included: true },
        {
          label: `Monthly Return: ${plan.monthlyReturnMin}%-${plan.monthlyReturnMax}%`,
          included: true,
        },
        {
          label: `Annual Growth: ${plan.annualGrowthMin}%-${plan.annualGrowthMax}%`,
          included: true,
        },
        {
          label: `3-Year Growth: ${plan.threeYearGrowthMin}%-${plan.threeYearGrowthMax}%`,
          included: true,
        },
      ],
    })) || [];
  }, [plans]);

  const hasInsufficientBalance = React.useMemo(() => {
    return selectedPlan
      ? currentBalance < parseFloat(selectedPlan.price.replace("$", ""))
      : false;
  }, [selectedPlan, currentBalance]);

  // ========== RENDER (SINGLE RETURN STATEMENT) ==========
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
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

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37] mr-2" />
          <span className="text-gray-400">Loading plans...</span>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-red-400">Error loading plans</p>
        </div>
      ) : transformedPlans.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-400">No plans available</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {transformedPlans.map((plan) => (
            <Card
              key={plan.id}
              className="bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl hover:border-[#D4AF37]/40 transition-all text-center group"
            >
              <CardHeader className="pt-8">
                <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  {plan.title}
                </span>
                <div className="flex items-baseline justify-center gap-1 mt-4">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 text-sm font-medium">
                    / {plan.period}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 px-8 pb-8">
                <div className="space-y-3 pt-6 border-t border-white/10 font-medium">
                  {plan.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 text-sm"
                    >
                      {feature.included ? (
                        <div className="bg-[#D4AF37]/20 p-0.5 rounded-sm">
                          <Check className="h-3.5 w-3.5 text-[#D4AF37] stroke-3" />
                        </div>
                      ) : (
                        <div className="bg-red-500/20 p-0.5 rounded-sm">
                          <X className="h-3.5 w-3.5 text-red-400 stroke-3" />
                        </div>
                      )}
                      <span
                        className={
                          feature.included ? "text-white" : "text-gray-500"
                        }
                      >
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>

              <CardFooter className="pb-8 px-8">
                <Button
                  onClick={() => handleInvestClick(plan)}
                  disabled={isProcessing}
                  className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] py-6 rounded-lg font-bold transition-all shadow-lg hover:shadow-[#D4AF37]/20 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Invest Now"
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md bg-[#0F1C2E] border border-[#D4AF37]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-white">
              Choose Payment Method
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              Select how you would like to complete your investment
            </DialogDescription>
          </DialogHeader>

          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 mb-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-sm">Wallet Balance:</span>
              <span className="text-white font-bold text-lg">
                {isLoadingBalance ? "..." : `$${currentBalance.toFixed(2)}`}
              </span>
            </div>
            {hasInsufficientBalance && (
              <p className="text-red-400 text-xs mt-2">
                Insufficient balance. You'll be redirected to deposit page.
              </p>
            )}
          </div>

          <div className="grid gap-4 py-4">
            <Button
              onClick={handleDirectPayment}
              disabled={isProcessing}
              className="w-full h-auto py-6 px-6 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] text-white transition-all group disabled:opacity-50"
            >
              {buyPlanMutation.isPending ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
                  <span className="font-bold text-lg">Redirecting to Stripe...</span>
                </div>
              ) : (
                <div className="flex items-center gap-4 w-full">
                  <div className="bg-[#D4AF37] p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <CreditCard className="h-6 w-6 text-[#0F1C2E]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg">Direct Payment</span>
                    <span className="text-sm text-gray-400">Pay with Stripe</span>
                  </div>
                </div>
              )}
            </Button>

            <Button
              onClick={handleWalletPayment}
              disabled={isProcessing}
              className="w-full h-auto py-6 px-6 bg-[#D4AF37]/10 hover:bg-[#D4AF37]/20 border-2 border-[#D4AF37]/30 hover:border-[#D4AF37] text-white transition-all group disabled:opacity-50"
            >
              {buyPlanWalletMutation.isPending ? (
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-[#D4AF37]" />
                  <span className="font-bold text-lg">Processing Payment...</span>
                </div>
              ) : (
                <div className="flex items-center gap-4 w-full">
                  <div className="bg-[#D4AF37] p-3 rounded-lg group-hover:scale-110 transition-transform">
                    <Wallet className="h-6 w-6 text-[#0F1C2E]" />
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-lg">
                      {hasInsufficientBalance ? "Add Funds" : "Pay from Wallet"}
                    </span>
                    <span className="text-sm text-gray-400">
                      {hasInsufficientBalance
                        ? "Deposit to your wallet"
                        : "Use your wallet balance"}
                    </span>
                  </div>
                </div>
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
