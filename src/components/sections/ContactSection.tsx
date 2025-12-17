"use client";

import { Button } from "@/components/ui/button";

export default function ContactSection() {
  return (
    <section id="contact" className="bg-background/90 border-t border-border">
      <div className="container mx-auto px-4 lg:px-8 py-10 space-y-8">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="space-y-4 text-sm">
            <p className="text-xs uppercase tracking-[0.3em] text-accent">
              Begin Your Investment Journey
            </p>
            <h2 className="text-xl sm:text-2xl font-semibold">
              Start Your Investment Today
            </h2>
            <p className="text-muted-foreground max-w-xl text-xs sm:text-sm">
              Share your details and our team will contact you with suitable
              investment options tailored to your profile.
            </p>

            <form className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
              <input
                className="rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60"
                placeholder="Full Name"
              />
              <input
                className="rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60"
                placeholder="Email Address"
              />
              <input
                className="rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60"
                placeholder="Phone Number"
              />
              <input
                className="rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60"
                placeholder="Preferred Investment Amount"
              />
              <textarea
                className="sm:col-span-2 rounded-md border border-border bg-background px-3 py-2 text-foreground placeholder:text-muted-foreground/60 min-h-[80px]"
                placeholder="Tell us briefly about your investment goals"
              />
              <Button className="sm:col-span-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Submit Request
              </Button>
            </form>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 text-xs">
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                InvestaX Group
              </h3>
              <p className="text-muted-foreground">
                Coal, cement, bricks, property, forex & tech-backed investment
                opportunities under one group.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Contact
              </h3>
              <p className="text-muted-foreground">
                info@investax-group.com
                <br />
                +92 300 0000000
                <br />
                Mon–Sat, 10:00am–6:00pm
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-card-foreground mb-2">
                Office
              </h3>
              <p className="text-muted-foreground">
                Business Avenue,
                <br />
                Main Commercial Area,
                <br />
                Karachi, Pakistan
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-muted-foreground">
          <p>
            © {new Date().getFullYear()} InvestaX Group. All Rights Reserved.
          </p>
          <p>Terms & Conditions • Privacy Policy</p>
        </div>
      </div>
    </section>
  );
}
