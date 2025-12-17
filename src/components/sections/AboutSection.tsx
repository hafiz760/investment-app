"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { whyPoints } from "@/lib/home-data";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="container mx-auto px-4 lg:px-8 py-14 grid lg:grid-cols-[1.1fr_1fr] gap-10 items-start"
    >
      <div className="space-y-4">
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Why InvestaX
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold text-balance">
          Constant Intellectual Challenge & Smart Investments
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Our research-driven team continuously evaluates projects across coal,
          cement, real estate, bricks and technology to maintain a balanced and
          profitable portfolio.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 pt-2">
          {whyPoints.map((item) => (
            <Card
              key={item.title}
              className="bg-card/70 border-border/60 text-xs sm:text-sm"
            >
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-card-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {item.description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Side image / CTA */}
      <div className="space-y-4">
        <div className="relative h-64 sm:h-80 rounded-md overflow-hidden border border-border/60">
          <Image
            src="/images/why-team.jpg"
            alt="Investment Team"
            fill
            className="object-cover"
          />
        </div>
        <Card className="bg-card/80 border-border/60 text-xs sm:text-sm">
          <CardContent className="p-4 flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Welcome To</p>
              <p className="font-semibold text-card-foreground">
                Smart Investments
              </p>
            </div>
            <Button
              size="sm"
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              Book a Call
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
