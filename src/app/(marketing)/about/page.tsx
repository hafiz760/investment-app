"use client";

import PageHeader from "@/components/common/PageHeader";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function AboutPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="About InvestaX"
        title="About Us"
        breadcrumb="About Us"
      />
      <AboutSection />
      <StatsSection />
      <CtaBannerSection />
    </main>
  );
}

