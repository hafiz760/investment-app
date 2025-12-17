"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { articles } from "@/lib/home-data";

export default function BlogSection() {
  return (
    <section
      id="blog"
      className="container mx-auto px-4 lg:px-8 py-14 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-accent">
            Smart Money
          </p>
          <h2 className="text-2xl sm:text-3xl font-semibold">
            Smart Money Management Ideas
          </h2>
        </div>
        <Button variant="outline" size="sm" className="text-xs">
          View All Articles
        </Button>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a) => (
          <Card
            key={a.title}
            className="bg-card/80 border-border/60 flex flex-col"
          >
            <div className="relative h-40">
              <Image
                src={a.image}
                alt={a.title}
                fill
                className="object-cover"
              />
            </div>
            <CardContent className="p-4 text-xs sm:text-sm flex-1 space-y-2">
              <p className="text-[11px] uppercase tracking-[0.25em] text-accent">
                {a.category}
              </p>
              <p className="font-semibold text-card-foreground">{a.title}</p>
              <p className="text-muted-foreground">{a.excerpt}</p>
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 px-0 text-accent hover:text-accent/90"
              >
                Read More
                <ArrowRight className="ml-1 h-3 w-3" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
