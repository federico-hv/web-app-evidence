import { useMutation } from '@apollo/client';
import { ErrorMessage, useToast } from '../../../shared';
import { DELETE_PAYMENT_METHOD } from './schema';
import { GET_PAYMENT_METHODS } from '../queries';
import { IPaymentMethod } from '../shared';

/**
 * A hook that returns a function that calls a
 * mutation to delete a payment method.
 */
export function useDeletePaymentMethodMutation() {
  const { openWith } = useToast();

  const [mutate, result] = useMutation<
    {
      deletePaymentMethod: IPaymentMethod;
    },
    { id: number }
  >(DELETE_PAYMENT_METHOD);

  /**
   * Delete a payment method that is associated with
   * the current user.
   *
   * @param id the ID of the payment method in our platform
   */
  const deletePaymentMethod = async (id: number) => {
    try {
      return await mutate({
        variables: {
          id,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              paymentMethods(current = {}) {
                cache.evict(current.__ref);
              },
            },
          });
        },
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

  return { deletePaymentMethod, ...result };
}
