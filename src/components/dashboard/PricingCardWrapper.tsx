"use client";

import React from "react";
import { PricingCard } from "./PricingCard";

export interface PricingFeature {
  label: string;
  included: boolean;
}

interface PricingCardWrapperProps {
  id: string;
  title: string;
  price: string;
  period: string;
  features: PricingFeature[];
  isPopular?: boolean;
  walletBalance: number;
}

export function PricingCardWrapper(props: PricingCardWrapperProps) {
  return <PricingCard {...props} />;
}