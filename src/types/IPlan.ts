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
  Basic = 'basic',
  Business = 'business',
  Enterprise = 'enterprise',
}

export interface IPlan {
  id: EPlan;
  name: string;
  price: IPlanPrice;
  description: string;
  features: string[];
  mostPopular: boolean;
}
