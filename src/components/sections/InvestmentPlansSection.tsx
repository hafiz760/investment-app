"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { plans } from "@/lib/home-data";

export default function InvestmentPlansSection() {
  return (
    <section
      id="plans"
      className="container mx-auto px-4 lg:px-8 py-14 space-y-8"
    >
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Investment Packages
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Investment Packages And Pricing
        </h2>
        <p className="text-sm text-muted-foreground max-w-2xl">
          Choose a plan that matches your capital, tenure and expected ROI. All
          plans are backed by diversified sector exposure.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((p) => (
          <Card
            key={p.name}
            className={`bg-card/80 border ${
              p.highlight
                ? "border-accent shadow-lg shadow-accent/20"
                : "border-border/60"
            } flex flex-col`}
          >
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
                {p.tag}
              </p>
              <CardTitle className="text-lg text-card-foreground">
                {p.name}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground flex-1 space-y-3">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-semibold text-accent">
                  {p.price}
                </span>
                <span>/ month</span>
              </div>
              <p>{p.description}</p>
              <ul className="space-y-1 text-[11px]">
                <li>• ROI: {p.roi}</li>
                <li>• Lock-in: {p.lockIn}</li>
                <li>• Payout: {p.payout}</li>
                <li>• Min. Capital: {p.min}</li>
              </ul>
              <Button
                className={`mt-4 w-full ${
                  p.highlight
                    ? "bg-accent text-accent-foreground hover:bg-accent/90"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                Invest Now
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
