"use client";

import { Button } from "@/components/ui/button";

export default function CtaBannerSection() {
  return (
    <section className="bg-gradient-to-r from-primary/90 to-background border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent-foreground/80">
            Start Your Journey
          </p>
          <h3 className="text-xl sm:text-2xl font-semibold text-primary-foreground">
            Start Your Journey, Build Wealth Now
          </h3>
        </div>
        <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
          Schedule Consultation
        </Button>
      </div>
    </section>
  );
}
