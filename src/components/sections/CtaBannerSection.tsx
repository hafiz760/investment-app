"use client";

import { ArrowRight, Phone } from "lucide-react";
import {
  PrimaryButton,
  OutlineButton,
  SectionBadge,
} from "@/components/common";

export default function CtaBannerSection() {
  return (
    <section className="py-10 lg:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#0F1C2E] via-[#1a2942] to-[#0F1C2E]" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="section-padding container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          <SectionBadge className="mb-6">Ready to Invest?</SectionBadge>

          <h2 className="text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            Start Your Investment Journey{" "}
            <span className="text-[#D4AF37]">Today</span>
          </h2>

          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
            Join hundreds of satisfied investors earning consistent ROI through
            our diversified business portfolio. Transparent operations, regular
            payouts, and professional management.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <PrimaryButton className="px-10 py-7 text-lg rounded-md group">
              View Investment Plans
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </PrimaryButton>
            <OutlineButton className="px-10 py-7 text-lg rounded-md">
              <Phone className="mr-2 h-5 w-5" />
              Schedule Call
            </OutlineButton>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">
                12-22%
              </div>
              <p className="text-white/70 text-sm">Annual ROI Range</p>
            </div>
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">₨50K</div>
              <p className="text-white/70 text-sm">Minimum Investment</p>
            </div>
            <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-6">
              <div className="text-3xl font-bold text-[#D4AF37] mb-2">100%</div>
              <p className="text-white/70 text-sm">Transparent Process</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
