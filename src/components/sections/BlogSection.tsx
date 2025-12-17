"use client";

import { ArrowRight, Calendar, User } from "lucide-react";
import { SectionBadge } from "@/components/common";

const articles = [
  {
    title: "Retirement Planning: Steps You Should Take Today",
    author: "zaderonstudio2",
    date: "September 21, 2025",
    excerpt: "Top Strategies to Grow Your Wealth zaderonstudio2 – September 21,…"
  },
  {
    title: "The Power of Diversifying Your Portfolio",
    author: "zaderonstudio2",
    date: "September 21, 2025",
    excerpt: "Top Strategies to Grow Your Wealth zaderonstudio2 – September 21,…"
  },
  {
    title: "5 Common Investment Mistakes to Avoid",
    author: "zaderonstudio2",
    date: "September 21, 2025",
    excerpt: "Top Strategies to Grow Your Wealth zaderonstudio2 – September 21,…"
  }
];

export default function BlogSection() {
  return (
    <section id="blog" className="section-padding py-20 lg:py-32 bg-gradient-to-b from-transparent to-[#0F1C2E]/50">
      <div className="container mx-auto">
        <div className="text-center mb-16" data-aos="fade-up">
          <SectionBadge className="mb-2">Blog Post</SectionBadge>
          <h2 className="text-4xl lg:text-5xl font-bold text-white">
            Smart Money Management Ideas
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className="bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/30 rounded-xl overflow-hidden group hover:border-[#D4AF37] transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="h-64 bg-[#D4AF37]/10 flex items-center justify-center">
                <div className="text-6xl">📰</div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{article.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{article.date}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-white/70 mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <a 
                  href="#" 
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:gap-3 transition-all font-semibold"
                >
                  Learn more
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
