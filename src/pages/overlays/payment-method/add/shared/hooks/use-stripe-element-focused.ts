import { useRecordState } from '@holdr-ui/react';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
} from '@stripe/react-stripe-js';
import { useEffect } from 'react';

/**
 * A hook that returns an object containing the focus
 * states of the Stripe card elements, namely, CardNumberElement,
 * CardCvcElement and CardExpiryElement.
 *
 */
export function useStripeElementFocused() {
  const [state, update] = useRecordState({
    cardNumber: false,
    cardExpiry: false,
    cardCvc: false,
  });

  const elements = useElements();

  useEffect(() => {
    if (!elements) return;

    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    if (!cardNumberElement || !cardExpiryElement || !cardCvcElement)
      return;

    cardNumberElement.on('focus', () => update({ cardNumber: true }));
    cardNumberElement.on('blur', () => update({ cardNumber: false }));
    cardExpiryElement.on('focus', () => update({ cardExpiry: true }));
    cardExpiryElement.on('blur', () => update({ cardExpiry: false }));
    cardCvcElement.on('focus', () => update({ cardCvc: true }));
    cardCvcElement.on('blur', () => update({ cardCvc: false }));

    return () => {
      cardNumberElement.on('focus', () => null);
      cardNumberElement.on('blur', () => null);
      cardExpiryElement.on('focus', () => null);
      cardExpiryElement.on('blur', () => null);
      cardCvcElement.on('focus', () => null);
      cardCvcElement.on('blur', () => null);
    };
  }, [elements, update]);

  return state;
}
