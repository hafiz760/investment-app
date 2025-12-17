"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-14 space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Client Stories
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Client Stories And Experiences
        </h2>
      </div>
      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
        <Card className="bg-card/80 border-border/60">
          <CardContent className="p-6 text-sm text-muted-foreground space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-accent">
              Featured Story
            </p>
            <p>
              “InvestaX helped us diversify from only real estate to a balanced
              portfolio with coal and cement projects. The monthly payouts are
              consistent and transparent.”
            </p>
            <div className="text-xs">
              <p className="font-semibold text-card-foreground">Ahmed Khan</p>
              <p className="text-muted-foreground">Business Owner • Karachi</p>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 text-xs sm:text-sm text-muted-foreground">
          <Card className="bg-card/80 border-border/60">
            <CardContent className="p-4">
              “Clear ROI structure and proper reporting. Their team is always
              available for updates.”
            </CardContent>
          </Card>
          <Card className="bg-card/80 border-border/60">
            <CardContent className="p-4">
              “Being able to invest in both traditional and IT-based projects
              gives me confidence for the long term.”
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
