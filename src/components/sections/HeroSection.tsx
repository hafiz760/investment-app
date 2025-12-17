"use client";

import { TrendingUp, Shield, Users, Award } from "lucide-react";
import { PrimaryButton, OutlineButton, SectionBadge } from "@/components/common";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="section-padding py-20 lg:py-32"
    >
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Content */}
        <div className="space-y-8" data-aos="fade-right">
          <SectionBadge>Diversified Business Group</SectionBadge>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white">
            Building Wealth Through{" "}
            <span className="text-[#D4AF37]">Diversified Investments</span>
          </h1>
          
          <p className="text-lg text-white/70 max-w-xl leading-relaxed">
            A trusted group operating across Coal, Cement, Bricks, Real Estate, Forex & IT sectors. 
            Offering secure ROI-based investment opportunities with transparent returns.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-white/90 text-sm">Secure & Legal</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#D4AF37]/10 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              </div>
              <span className="text-white/90 text-sm">High ROI</span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton className="px-8 py-6 text-base rounded-md">
              Start Investing
            </PrimaryButton>
            <OutlineButton className="px-8 py-6 text-base rounded-md">
              View Business Divisions
            </OutlineButton>
          </div>
        </div>

        {/* Right Stats Cards */}
        <div className="grid grid-cols-2 gap-6" data-aos="fade-left">
          <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-all">
            <div className="text-5xl font-bold text-[#D4AF37] mb-2">5+</div>
            <div className="text-white/70 text-sm">Business Sectors</div>
          </div>
          <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-all">
            <div className="text-5xl font-bold text-[#D4AF37] mb-2">25+</div>
            <div className="text-white/70 text-sm">Active Projects</div>
          </div>
          <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-all">
            <div className="text-5xl font-bold text-[#D4AF37] mb-2">350+</div>
            <div className="text-white/70 text-sm">Satisfied Investors</div>
          </div>
          <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-xl p-8 text-center hover:border-[#D4AF37]/50 transition-all">
            <div className="text-5xl font-bold text-[#D4AF37] mb-2">97%</div>
            <div className="text-white/70 text-sm">Success Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
}
