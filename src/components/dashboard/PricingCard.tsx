"use client";

import React from "react";
import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingCardProps {
  title: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
}

export function PricingCard({
  title,
  price,
  period,
  features,
  isPopular,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        "bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl hover:border-[#D4AF37]/40 transition-all text-center group",
        isPopular && "ring-2 ring-[#D4AF37]"
      )}
    >
      <CardHeader className="pt-8">
        <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
          {title}
        </span>
        <div className="flex items-baseline justify-center gap-1 mt-4">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-gray-400 text-sm font-medium">/ {period}</span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 px-8 pb-8">
        <div className="space-y-3 pt-6 border-t border-white/10 font-medium">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 text-sm">
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
                className={feature.included ? "text-white" : "text-gray-500"}
              >
                {feature.label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pb-8 px-8">
        <Button className="w-full bg-[#D4AF37] hover:bg-[#B8962E] text-[#0F1C2E] py-6 rounded-lg font-bold transition-all shadow-lg hover:shadow-[#D4AF37]/20">
          Select plan
        </Button>
      </CardFooter>
    </Card>
  );
}
