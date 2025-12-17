import Link from "next/link";

interface PageHeaderProps {
  badge?: string;
  title: string;
  description?: string;
  breadcrumb: string;
}

export default function PageHeader({ badge, title, description, breadcrumb }: PageHeaderProps) {
  return (
    <section className="section-padding pt-24 pb-20 lg:pt-32 lg:pb-32 text-center">
      <div className="container mx-auto">
        {badge && (
          <div className="inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full mb-4">
            <span className="text-[#D4AF37] text-sm font-semibold">{badge}</span>
          </div>
        )}
        <h1 className="text-4xl lg:text-6xl font-bold text-white mb-4">
          {title}
        </h1>
        {description && (
          <p className="text-white/70 max-w-2xl mx-auto text-lg mb-6">
            {description}
          </p>
        )}
        <div className="flex items-center justify-center gap-2 text-white/60">
          <Link href="/" className="hover:text-[#D4AF37]">Home</Link>
          <span>/</span>
          <span className="text-[#D4AF37]">{breadcrumb}</span>
        </div>
      </div>
    </section>
  );
}

