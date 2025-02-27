import { useMutation } from '@apollo/client';
import { LINK_PAYMENT_METHOD } from './schema';
import { ErrorMessage, ISuccessResponse, useToast } from '../../../shared';
import { CHECK_HAS_PAYMENT_METHOD } from '../queries';

/**
 * A hook that returns a function that can be used to
 * link a payment method that has been saved to Stripe
 * to an existing/new stripe customer (i.e. a user).
 */
export function useLinkPaymentMethodMutation() {
  const { openWith } = useToast();

  const [mutate, result] = useMutation<
    {
      linkPaymentMethod: ISuccessResponse;
    },
    { paymentMethodId: string }
  >(LINK_PAYMENT_METHOD);

  /**
   * Link a payment method that has been saved to Stripe
   * to an existing/new stripe customer (i.e. a user).
   *
   * @param paymentMethodId the ID of the payment method on Stripe
   */
  const linkPaymentMethod = async (paymentMethodId: string) => {
    try {
      return await mutate({
        variables: {
          paymentMethodId,
        },
        refetchQueries: [{ query: CHECK_HAS_PAYMENT_METHOD }],
      });
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

  return { linkPaymentMethod, ...result };
}
