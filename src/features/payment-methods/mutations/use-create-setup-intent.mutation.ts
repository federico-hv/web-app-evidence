import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTENT, LINK_PAYMENT_METHOD } from './schema';

/**
 * A hook that returns a method that creates a setup on Stripe
 * intent and retrieve a setup intent token from server.
 *
 */
export function useCreateSetupIntentMutation() {
  const [mutate, result] = useMutation<{ createSetupIntent: string }>(
    CREATE_SETUP_INTENT,
  );

  /**
   * Create a setup intent on Stripe and retrieve a setup
   * intent token from server.
   */
  const createSetupIntent = async () => {
    try {
      return await mutate();
    } catch (e) {
      // show a toast
    }
  };

  return { createSetupIntent, ...result };
}
