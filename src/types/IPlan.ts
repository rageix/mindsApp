export enum EPlanInterval {
  Monthly = 'month',
  Yearly = 'year',
}

export interface IPlanPeriod {
  value: EPlanInterval;
  label: string;
  priceSuffix: string;
}

export interface IPlanPrice extends Record<EPlanInterval, string> {
  [EPlanInterval.Monthly]: string;
  [EPlanInterval.Yearly]: string;
}

export enum EPlan {
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export const PLANS: Record<EPlan, string> = {
  [EPlan.Monthly]: 'Monthly',
  [EPlan.Yearly]: 'Yearly',
};

// export const PLAN_INTERVALS: Record<EPlanInterval, string> = {
//   [EPlanInterval.Monthly]: 'Monthly',
//   [EPlanInterval.Yearly]: 'Yearly',
// };

export interface IPlan {
  id: EPlan;
  name: string;
  price: string;
  suffix: string;
  description: string;
  features: string[];
  // mostPopular: boolean;
  bestValue: boolean;
}
