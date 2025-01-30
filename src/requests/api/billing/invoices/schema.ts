export interface IStripeInvoiceResponse {
  id: string;
  subtotal: number;
  url?: string | null;
  pdf?: string | null;
  created: Date;
}

export interface IBillingInvoicesResponse {
  data: IStripeInvoiceResponse[];
}
