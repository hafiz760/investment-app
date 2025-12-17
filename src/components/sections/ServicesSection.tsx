"use client";

import { Zap, Building2, Boxes, Home, Laptop, CheckCircle } from "lucide-react";
import { SectionBadge } from "@/components/common";

const divisions = [
  {
    id: "coal",
    icon: Zap,
    title: "Coal Dealership",
    tagline: "Premium Quality Coal Supply",
    description: "We supply high-grade coal for industrial, commercial, and residential needs. Our extensive network ensures timely delivery and competitive pricing.",
    features: [
      "Multiple coal grades available",
      "Bulk & retail supply options",
      "Reliable logistics network",
      "Competitive market pricing",
      "Quality assurance guaranteed"
    ],
    locations: "Karachi, Lahore, Islamabad"
  },
  {
    id: "cement",
    icon: Building2,
    title: "Cement Dealership",
    tagline: "Trusted Cement Supply Partner",
    description: "Authorized dealers of leading cement brands. We provide bulk cement supply for construction projects of all scales with doorstep delivery.",
    features: [
      "Top cement brands available",
      "Bulk order discounts",
      "Fast delivery service",
      "Technical support included",
      "Competitive wholesale rates"
    ],
    locations: "Major cities across Pakistan"
  },
  {
    id: "bricks",
    icon: Boxes,
    title: "Bricks Supply",
    tagline: "Quality Construction Materials",
    description: "Complete range of bricks including fly ash bricks, red bricks, and cement blocks. Perfect for residential and commercial construction projects.",
    features: [
      "Fly ash bricks",
      "Red clay bricks",
      "Cement blocks",
      "Bulk order capability",
      "Quality tested products"
    ],
    locations: "Manufacturing & supply nationwide"
  },
  {
    id: "property",
    icon: Home,
    title: "Property Dealing",
    tagline: "Your Real Estate Partner",
    description: "Comprehensive real estate services including buying, selling, and rental assistance for residential and commercial properties.",
    features: [
      "Residential properties",
      "Commercial spaces",
      "Rental services",
      "Property valuation",
      "Legal documentation support"
    ],
    locations: "Prime locations nationwide"
  },
  {
    id: "forex-it",
    icon: Laptop,
    title: "Forex & IT Services",
    tagline: "Technology & Trading Solutions",
    description: "Professional forex trading guidance and comprehensive IT solutions including software development, web services, and digital transformation.",
    features: [
      "Forex trading guidance",
      "Software development",
      "Web development",
      "Digital marketing",
      "IT consulting services"
    ],
    locations: "Online & office-based services"
  }
];

export default function ServicesSection() {
  return (
    <section className="section-padding py-20 lg:py-32 bg-gradient-to-b from-[#0F1C2E]/50 to-transparent">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Business Divisions in Detail</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Comprehensive Business Solutions
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Explore our diverse business operations across multiple sectors
          </p>
        </div>

        <div className="space-y-12">
          {divisions.map((division, index) => (
            <div
              key={division.id}
              id={division.id}
              className={`grid lg:grid-cols-2 gap-8 items-center ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
              data-aos="fade-up"
            >
              <div className={`space-y-6 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="inline-flex items-center gap-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full px-4 py-2">
                  <division.icon className="w-5 h-5 text-[#D4AF37]" />
                  <span className="text-[#D4AF37] font-semibold">{division.tagline}</span>
                </div>

                <h3 className="text-3xl lg:text-4xl font-bold text-white">
                  {division.title}
                </h3>

                <p className="text-white/70 text-lg leading-relaxed">
                  {division.description}
                </p>

                <div className="space-y-3">
                  {division.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-1" />
                      <span className="text-white/80">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-4 border-[#D4AF37] p-4 rounded">
                  <p className="text-white/70">
                    <span className="font-semibold text-[#D4AF37]">Service Locations:</span> {division.locations}
                  </p>
                </div>
              </div>

              <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-2xl p-12 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <division.icon className="w-24 h-24 text-[#D4AF37] mx-auto mb-4" />
                    <p className="text-white/50">Image Placeholder</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
