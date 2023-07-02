import { useEffect } from 'react';
import { useToast } from '../use-toast';
import { useCreateRelationship } from '../../lib';

/**
 * Create a new relationship
 *
 * @param username
 */
export function useCreateRelationshipAction(username: string) {
  const { createRelationship, error, loading } = useCreateRelationship();
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

  const follow = () => createRelationship({ username, action: 'follow' });
  const mute = () => createRelationship({ username, action: 'mute' });
  const favourite = () =>
    createRelationship({ username, action: 'favourite' });

  return { mute, favourite, follow, loading };
}
