"use client";

import { Check, TrendingUp, Clock, DollarSign, Shield } from "lucide-react";
import { PrimaryButton, SectionBadge } from "@/components/common";

const plans = [
  {
    name: "Short-Term Plan",
    minInvestment: "₨50,000",
    roi: "12-15%",
    lockIn: "6 Months",
    payout: "Monthly",
    description: "Ideal for investors looking for shorter commitment periods with regular monthly returns.",
    features: [
      "Monthly ROI payouts",
      "6 months lock-in period",
      "12-15% annual returns",
      "Minimum ₨50,000 investment",
      "Quarterly performance reports",
      "Early exit option (with penalty)"
    ]
  },
  {
    name: "Medium-Term Plan",
    minInvestment: "₨100,000",
    roi: "15-18%",
    lockIn: "12 Months",
    payout: "Quarterly",
    description: "Best value plan with balanced risk and higher returns for committed investors.",
    features: [
      "Quarterly ROI payouts",
      "12 months lock-in period",
      "15-18% annual returns",
      "Minimum ₨100,000 investment",
      "Monthly performance reports",
      "Priority customer support",
      "Reinvestment bonus options"
    ],
    highlighted: true
  },
  {
    name: "Long-Term Plan",
    minInvestment: "₨200,000",
    roi: "18-22%",
    lockIn: "24 Months",
    payout: "Half-Yearly",
    description: "Maximum returns for long-term investors with substantial capital commitment.",
    features: [
      "Half-yearly ROI payouts",
      "24 months lock-in period",
      "18-22% annual returns",
      "Minimum ₨200,000 investment",
      "Dedicated account manager",
      "Premium investment opportunities",
      "Flexible payout options"
    ]
  }
];

export default function InvestmentPlansSection() {
  return (
    <section id="plans" className="section-padding py-20 lg:py-32">
      <div className="container mx-auto">
        {/* Investment Overview */}
        <div id="investment-overview" className="mb-20">
          <div className="text-center mb-12" data-aos="fade-up">
            <SectionBadge className="mb-2">Investment Opportunities</SectionBadge>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              ROI-Based Investment Plans
            </h2>
            <p className="text-white/70 max-w-3xl mx-auto text-lg">
              Invest in our diversified portfolio across Coal, Cement, Bricks, Real Estate, and Forex/IT sectors. 
              Earn consistent returns with transparent operations and regular payouts.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12" data-aos="fade-up">
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <DollarSign className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Transparent ROI</h4>
              <p className="text-white/60 text-sm">Clear profit-sharing structure</p>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <Shield className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Secure Investment</h4>
              <p className="text-white/60 text-sm">Legal documentation provided</p>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <TrendingUp className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Regular Payouts</h4>
              <p className="text-white/60 text-sm">Monthly/Quarterly returns</p>
            </div>
            <div className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl p-6 text-center">
              <Clock className="w-10 h-10 text-[#D4AF37] mx-auto mb-3" />
              <h4 className="text-white font-bold mb-2">Flexible Terms</h4>
              <p className="text-white/60 text-sm">Multiple tenure options</p>
            </div>
          </div>
        </div>

        {/* Investment Plans */}
        <div className="text-center mb-16" data-aos="fade-up">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4">
            Choose Your Investment Plan
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Select a plan that matches your investment goals and risk appetite
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div
              key={plan.name}
              className={`bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border ${
                plan.highlighted ? 'border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.3)]' : 'border-[#D4AF37]/30'
              } rounded-xl p-8 ${
                plan.highlighted ? 'scale-105 relative' : ''
              } transition-all`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#D4AF37] text-[#0F1C2E] px-6 py-1 rounded-full text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <h3 className="text-2xl font-bold text-white mb-2">
                {plan.name}
              </h3>
              
              <div className="mb-6">
                <div className="text-4xl font-bold text-[#D4AF37] mb-2">
                  {plan.roi}
                </div>
                <p className="text-white/60">Annual ROI</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-center">
                  <p className="text-white/60 text-xs mb-1">Min. Investment</p>
                  <p className="text-white font-bold text-sm">{plan.minInvestment}</p>
                </div>
                <div className="bg-[#D4AF37]/10 rounded-lg p-3 text-center">
                  <p className="text-white/60 text-xs mb-1">Lock-in Period</p>
                  <p className="text-white font-bold text-sm">{plan.lockIn}</p>
                </div>
              </div>
              
              <p className="text-white/70 mb-6 text-sm">
                {plan.description}
              </p>
              
              <div className="mb-8">
                <p className="text-white font-semibold mb-4">Plan Features:</p>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-white/70 text-sm">
                      <Check className="w-5 h-5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              
              <PrimaryButton 
                className={`w-full py-6 text-base rounded-md ${
                  !plan.highlighted && 'bg-transparent border-2 border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0F1C2E]'
                }`}
              >
                Invest Now
              </PrimaryButton>
              
              <p className="text-white/50 text-xs text-center mt-4">
                *Terms & Conditions apply. Subject to KYC verification.
              </p>
            </div>
          ))}
        </div>

        {/* Risk Disclaimer */}
        <div className="mt-16 bg-gradient-to-r from-[#D4AF37]/10 to-transparent border-l-4 border-[#D4AF37] p-6 rounded" data-aos="fade-up">
          <h4 className="text-white font-bold mb-2">⚠️ Risk Disclosure</h4>
          <p className="text-white/70 text-sm leading-relaxed">
            All investments carry inherent risks. Past performance does not guarantee future returns. 
            ROI percentages are indicative and may vary based on market conditions and project performance. 
            Please read all terms and conditions carefully before investing. Consult with our investment 
            advisors for personalized guidance.
          </p>
        </div>
      </div>
    </section>
  );
}
