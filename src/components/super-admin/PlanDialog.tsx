"use client";

import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { InvestmentPlan, CreatePlanRequest } from "@/lib/types/auth";
import { useCreatePlan, useUpdatePlan } from "@/lib/hooks/usePlans";
import { useForm } from "react-hook-form";

export function PlanDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: InvestmentPlan | null;
}) {
  const createMutation = useCreatePlan();
  const updateMutation = useUpdatePlan();

  const { register, handleSubmit, reset, setValue, watch } = useForm<CreatePlanRequest>({
    defaultValues: {
      name: "",
      minInvestment: 0,
      maxInvestment: 0,
      monthlyReturnMin: 0,
      monthlyReturnMax: 0,
      annualGrowthMin: 0,
      annualGrowthMax: 0,
      threeYearGrowthMin: 0,
      threeYearGrowthMax: 0,
      isActive: true,
    },
  });

  const isActive = watch("isActive");

  useEffect(() => {
    if (plan) {
      reset({
        name: plan.name,
        minInvestment: plan.minInvestment,
        maxInvestment: plan.maxInvestment,
        monthlyReturnMin: plan.monthlyReturnMin,
        monthlyReturnMax: plan.monthlyReturnMax,
        annualGrowthMin: plan.annualGrowthMin,
        annualGrowthMax: plan.annualGrowthMax,
        threeYearGrowthMin: plan.threeYearGrowthMin,
        threeYearGrowthMax: plan.threeYearGrowthMax,
        isActive: plan.isActive,
      });
    } else {
      reset({
        name: "",
        minInvestment: 1000,
        maxInvestment: 10000,
        monthlyReturnMin: 3,
        monthlyReturnMax: 5,
        annualGrowthMin: 7,
        annualGrowthMax: 10,
        threeYearGrowthMin: 25,
        threeYearGrowthMax: 35,
        isActive: true,
      });
    }
  }, [plan, reset, open]);

  const onSubmit = async (values: CreatePlanRequest) => {
    // Convert string inputs to numbers
    const payload = {
      ...values,
      minInvestment: Number(values.minInvestment),
      maxInvestment: Number(values.maxInvestment),
      monthlyReturnMin: Number(values.monthlyReturnMin),
      monthlyReturnMax: Number(values.monthlyReturnMax),
      annualGrowthMin: Number(values.annualGrowthMin),
      annualGrowthMax: Number(values.annualGrowthMax),
      threeYearGrowthMin: Number(values.threeYearGrowthMin),
      threeYearGrowthMax: Number(values.threeYearGrowthMax),
    };

    try {
      if (plan) {
        await updateMutation.mutateAsync({ id: plan.id, data: payload });
      } else {
        await createMutation.mutateAsync(payload);
      }
      onOpenChange(false);
    } catch (error) {
      // Error handled by mutation
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-[#0F1C2E] border-[#D4AF37]/20 text-white overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#D4AF37]">
            {plan ? "Edit Investment Plan" : "Create New Plan"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="name">Plan Name</Label>
              <Input
                id="name"
                {...register("name", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
                placeholder="e.g. Basic Growth Plan"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="minInvestment">Min Investment ($)</Label>
              <Input
                id="minInvestment"
                type="number"
                {...register("minInvestment", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="maxInvestment">Max Investment ($)</Label>
              <Input
                id="maxInvestment"
                type="number"
                {...register("maxInvestment", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyReturnMin">Monthly Return Min (%)</Label>
              <Input
                id="monthlyReturnMin"
                type="number"
                step="0.1"
                {...register("monthlyReturnMin", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="monthlyReturnMax">Monthly Return Max (%)</Label>
              <Input
                id="monthlyReturnMax"
                type="number"
                step="0.1"
                {...register("monthlyReturnMax", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualGrowthMin">Annual Growth Min (%)</Label>
              <Input
                id="annualGrowthMin"
                type="number"
                step="0.1"
                {...register("annualGrowthMin", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="annualGrowthMax">Annual Growth Max (%)</Label>
              <Input
                id="annualGrowthMax"
                type="number"
                step="0.1"
                {...register("annualGrowthMax", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="threeYearGrowthMin">3-Year Growth Min (%)</Label>
              <Input
                id="threeYearGrowthMin"
                type="number"
                step="0.1"
                {...register("threeYearGrowthMin", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="threeYearGrowthMax">3-Year Growth Max (%)</Label>
              <Input
                id="threeYearGrowthMax"
                type="number"
                step="0.1"
                {...register("threeYearGrowthMax", { required: true })}
                className="bg-white/5 border-[#D4AF37]/20 focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5 md:col-span-2">
              <div className="space-y-0.5">
                <Label className="text-white">Active Status</Label>
                <p className="text-xs text-gray-500 italic">Toggle whether this plan is available for investment.</p>
              </div>
              <Switch
                checked={isActive}
                onCheckedChange={(checked) => setValue("isActive", checked)}
                className="data-[state=checked]:bg-[#D4AF37]"
              />
            </div>
          </div>

          <DialogFooter className="pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="text-gray-400 hover:text-white"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createMutation.isPending || updateMutation.isPending}
              className="bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] font-bold px-8 shadow-[0_0_20px_rgba(212,175,55,0.2)]"
            >
              {plan ? "Update Plan" : "Create Plan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
