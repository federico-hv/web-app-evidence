import { useMutation } from '@apollo/client';
import { CREATE_SETUP_INTENT } from './schema';
import { ErrorMessage, useToast } from '../../../shared';

/**
 * A hook that returns a method that creates a setup on Stripe
 * intent and retrieve a setup intent token from server.
 *
 */
export function useCreateSetupIntentMutation() {
  const { openWith } = useToast();

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
      if (import.meta.env.VITE_ENVIRONMENT === 'development') {
        console.error(e);
      }
      openWith({
        status: 'danger',
        description: ErrorMessage.Any,
      });
    }
  };

  return { createSetupIntent, ...result };
}
