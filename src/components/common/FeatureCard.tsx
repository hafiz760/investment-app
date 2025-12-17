import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export default function FeatureCard({ 
  icon: Icon, 
  title, 
  description,
  className = "" 
}: FeatureCardProps) {
  return (
    <div className={`bg-gradient-to-br from-[#0F1C2E] to-[#1a2942] border border-[#D4AF37]/20 rounded-lg p-6 ${className}`}>
      <Icon className="w-8 h-8 text-[#D4AF37] mb-3" />
      <h4 className="text-white font-bold mb-2">{title}</h4>
      <p className="text-white/60 text-sm">{description}</p>
    </div>
  );
}

