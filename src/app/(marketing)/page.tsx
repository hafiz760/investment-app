"use client";

import HeroSection from "@/components/sections/HeroSection";
import HighlightCardsSection from "@/components/sections/HighlightCardsSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import InvestmentPlansSection from "@/components/sections/InvestmentPlansSection";

export default function HomePage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <HeroSection />
      <HighlightCardsSection />
      <InvestmentPlansSection />
      <StatsSection />
      <AboutSection />
      <CtaBannerSection />
    </main>
  );
}
