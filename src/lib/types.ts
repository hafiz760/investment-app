export interface Division {
  id: string;
  name: string;
  description: string;
  icon: string;
  href: string;
}

export interface InvestmentPlan {
  id: string;
  name: string;
  roi: string;
  minAmount: number;
  duration: string;
  payout: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}
