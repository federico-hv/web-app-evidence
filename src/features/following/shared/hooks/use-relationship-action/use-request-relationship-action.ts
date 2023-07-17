import { useEffect } from 'react';
import { useRequestRelationship } from '../use-request-relationship';
import { useToast } from '../../../../../shared';

export function useRequestRelationshipAction() {
  const { requestRelationship, loading, error } = useRequestRelationship();
  const { open, set } = useToast({
    status: 'danger',
    description:
      'Oops! Something went wrong. Totally our fault, but try again later. ',
  });

  useEffect(() => {
    if (error && set) {
      set({ description: error.message, status: 'danger' });
      open();
    }
  }, [error, set, open]);

  const friendRequest = (username: string) =>
    requestRelationship({ username, action: 'friend request' });
  const followRequest = (username: string) =>
    requestRelationship({ username, action: 'follow request' });

  return { friendRequest, followRequest, loading };
}
