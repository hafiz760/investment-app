"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Play, ArrowRight } from "lucide-react";
import Image from "next/image";

function StatPill({ label }: { label: string }) {
  return (
    <div className="inline-flex items-center rounded-full border border-border/70 bg-card/70 px-3 py-1 text-[11px] text-muted-foreground gap-1">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      {label}
    </div>
  );
}

function SocialChip({ label }: { label: string }) {
  return (
    <span className="px-2 py-1 rounded-full border border-border/60 bg-card/60 text-[11px] hover:border-accent hover:text-accent cursor-pointer">
      {label}
    </span>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="container mx-auto px-4 lg:px-8 py-12 lg:py-20 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-center"
    >
      <div className="space-y-6">
        <p className="text-xs uppercase tracking-[0.3em] text-accent-foreground/80">
          Smart Investments • Real Growth
        </p>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold leading-tight text-balance">
          SMART INVESTMENT,
          <span className="block text-accent ml-1 lg:ml-0">LASTING GROWTH</span>
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl">
          Diversified investments across coal, cement, real estate, bricks,
          forex, and technology-backed projects — designed to deliver consistent
          ROI for modern investors.
        </p>

        {/* Stats */}
        <div className="flex flex-wrap gap-4">
          <StatPill label="25+ Active Projects" />
          <StatPill label="97% Client Satisfaction" />
          <StatPill label="350+ Investors" />
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
            Start Investing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="border-muted-foreground/40 text-muted-foreground hover:bg-muted/10"
          >
            <Play className="mr-2 h-4 w-4" /> How It Works
          </Button>
        </div>

        {/* Social row */}
        <div className="pt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span>Follow us:</span>
          <SocialChip label="Facebook" />
          <SocialChip label="LinkedIn" />
          <SocialChip label="YouTube" />
        </div>
      </div>

      {/* Hero Image / Card */}
      <div className="relative">
        <Card className="bg-card/90 border-border/60 shadow-xl overflow-hidden">
          <div className="relative h-64 sm:h-80">
            <Image
              src="/images/hero-1.jpg"
              alt="Investor Meeting"
              fill
              className="object-cover"
            />
          </div>
          <CardContent className="p-4 flex items-center justify-between text-xs">
            <div>
              <p className="text-muted-foreground uppercase tracking-wide">
                Portfolio Snapshot
              </p>
              <p className="text-sm font-medium text-accent">
                Multi-Sector Investments
              </p>
            </div>
            <div className="grid gap-1 text-right">
              <span className="text-xs text-muted-foreground">
                Managed Capital
              </span>
              <span className="text-lg font-semibold">$5.8M</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
