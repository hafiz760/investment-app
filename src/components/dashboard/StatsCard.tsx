"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label?: string;
  title?: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
  iconClassName?: string;
}

export function StatsCard({
  label,
  title,
  value,
  icon: IconOrElement,
  trend,
  className,
  iconClassName,
}: StatsCardProps) {
  const displayLabel = title || label;

  return (
    <Card
      className={cn(
        "overflow-hidden bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl hover:border-[#D4AF37]/40 transition-all group",
        className
      )}
    >
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div
            className={cn(
              "p-3 rounded-xl transition-all group-hover:scale-110",
              iconClassName || "bg-[#D4AF37]/10 text-[#D4AF37]"
            )}
          >
            {typeof IconOrElement === "function"
              ? React.createElement(IconOrElement as React.ElementType, {
                  className: "h-6 w-6",
                })
              : IconOrElement}
          </div>
          {trend && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full",
                trend.isPositive
                  ? "bg-green-500/10 text-green-400"
                  : "bg-red-500/10 text-red-400"
              )}
            >
              <span className="text-[10px] tracking-wider uppercase font-bold">
                {trend.value}
              </span>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <p className="text-2xl font-bold tracking-tight text-white">
            {value}
          </p>
          <span className="text-sm font-medium text-gray-400">
            {displayLabel}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
