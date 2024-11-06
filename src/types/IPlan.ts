export enum EPlanFrequency {
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export interface IPlanFrequency {
  value: EPlanFrequency;
  label: string;
  priceSuffix: string;
}

export interface IPlanPrice {
  monthly: string;
  yearly: string;
}

export enum EPlanId {
  Freelancer = 'freelancer',
  Startup = 'startup',
  Enterprise = 'enterprise',
}

export interface IPlan {
  id: EPlanId;
  name: string;
  price: IPlanPrice;
  description: string;
  features: string[];
  mostPopular: boolean;
}
