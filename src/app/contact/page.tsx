"use client";

import PageHeader from "@/components/common/PageHeader";
import ContactSection from "@/components/sections/ContactSection";

export default function ContactPage() {
  return (
    <main className="text-foreground overflow-x-hidden w-full">
      <PageHeader 
        badge="Get In Touch"
        title="Contact Us"
        description="Have questions? We're here to help you start your investment journey"
        breadcrumb="Contact"
      />
      <ContactSection />
    </main>
  );
}

