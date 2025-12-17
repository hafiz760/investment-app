"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { teamMembers } from "@/lib/home-data";

export default function TeamSection() {
  return (
    <section
      id="team"
      className="container mx-auto px-4 lg:px-8 py-14 space-y-6"
    >
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-accent">
          Our Team
        </p>
        <h2 className="text-2xl sm:text-3xl font-semibold">
          Our Dedicated Finance Team
        </h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((m) => (
          <Card
            key={m.name}
            className="bg-card/80 border-border/60 flex flex-col"
          >
            <div className="relative h-52">
              <Image src={m.image} alt={m.name} fill className="object-cover" />
            </div>
            <CardContent className="p-4 text-xs sm:text-sm">
              <p className="font-semibold text-card-foreground">{m.name}</p>
              <p className="text-muted-foreground text-[11px]">{m.role}</p>
              <p className="mt-2 text-muted-foreground/80 text-[11px]">
                {m.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
