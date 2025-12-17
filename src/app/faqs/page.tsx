"use client";

import PageHeader from "@/components/common/PageHeader";
import FaqSection from "@/components/sections/FaqSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function FaqsPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Help Center"
        title="Frequently Asked Questions"
        description="Find answers to common questions about our investment plans and services"
        breadcrumb="FAQs"
      />
      <FaqSection />
      <CtaBannerSection />
    </main>
  );
}

