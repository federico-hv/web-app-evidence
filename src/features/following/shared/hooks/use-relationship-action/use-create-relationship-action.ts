import { useEffect } from 'react';
import { useCreateRelationship } from '../use-create-relationship';
import { useToast } from '../../../../../shared';

export function useCreateRelationshipAction() {
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

  const follow = (username: string) =>
    createRelationship({ username, action: 'follow' });
  const mute = (username: string) =>
    createRelationship({ username, action: 'mute' });
  const favourite = (username: string) =>
    createRelationship({ username, action: 'favourite' });
  const block = (username: string) =>
    createRelationship({ username, action: 'block' });
  const restrict = (username: string) =>
    createRelationship({ username, action: 'restrict' });

  return { mute, favourite, follow, restrict, block, loading };
}
