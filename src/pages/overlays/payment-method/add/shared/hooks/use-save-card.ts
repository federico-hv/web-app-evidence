import {
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import { SaveCardDataType } from '../types';
import {
  useCreateSetupIntentMutation,
  useLinkPaymentMethodMutation,
} from '../../../../../../features';
import { useState } from 'react';
import { useRecordState } from '@holdr-ui/react';

interface CodeError {
  title: string;
  message: string;
  code?: string;
}

/**
 * Returns a method that sets up a setup intent on Stripe
 * and links a user's customer account to a card on Stripe.
 */
export function useSaveCard() {
  const [error, updateError] = useRecordState<null | CodeError>(null);

  const [loading, setLoading] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const { createSetupIntent } = useCreateSetupIntentMutation();
  const { linkPaymentMethod } = useLinkPaymentMethodMutation();

  const createError = (data: CodeError) => {
    setLoading(false);

    updateError(data);

    return { error };
  };

  if (!stripe || !elements) {
    return { saveCard: null, loading: false };
  }

  /**
   * A method that sets up a setup intent and links a customer account
   * to a card on Stripe.
   *
   * @param billingInfo The customer billing information
   */
  const saveCard = async (billingInfo: SaveCardDataType) => {
    try {
      setLoading(true);

      const cardNumberElement = elements.getElement(CardNumberElement);

      if (!cardNumberElement) {
        return createError({
          title: 'Failed to save card',
          message: 'Something went wrong. Please try again later.',
        });
      }

      // create a stripe intent
      const result = await createSetupIntent();

      if (!result || !result.data) {
        return createError({
          title: 'Failed to save card',
          message:
            'We could no connect with Stripe at the moment. Please try again..',
        });
      }

      const secret = result.data.createSetupIntent;
      // link card to the customer account
      const cardSetup = await stripe.confirmCardSetup(secret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: billingInfo.name,
            email: billingInfo.email,
            address: {
              country: billingInfo.country,
              line1: billingInfo.line1,
              postal_code: billingInfo.postal,
              city: billingInfo.city,
              state: billingInfo.province,
            },
          },
        },
      });

      if (cardSetup.error) {
        if (import.meta.env.VITE_ENVIRONMENT !== 'production')
          console.error(cardSetup.error);

        return createError({
          title: 'Failed to save card',
          message:
            cardSetup.error.message ??
            'Something went wrong while saving your card. Please try a different card or contact support if the problem persists',
          code: cardSetup.error.code,
        });
      }

      const linkCardResult = await linkPaymentMethod(
        cardSetup.setupIntent.payment_method as string,
      );

      if (!linkCardResult || !linkCardResult.data) {
        return createError({
          title: 'Failed to save card',
          message:
            'We failed to link the card you provided to your account. Please try again.',
        });
      }

      if (!linkCardResult.data.linkPaymentMethod.isSuccess) {
        return createError({
          title: 'Failed to save card',
          message:
            'We failed to link the card you provided to your account. Please try again.',
        });
      }

      setLoading(false);
    } catch (e: any) {
      if (import.meta.env.VITE_ENVIRONMENT !== 'production')
        console.error(e);

      return createError({
        title: 'Failed to save card',
        message:
          e.message ??
          'Something went wrong while saving your card. Please try a different card or contact support if the problem persists.',
      });
    }
  };

  return { saveCard, loading, error };
}
