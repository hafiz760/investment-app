"use client";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { SectionBadge } from "@/components/common";

const faqs = [
  {
    question: "What is InvestaX Group and what do you do?",
    answer: "InvestaX is a diversified business group operating across Coal, Cement, Bricks, Real Estate, Forex & IT sectors. We offer ROI-based investment opportunities where investors can invest in our projects and earn consistent returns based on their investment amount and tenure."
  },
  {
    question: "How does the ROI-based investment work?",
    answer: "Investors choose an investment plan (Short-term, Medium-term, or Long-term) and invest a minimum amount. Returns are calculated as a percentage of the investment and paid out monthly, quarterly, or half-yearly depending on the plan. All investments are backed by our diversified business operations."
  },
  {
    question: "What is the minimum investment amount?",
    answer: "The minimum investment varies by plan: ₨50,000 for Short-term (6 months), ₨100,000 for Medium-term (12 months), and ₨200,000 for Long-term (24 months) plans."
  },
  {
    question: "What ROI can I expect?",
    answer: "ROI ranges from 12-22% annually depending on the plan: Short-term (12-15%), Medium-term (15-18%), and Long-term (18-22%). Returns are subject to market conditions and project performance."
  },
  {
    question: "Is my investment secure and legal?",
    answer: "Yes. InvestaX Group is registered with SECP and operates with full legal compliance. All investments are documented with proper agreements, and we provide regular performance reports. However, all investments carry inherent market risks."
  },
  {
    question: "Can I withdraw my investment before the lock-in period?",
    answer: "Early withdrawal is possible but subject to penalties as per the investment agreement. We recommend completing the full tenure for maximum returns. Please consult with our investment advisors for specific terms."
  },
  {
    question: "How are payouts made?",
    answer: "Payouts are made directly to your bank account as per the schedule: Monthly for Short-term, Quarterly for Medium-term, and Half-yearly for Long-term plans. You'll receive advance notification before each payout."
  },
  {
    question: "What documents are required to invest?",
    answer: "You need to provide: Valid CNIC/Passport, Bank account details, Proof of address, and complete our KYC (Know Your Customer) form. Our team will guide you through the documentation process."
  }
];

export default function FaqSection() {
  return (
    <section id="faqs" className="section-padding py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0F1C2E]/50">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Frequently Asked Questions</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Investment & Business FAQs
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Get answers to common questions about our investment plans and business operations
          </p>
        </div>

        <div className="max-w-4xl mx-auto" data-aos="fade-up">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl px-6 overflow-hidden hover:border-[#D4AF37] transition-all"
              >
                <AccordionTrigger className="text-left text-white hover:text-[#D4AF37] py-6 text-lg font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-white/70 pb-6 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-12 text-center bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-4 border-[#D4AF37] p-6 rounded">
            <p className="text-white/70 mb-4">
              Still have questions? Our investment advisors are here to help.
            </p>
            <a 
              href="#contact" 
              className="inline-block bg-[#D4AF37] text-[#0F1C2E] px-8 py-3 rounded-md font-semibold hover:bg-[#C4A037] transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
