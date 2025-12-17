"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { highlightCards } from "@/lib/home-data";

export default function HighlightCardsSection() {
  return (
    <section className="bg-background/40 border-y border-border">
      <div className="container mx-auto px-4 lg:px-8 py-12 grid lg:grid-cols-3 gap-6">
        {highlightCards.map((card) => (
          <Card
            key={card.title}
            className="bg-card/80 border-border/60 flex flex-col"
          >
            <div className="relative h-40">
              <Image
                src={card.image}
                alt={card.title}
                fill
                className="object-cover"
              />
            </div>
            <CardHeader className="pb-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
                {card.tag}
              </p>
              <CardTitle className="text-base sm:text-lg text-card-foreground">
                {card.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xs sm:text-sm text-muted-foreground flex-1">
              <p>{card.description}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-4 px-0 text-accent hover:text-accent/90"
              >
                Learn More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
