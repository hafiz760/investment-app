"use client";

import PageHeader from "@/components/common/PageHeader";
import InvestmentPlansSection from "@/components/sections/InvestmentPlansSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function InvestmentPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Investment Plans"
        title="ROI-Based Investment"
        description="Choose from our flexible investment plans with attractive returns"
        breadcrumb="Investment Plans"
      />
      <InvestmentPlansSection />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
}

