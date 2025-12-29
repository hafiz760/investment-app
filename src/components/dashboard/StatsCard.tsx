"use client";

import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  label: string;
  value: string;
  icon: React.ElementType;
  className?: string;
  iconClassName?: string;
}

export function StatsCard({
  label,
  value,
  icon: Icon,
  className,
  iconClassName,
}: StatsCardProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden bg-[#0F1C2E]/60 backdrop-blur-xl border border-[#D4AF37]/20 shadow-2xl hover:border-[#D4AF37]/40 transition-all group",
        className
      )}
    >
      <CardContent className="p-6 flex items-center gap-4">
        <div
          className={cn(
            "p-4 rounded-xl transition-transform group-hover:scale-110",
            iconClassName || "bg-[#D4AF37]/10 text-[#D4AF37]"
          )}
        >
          <Icon className="h-6 w-6" />
        </div>
        <div className="flex flex-col">
          <p className="text-xl font-bold tracking-tight text-white">{value}</p>
          <span className="text-sm font-medium text-gray-400">{label}</span>
        </div>
      </CardContent>
    </Card>
  );
}
