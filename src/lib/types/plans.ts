export interface InvestmentPlan {
  id: string;
  name: string;
  minInvestment: number;
  maxInvestment: number;
  monthlyReturnMin: number;
  monthlyReturnMax: number;
  annualGrowthMin: number;
  annualGrowthMax: number;
  threeYearGrowthMin: number;
  threeYearGrowthMax: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePlanRequest {
  name: string;
  minInvestment: number;
  maxInvestment: number;
  monthlyReturnMin: number;
  monthlyReturnMax: number;
  annualGrowthMin: number;
  annualGrowthMax: number;
  threeYearGrowthMin: number;
  threeYearGrowthMax: number;
  isActive: boolean;
  price: number;
}

export interface buyPlanRequest {
  planId: string;
  successUrl: string;
  cancelUrl: string;
}

export interface buyPlanResponse {
  sessionId: string;
  url: string;
}

export interface buyPlanWalletRequest {
  planId: string;
}

export interface buyPlanWalletResponse {
  message: string;
}
