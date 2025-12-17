"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { PrimaryButton, SectionBadge } from "@/components/common";

export default function ContactSection() {
  return (
    <section id="contact" className="section-padding py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0F1C2E]/50">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Get In Touch</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Start Your Investment Journey Today
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Have questions? Want to invest? Our team is ready to assist you with all your queries.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-2xl p-8" data-aos="fade-right">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Full Name *</label>
                  <Input 
                    placeholder="Your Name" 
                    className="bg-[#0F1C2E]/50 border-[#D4AF37]/30 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Email Address *</label>
                  <Input 
                    type="email"
                    placeholder="your@email.com" 
                    className="bg-[#0F1C2E]/50 border-[#D4AF37]/30 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Phone Number *</label>
                  <Input 
                    placeholder="+92 300 0000000" 
                    className="bg-[#0F1C2E]/50 border-[#D4AF37]/30 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-2 block">Investment Amount</label>
                  <Input 
                    placeholder="₨ 50,000" 
                    className="bg-[#0F1C2E]/50 border-[#D4AF37]/30 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Interested In</label>
                <select className="w-full bg-[#0F1C2E]/50 border border-[#D4AF37]/30 text-white rounded-md px-3 py-2 focus:border-[#D4AF37] focus:outline-none">
                  <option>Investment Plans</option>
                  <option>Coal Dealership</option>
                  <option>Cement Dealership</option>
                  <option>Bricks Supply</option>
                  <option>Property Dealing</option>
                  <option>Forex & IT Services</option>
                  <option>General Inquiry</option>
                </select>
              </div>

              <div>
                <label className="text-white/70 text-sm mb-2 block">Message</label>
                <Textarea 
                  placeholder="Tell us about your investment goals or inquiry..." 
                  rows={5}
                  className="bg-[#0F1C2E]/50 border-[#D4AF37]/30 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                />
              </div>

              <PrimaryButton className="w-full py-6 text-base rounded-md">
                Submit Inquiry
              </PrimaryButton>

              <p className="text-white/50 text-xs text-center">
                By submitting this form, you agree to our Terms & Conditions and Privacy Policy.
              </p>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8" data-aos="fade-left">
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Office Address</h4>
                    <p className="text-white/70">
                      Business Avenue, Main Commercial Area<br />
                      Karachi, Pakistan
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Phone Number</h4>
                    <p className="text-white/70">
                      +92 300 0000000<br />
                      +92 21 0000000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Email Address</h4>
                    <p className="text-white/70">
                      info@investax-group.com<br />
                      invest@investax-group.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#D4AF37]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold mb-1">Working Hours</h4>
                    <p className="text-white/70">
                      Monday - Saturday: 10:00 AM - 6:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-gradient-to-br from-[#D4AF37] to-[#C4A037] rounded-2xl p-8 text-center">
              <h4 className="text-2xl font-bold text-[#0F1C2E] mb-4">
                Need Quick Assistance?
              </h4>
              <p className="text-[#0F1C2E]/80 mb-6">
                Chat with us on WhatsApp for instant support
              </p>
              <PrimaryButton className="bg-[#0F1C2E] text-white hover:bg-[#1a2942] px-8 py-6 text-base rounded-md w-full">
                💬 Chat on WhatsApp
              </PrimaryButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
