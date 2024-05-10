import { useEffect } from 'react';
import { useCurrentUser } from '../../../auth';

export function usePushToPendo() {
  const currentUser = useCurrentUser();

  useEffect(() => {
    if (currentUser) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      window['pendo'].initialize({
        visitor: {
          id: currentUser.id,
          username: currentUser.username,
          role: currentUser.role,
        },
        account: {
          id: `holdr:account::${currentUser.id}`,
        },
      });
    }
  }, [currentUser]);
}
