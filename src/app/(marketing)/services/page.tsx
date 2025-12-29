"use client";

import PageHeader from "@/components/common/PageHeader";
import ServicesSection from "@/components/sections/ServicesSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function ServicesPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Our Services"
        title="Business Divisions"
        description="Explore our diversified business operations across multiple sectors"
        breadcrumb="Services"
      />
      <ServicesSection />
      <CtaBannerSection />
    </main>
  );
}

