// Site-wide constants
export const SITE_CONFIG = {
  name: "Your Company Name",
  description: "Leading group of companies in Pakistan",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  email: "info@yourcompany.com",
  phone: "+92 xxx xxxxxxx",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
  address: "123 Business District, Karachi, Pakistan",
} as const;

export const DIVISIONS = [
  {
    id: "coal",
    name: "Coal Dealership",
    description: "Premium quality coal supply for industrial needs",
    icon: "Flame",
    href: "/divisions/coal",
  },
  {
    id: "cement",
    name: "Cement Dealership",
    description: "Authorized dealers of leading cement brands",
    icon: "Home",
    href: "/divisions/cement",
  },
  {
    id: "bricks",
    name: "Bricks Supply",
    description: "High-quality construction bricks at competitive prices",
    icon: "Boxes",
    href: "/divisions/bricks",
  },
  {
    id: "property",
    name: "Property Dealing",
    description: "Complete real estate solutions for buying, selling & renting",
    icon: "Building2",
    href: "/divisions/property",
  },
  {
    id: "forex-it",
    name: "Forex & IT Services",
    description: "Technology solutions and forex trading services",
    icon: "TrendingUp",
    href: "/divisions/forex-it",
  },
] as const;

export const INVESTMENT_PLANS = [
  {
    id: "monthly",
    name: "Monthly Returns",
    roi: "2.5%",
    minAmount: 50000,
    duration: "12 months",
    payout: "Monthly",
  },
  {
    id: "quarterly",
    name: "Quarterly Returns",
    roi: "8%",
    minAmount: 100000,
    duration: "12 months",
    payout: "Quarterly",
  },
  {
    id: "annual",
    name: "Annual Returns",
    roi: "15%",
    minAmount: 500000,
    duration: "24 months",
    payout: "Annually",
  },
] as const;
