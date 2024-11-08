import Stripe from 'stripe';

export interface ICheckoutStatusRequest {
  stripeSessionId: string;
}

export interface ICheckoutStatusResponse {
  status: Stripe.Checkout.Session.Status | null;
  paymentStatus: Stripe.Checkout.Session.PaymentStatus;
}
