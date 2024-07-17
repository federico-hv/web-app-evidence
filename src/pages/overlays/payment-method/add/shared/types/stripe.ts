import { StripeCardNumberElementChangeEvent } from '@stripe/stripe-js/dist/stripe-js/elements/card-number';
import {
  StripeCardCvcElementChangeEvent,
  StripeCardExpiryElementChangeEvent,
} from '@stripe/stripe-js';

export interface StripeCardElementInfo {
  cardNumber: StripeCardNumberElementChangeEvent | null;
  cardExpiry: StripeCardExpiryElementChangeEvent | null;
  cardCvc: StripeCardCvcElementChangeEvent | null;
}
