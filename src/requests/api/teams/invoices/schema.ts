import { MongoId } from '@/types/MongoDocument';

export interface ITeamsInvoicesRequest {
  teamId: MongoId;
}

export interface IStripeInvoiceResponse {
  id: string;
  subtotal: number;
  url?: string | null;
  pdf?: string | null;
  created: Date;
}

export interface ITeamsInvoicesResponse {
  data: IStripeInvoiceResponse[];
}
