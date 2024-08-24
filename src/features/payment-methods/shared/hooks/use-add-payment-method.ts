import { useLocation, useNavigate } from 'react-router-dom';
import { makePath } from '../../../../shared';

export function useAddPaymentMethod() {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  return () =>
    navigate(makePath(['payment-method', 'add']), {
      state: {
        previousLocation: pathname,
      },
    });
}
