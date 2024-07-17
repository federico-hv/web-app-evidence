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

/**
 * Returns a method that sets up a setup intent on Stripe
 * and links a user's customer account to a card on Stripe.
 */
export function useSaveCard() {
  const [loading, setLoading] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const { createSetupIntent } = useCreateSetupIntentMutation();
  const { linkPaymentMethod } = useLinkPaymentMethodMutation();

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
    setLoading(true);

    const cardNumberElement = elements.getElement(CardNumberElement);

    if (!cardNumberElement) {
      throw new Error('Failed to find the card number element.');
    }

    // create a stripe intent
    const result = await createSetupIntent();

    if (!result || !result.data) {
      throw new Error('Failed to retrieve setup intent token.');
    }

    const secret = result.data.createSetupIntent;
    // link card to the customer account
    const cardSetup = await stripe
      .confirmCardSetup(secret, {
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
      })
      .catch((e) => {
        console.error(e);
        throw new Error('Failed to confirm the card details.');
      });

    if (
      !cardSetup ||
      !cardSetup.setupIntent ||
      !cardSetup.setupIntent.payment_method
    ) {
      throw new Error('Something went wrong, please try again later.');
    }

    const linkCardResult = await linkPaymentMethod(
      cardSetup.setupIntent.payment_method as string, // we did not ask for the expanded result.
    );

    if (!linkCardResult || !linkCardResult.data) {
      throw new Error('Something went wrong, please try again later.');
    }

    if (!linkCardResult.data.linkPaymentMethod.isSuccess) {
      throw new Error(linkCardResult.data.linkPaymentMethod.message);
    }
    setLoading(false);
  };

  return { saveCard, loading };
}
