import { useEffect } from 'react';
import { useCreateRelationship } from '../use-create-relationship';
import { useToast } from '../../../../common';

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
      'Oops! Something went wrong. Totally our fault, but try again later.',
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
  const block = () => createRelationship({ username, action: 'block' });
  const restrict = () =>
    createRelationship({ username, action: 'restrict' });

  return { mute, favourite, follow, restrict, block, loading };
}
