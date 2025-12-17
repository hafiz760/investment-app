"use client";

import HeroSection from "@/components/sections/HeroSection";
import HighlightCardsSection from "@/components/sections/HighlightCardsSection";
import ServicesSection from "@/components/sections/ServicesSection";
import StatsSection from "@/components/sections/StatsSection";
import AboutSection from "@/components/sections/AboutSection";
import CtaBannerSection from "@/components/sections/CtaBannerSection";
import TeamSection from "@/components/sections/TeamSection";
import InvestmentPlansSection from "@/components/sections/InvestmentPlansSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import FaqSection from "@/components/sections/FaqSection";
import ContactSection from "@/components/sections/ContactSection";

export default function HomePage() {
  return (
    <main className="text-foreground">
      <HeroSection />
      <HighlightCardsSection />
      <ServicesSection />
      <StatsSection />
      <AboutSection />
      <CtaBannerSection />
      <TeamSection />
      <InvestmentPlansSection />
      <TestimonialsSection />
      <BlogSection />
      <FaqSection />
      <ContactSection />
    </main>
  );
}
