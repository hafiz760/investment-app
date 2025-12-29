"use client";

import PageHeader from "@/components/common/PageHeader";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function TestimonialsPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Client Reviews"
        title="Testimonials"
        description="What our investors say about their experience with InvestaX"
        breadcrumb="Testimonials"
      />
      <TestimonialsSection />
      <CtaBannerSection />
    </main>
  );
}

