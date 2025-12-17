"use client";

import { ArrowRight, Zap, Building2, Boxes, Home, Laptop } from "lucide-react";
import { PrimaryButton, SectionBadge } from "@/components/common";

const divisions = [
  {
    icon: Zap,
    title: "Coal Dealership",
    description: "Premium quality coal supply for industrial and commercial needs with reliable logistics.",
    href: "#coal"
  },
  {
    icon: Building2,
    title: "Cement Dealership",
    description: "Bulk and retail cement supply from trusted brands with competitive pricing.",
    href: "#cement"
  },
  {
    icon: Boxes,
    title: "Bricks Supply",
    description: "High-quality bricks including fly ash, red bricks, and cement blocks for construction.",
    href: "#bricks"
  },
  {
    icon: Home,
    title: "Property Dealing",
    description: "Complete real estate solutions for buying, selling, and rental properties.",
    href: "#property"
  },
  {
    icon: Laptop,
    title: "Forex & IT Services",
    description: "Technology solutions and forex trading services with expert guidance.",
    href: "#forex-it"
  }
];

export default function HighlightCardsSection() {
  return (
    <section id="divisions" className="section-padding py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0F1C2E]/50">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Our Business Divisions</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Diversified Business Portfolio
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Operating across multiple sectors to provide comprehensive business solutions 
            and investment opportunities.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <div
              key={division.title}
              className="group bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-xl p-8 hover:border-[#D4AF37] hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-300"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[#D4AF37] transition-all">
                <division.icon className="w-8 h-8 text-[#D4AF37] group-hover:text-[#0F1C2E] transition-all" />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
                {division.title}
              </h3>
              
              <p className="text-white/70 leading-relaxed mb-6">
                {division.description}
              </p>
              
              <a
                href={division.href}
                className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-3 transition-all font-semibold"
              >
                Learn More
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
          
          {/* Investment Division - Highlighted */}
          <div
            className="group bg-gradient-to-br from-[#D4AF37] to-[#C4A037] border border-[#D4AF37] rounded-xl p-8 hover:shadow-[0_0_40px_rgba(212,175,55,0.4)] transition-all duration-300 md:col-span-2 lg:col-span-3"
            data-aos="fade-up"
            data-aos-delay={500}
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="w-16 h-16 bg-[#0F1C2E]/20 rounded-lg flex items-center justify-center mb-6">
                  <ArrowRight className="w-8 h-8 text-[#0F1C2E]" />
                </div>
                
                <h3 className="text-3xl font-bold text-[#0F1C2E] mb-4">
                  Investment Division
                </h3>
                
                <p className="text-[#0F1C2E]/80 leading-relaxed mb-6 text-lg">
                  Invest in our diversified portfolio and earn consistent ROI. Multiple investment 
                  plans available with flexible tenure and attractive returns.
                </p>
                
                <PrimaryButton className="bg-[#0F1C2E] text-white hover:bg-[#1a2942] px-8 py-6 text-base rounded-md">
                  View Investment Plans
                  <ArrowRight className="ml-2 h-5 w-5" />
                </PrimaryButton>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#0F1C2E]/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#0F1C2E] mb-2">12-18%</div>
                  <div className="text-[#0F1C2E]/70 text-sm">Annual ROI</div>
                </div>
                <div className="bg-[#0F1C2E]/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#0F1C2E] mb-2">₨50K</div>
                  <div className="text-[#0F1C2E]/70 text-sm">Min. Investment</div>
                </div>
                <div className="bg-[#0F1C2E]/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#0F1C2E] mb-2">6-12</div>
                  <div className="text-[#0F1C2E]/70 text-sm">Months Lock-in</div>
                </div>
                <div className="bg-[#0F1C2E]/10 rounded-lg p-6 text-center">
                  <div className="text-4xl font-bold text-[#0F1C2E] mb-2">100%</div>
                  <div className="text-[#0F1C2E]/70 text-sm">Transparent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
