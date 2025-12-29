"use client";

import PageHeader from "@/components/common/PageHeader";
import BlogSection from "@/components/sections/BlogSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";

export default function BlogPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Latest Updates"
        title="Blog & News"
        description="Stay updated with investment tips, market insights, and company news"
        breadcrumb="Blog"
      />
      <BlogSection />
      <CtaBannerSection />
    </main>
  );
}

