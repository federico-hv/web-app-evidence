import { useRecordState } from '@holdr-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';
import { StripeCardElementInfo } from '../types';

/**
 * Retrieve information about the Stripe Card elements
 * that are used. Must be used in the same component as
 * the Card elements.
 */
export function useStripeCardInfo() {
  const [state, update] = useRecordState<StripeCardElementInfo>({
    cardNumber: null,
    cardExpiry: null,
    cardCvc: null,
  });

  const elements = useElements();

  useEffect(() => {
    if (!elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement)
      return;

    cardNumberElement.on('change', (e) => update({ cardNumber: e }));
    cardExpiryElement.on('change', (e) => update({ cardExpiry: e }));
    cardCvcElement.on('change', (e) => update({ cardCvc: e }));

    return () => {
      cardNumberElement.on('change', () => null);
      cardExpiryElement.on('change', () => null);
      cardCvcElement.on('change', () => null);
    };
  }, [elements, update]);

  return state;
}
