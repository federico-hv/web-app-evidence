import { useEffect } from 'react';
import { useRequestRelationship } from '../use-request-relationship';
import { useToast } from '../../../../../shared';

export function useRequestRelationshipAction() {
  const { requestRelationship, loading, error } = useRequestRelationship();
  const { openWith } = useToast();

  useEffect(() => {
    if (error) {
      openWith({
        description:
          error.message ||
          'Oops! Something went wrong. Totally our fault, but try again later.',
        status: 'danger',
      });
    }
  }, [error, openWith]);

  const friendRequest = (username: string) =>
    requestRelationship({ username, action: 'friend request' });
  const followRequest = (username: string) =>
    requestRelationship({ username, action: 'follow request' });

  return { friendRequest, followRequest, loading };
}
