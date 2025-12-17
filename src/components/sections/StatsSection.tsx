"use client";

export default function StatsSection() {
  return (
    <section className="bg-background/60 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-6 grid sm:grid-cols-4 gap-4 text-center text-xs sm:text-sm">
        {[
          ["25+", "Running Projects"],
          ["387+", "Satisfied Clients"],
          ["1,300+", "Monthly Payouts"],
          ["258+", "Active Investors"],
        ].map(([value, label]) => (
          <div
            key={label}
            className="rounded-md border border-border/70 bg-card/70 py-3"
          >
            <div className="text-lg font-semibold text-accent">{value}</div>
            <div className="text-[11px] text-muted-foreground">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
