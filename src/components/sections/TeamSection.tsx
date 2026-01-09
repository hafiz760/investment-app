"use client";

import { Facebook, Twitter, Linkedin } from "lucide-react";
import { SectionBadge } from "@/components/common";

const teamMembers = [
  { name: "David Miller", role: "Senior UX Designer" },
  { name: "Lorenzo Moretti", role: "Designer" },
  { name: "Daniel Andersen", role: "Accounting" },
  { name: "Isabella Romano", role: "Senior UX Designer" },
  { name: "Sofia Petrova", role: "Accounting" },
  { name: "Amelia Laurent", role: "Designer" },
];

export default function TeamSection() {
  return (
    <section id="team" className="section-padding py-10 lg:py-20">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Our Team</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Our Dedicated Finance Team
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin nec
            turpis et lectus fermentum congue. Donec in purus vel lacus pulvinar
            luctus.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden group hover:border-[#D4AF37]/50 transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-80 bg-white/10 flex items-center justify-center">
                <div className="text-6xl">👤</div>
              </div>

              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-white mb-1">
                  {member.name}
                </h3>
                <p className="text-white/60 text-sm mb-4">{member.role}</p>

                <div className="flex justify-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] hover:border-[#D4AF37] transition-all"
                  >
                    <Facebook className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] hover:border-[#D4AF37] transition-all"
                  >
                    <Twitter className="w-4 h-4" />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] hover:border-[#D4AF37] transition-all"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
