"use client";

import InvestmentPlansSection from "@/components/sections/InvestmentPlansSection";
import FaqSection from "@/components/sections/FaqSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function InvestmentPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full relative pt-16 ">
      <InvestmentPlansSection />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
}

