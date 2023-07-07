import { useToast } from '../use-toast';
import { useRequestRelationship } from '../../lib';
import { useEffect } from 'react';

/**
 * Create a relationship requested
 *
 * @param username
 */
export function useRequestRelationshipAction(username: string) {
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

  const friendRequest = () =>
    requestRelationship({ username, action: 'friend request' });
  const followRequest = () =>
    requestRelationship({ username, action: 'follow request' });

  return { friendRequest, followRequest, loading };
}
