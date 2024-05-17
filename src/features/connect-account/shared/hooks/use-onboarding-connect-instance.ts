import { useCreateCustomAccountSession } from './use-create-custom-account-session';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  loadConnectAndInitialize,
  StripeConnectInstance,
} from '@stripe/connect-js';

export function useOnboardingConnectInstance() {
  const { createSession } = useCreateCustomAccountSession();

  const renderAfterCalled = useRef(false);

  const [loading, setLoading] = useState(true);

  const fetchClientSecret = useCallback(async () => {
    setLoading(true);

    const { data } = await createSession();

    if (!data) {
      return '';
    }

    setLoading(false);

    return data.createCustomAccountSession.client_secret;
  }, []);

  const [connectInstance, set] = useState<StripeConnectInstance>();

  useEffect(() => {
    if (!renderAfterCalled.current) {
      set(() => {
        return loadConnectAndInitialize({
          publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
          fetchClientSecret: fetchClientSecret,
          appearance: {
            variables: {
              colorPrimary: '#6666FF',
              colorBackground: '#30304B',
              actionPrimaryColorText: '#9898FF',
              spacingUnit: '12px',
            },
          },
        });
      });
    }

    renderAfterCalled.current = true;
  }, []);

  return { connectInstance, loading, error: null };
}
