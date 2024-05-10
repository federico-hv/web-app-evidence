import { useEffect } from 'react';
import { useCurrentUser } from '../../../auth';

export function usePushToPendo() {
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // @ts-ignore
      window['pendo'].initialize({
        visitor: {
          id: currentUser.id,
          username: currentUser.username,
          role: currentUser.role,
        },
      });
    }
  }, []);
}
