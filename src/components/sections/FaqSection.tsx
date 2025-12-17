"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { faqs } from "@/lib/home-data";

export default function FaqSection() {
  return (
    <section className="container mx-auto px-4 lg:px-8 py-14 grid lg:grid-cols-[1.1fr_0.9fr] gap-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Finance & Investment FAQs
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl mb-4">
          Clear answers to the most common questions about our ROI-based
          investment structure, payouts and risk framework.
        </p>
        <Accordion
          type="single"
          collapsible
          className="space-y-2 text-xs sm:text-sm"
        >
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger className="text-left text-card-foreground">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <Card className="bg-card/80 border-border/60">
        <CardContent className="p-6 space-y-4 text-xs sm:text-sm">
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Need Help?
          </p>
          <p className="font-semibold text-card-foreground">
            Talk to our investment advisor today
          </p>
          <p className="text-muted-foreground">
            Share your goals and risk appetite, and we&apos;ll help you choose
            the right plan.
          </p>
          <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
            Book a Free Call
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}
