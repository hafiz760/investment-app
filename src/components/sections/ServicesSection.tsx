"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { services } from "@/lib/home-data";

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="container mx-auto px-4 lg:px-8 py-12 space-y-8"
    >
      <div className="flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Our Services
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-balance">
          Smart Investment Solutions Offered
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          From traditional sectors like coal and cement to modern forex and tech
          projects, we structure diversified portfolios that match your risk
          appetite.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((s) => (
          <Card
            key={s.title}
            className="bg-card/80 border-border/60 flex flex-col"
          >
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
                {s.category}
              </p>
              <CardTitle className="text-base sm:text-lg flex items-center justify-between">
                {s.title}
                <span className="text-[11px] rounded-full bg-accent/10 text-accent px-2 py-0.5">
                  {s.tag}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground flex-1">
              <p>{s.description}</p>
              <div className="mt-4 text-[11px] text-muted-foreground/80">
                Min. Investment:{" "}
                <span className="font-semibold text-accent">{s.min}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
