"use client";

export default function StatsSection() {
  const stats = [
    { value: "5+", label: "Business Sectors", description: "Diversified operations" },
    { value: "350+", label: "Active Investors", description: "Growing community" },
    { value: "25+", label: "Running Projects", description: "Across all sectors" },
    { value: "₨50M+", label: "Capital Managed", description: "Secure investments" }
  ];

  return (
    <section className="section-padding py-16 bg-gradient-to-r from-[#D4AF37] to-[#C4A037]">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="text-4xl lg:text-5xl font-bold text-[#0F1C2E] mb-2">
                {stat.value}
              </div>
              <div className="text-[#0F1C2E] font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-[#0F1C2E]/70 text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
