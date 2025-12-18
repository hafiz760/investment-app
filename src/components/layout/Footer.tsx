"use client";

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer id="legal" className="section-padding bg-gradient-to-b from-[#0F1C2E] to-[#060d16] border-t border-[#D4AF37]/20">
      <div className="container mx-auto py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center rounded-md bg-[#D4AF37] px-3 py-1.5 text-xs font-bold text-[#0F1C2E]">
                IX
              </div>
              <span className="text-base font-semibold text-white">
                InvestaX Group
              </span>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-6">
              A diversified business group operating across Coal, Cement, Bricks, Real Estate, Forex & IT sectors with secure ROI-based investment opportunities.
            </p>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-white hover:bg-[#D4AF37] hover:text-[#0F1C2E] transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Business Divisions */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Business Divisions</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/services" className="hover:text-[#D4AF37] transition-colors">All Services</Link></li>
              <li><Link href="/services#coal" className="hover:text-[#D4AF37] transition-colors">Coal Dealership</Link></li>
              <li><Link href="/services#cement" className="hover:text-[#D4AF37] transition-colors">Cement Dealership</Link></li>
              <li><Link href="/services#bricks" className="hover:text-[#D4AF37] transition-colors">Bricks Supply</Link></li>
              <li><Link href="/services#property" className="hover:text-[#D4AF37] transition-colors">Property Dealing</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><Link href="/about" className="hover:text-[#D4AF37] transition-colors">About Us</Link></li>
              <li><Link href="/investment" className="hover:text-[#D4AF37] transition-colors">Investment Plans</Link></li>
              <li><Link href="/team" className="hover:text-[#D4AF37] transition-colors">Our Team</Link></li>
              <li><Link href="/testimonials" className="hover:text-[#D4AF37] transition-colors">Testimonials</Link></li>
              <li><Link href="/faqs" className="hover:text-[#D4AF37] transition-colors">FAQs</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contact Us</h3>
            <div className="space-y-3 text-white/70 text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <p>Business Avenue, Main Commercial Area, Karachi, Pakistan</p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p>+92 300 0000000</p>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
                <p>info@investax-group.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D4AF37]/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} InvestaX Group. All Rights Reserved.
            </p>
            <div className="flex flex-wrap gap-6 text-white/60 text-sm">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Terms & Conditions</a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">Risk Disclosure</a>
              <a href="#certifications" className="hover:text-[#D4AF37] transition-colors">Legal Documents</a>
            </div>
          </div>
          
          <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-lg p-4 text-center">
            <p className="text-white/70 text-xs leading-relaxed">
              <strong className="text-[#D4AF37]">Investment Disclaimer:</strong> All investments are subject to market risks. 
              Past performance does not guarantee future returns. Please read all terms and conditions carefully before investing. 
              InvestaX Group is registered and operates in compliance with applicable laws and regulations.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

