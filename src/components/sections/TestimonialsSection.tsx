"use client";

import { Quote, Star, Award, FileCheck, Shield, TrendingUp } from "lucide-react";
import { SectionBadge } from "@/components/common";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Business Owner, Karachi",
    investment: "₨500,000 - Medium Term Plan",
    content: "InvestaX has been a game-changer for my investment portfolio. The monthly ROI is consistent, and their transparency in operations gives me complete peace of mind. Highly recommended for serious investors.",
    rating: 5
  },
  {
    name: "Fatima Malik",
    role: "Real Estate Investor",
    investment: "₨300,000 - Short Term Plan",
    content: "I was initially skeptical about ROI-based investments, but InvestaX proved me wrong. Their professional team, clear documentation, and regular updates make them stand out from others.",
    rating: 5
  },
  {
    name: "Imran Siddiqui",
    role: "Entrepreneur",
    investment: "₨800,000 - Long Term Plan",
    content: "The diversified business model of InvestaX across coal, cement, and real estate provides excellent security. I've been investing for 18 months and the returns have exceeded my expectations.",
    rating: 5
  }
];

const certifications = [
  {
    icon: FileCheck,
    title: "Company Registration",
    description: "Registered with SECP"
  },
  {
    icon: Shield,
    title: "Legal Compliance",
    description: "Fully compliant operations"
  },
  {
    icon: Award,
    title: "Business Licenses",
    description: "All sectors licensed"
  },
  {
    icon: TrendingUp,
    title: "Audited Accounts",
    description: "Transparent financials"
  }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="section-padding py-20 lg:py-32">
      <div className="container mx-auto">
        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-16" data-aos="fade-up">
            <SectionBadge className="mb-2">Investor Testimonials</SectionBadge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              What Our Investors Say
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto text-lg">
              Real experiences from our satisfied investors across Pakistan
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.name}
                className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl p-8 hover:border-[#D4AF37] transition-all"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <Quote className="w-12 h-12 text-[#D4AF37] mb-6" />
                
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>

                <p className="text-white/80 leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                
                <div className="border-t border-[#D4AF37]/20 pt-4">
                  <h4 className="text-white font-bold mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#D4AF37] text-sm mb-2">
                    {testimonial.role}
                  </p>
                  <p className="text-white/50 text-xs">
                    {testimonial.investment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications & Legal */}
        <div id="certifications" className="bg-gradient-to-br from-[#D4AF37] to-[#C4A037] rounded-3xl p-12" data-aos="fade-up">
          <div className="text-center mb-12">
            <h2 className="text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-4">
              Certified & Legally Compliant
            </h2>
            <p className="text-[#0F1C2E]/80 max-w-2xl mx-auto text-lg">
              Your investment security is our priority. We operate with complete legal compliance and transparency.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <div
                key={cert.title}
                className="bg-[#0F1C2E]/10 rounded-xl p-6 text-center"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <div className="w-16 h-16 bg-[#0F1C2E]/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="w-8 h-8 text-[#0F1C2E]" />
                </div>
                <h4 className="text-[#0F1C2E] font-bold mb-2">{cert.title}</h4>
                <p className="text-[#0F1C2E]/70 text-sm">{cert.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-[#0F1C2E]/80 mb-6">
              All legal documents, certificates, and registration details are available for verification
            </p>
            <button className="bg-[#0F1C2E] text-white px-8 py-3 rounded-md font-semibold hover:bg-[#1a2942] transition-colors">
              View Legal Documents
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
