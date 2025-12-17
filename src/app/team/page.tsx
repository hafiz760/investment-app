"use client";

import PageHeader from "@/components/common/PageHeader";
import TeamSection from "@/components/sections/TeamSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function TeamPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Meet Our Team"
        title="Our Team"
        description="Meet the professionals behind InvestaX Group's success"
        breadcrumb="Our Team"
      />
      <TeamSection />
      <CtaBannerSection />
    </main>
  );
}

