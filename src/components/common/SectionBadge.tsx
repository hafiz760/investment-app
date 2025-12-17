interface SectionBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export default function SectionBadge({ children, className = "" }: SectionBadgeProps) {
  return (
    <div className={`inline-block px-4 py-2 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full ${className}`}>
      <span className="text-[#D4AF37] text-sm font-semibold">{children}</span>
    </div>
  );
}

