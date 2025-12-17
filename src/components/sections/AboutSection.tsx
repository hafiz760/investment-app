"use client";

import { CheckCircle, Award, Users, TrendingUp, Shield } from "lucide-react";
import { PrimaryButton, OutlineButton, FeatureCard, SectionBadge } from "@/components/common";

export default function AboutSection() {
  return (
    <section id="about" className="section-padding py-20 lg:py-32">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-6" data-aos="fade-right">
            <div className="space-y-2">
              <SectionBadge>About InvestaX Group</SectionBadge>
              <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                Building Trust Through Diversified Excellence
              </h2>
            </div>

            <p className="text-white/70 text-lg leading-relaxed">
              InvestaX is a diversified business group operating across multiple high-growth sectors 
              including Coal, Cement, Bricks, Real Estate, Forex, and IT. We combine traditional 
              business strength with modern investment opportunities.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <FeatureCard 
                icon={Award}
                title="Certified & Legal"
                description="Fully registered and compliant business operations"
              />
              <FeatureCard 
                icon={Users}
                title="Expert Team"
                description="Experienced professionals across all sectors"
              />
              <FeatureCard 
                icon={TrendingUp}
                title="Proven ROI"
                description="Consistent returns for our investors"
              />
              <FeatureCard 
                icon={Shield}
                title="Transparent"
                description="Clear communication and reporting"
              />
            </div>

            <div className="flex flex-wrap gap-4">
              <PrimaryButton className="px-8 py-6 text-base rounded-md">
                View All Divisions
              </PrimaryButton>
              <OutlineButton className="px-8 py-6 text-base rounded-md">
                Contact Us
              </OutlineButton>
            </div>
          </div>

          {/* Right - Mission & Vision */}
          <div className="space-y-6" data-aos="fade-left">
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#C4A037] rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-[#0F1C2E] mb-4">Our Mission</h3>
              <p className="text-[#0F1C2E]/80 leading-relaxed">
                To provide reliable business solutions and secure investment opportunities 
                that create lasting value for our clients, investors, and partners across 
                all our business divisions.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
              <p className="text-white/70 leading-relaxed">
                To become Pakistan&apos;s most trusted diversified business group, known for 
                excellence in operations, transparency in dealings, and consistent returns 
                for our stakeholders.
              </p>
            </div>

            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-4">Why Choose Us?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70">Multi-sector presence ensures portfolio diversification</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70">Transparent ROI structure with regular payouts</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70">Legal compliance and proper documentation</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                  <span className="text-white/70">Experienced management team</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
