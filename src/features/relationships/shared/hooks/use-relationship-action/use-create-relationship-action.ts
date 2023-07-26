import { useEffect } from 'react';
import { useCreateRelationship } from '../use-create-relationship';
import { useToast } from '../../../../../shared';

export function useCreateRelationshipAction() {
  const { createRelationship, error, loading } = useCreateRelationship();
  const { openWith } = useToast();

  useEffect(() => {
    if (error) {
      openWith({
        status: 'danger',
        description:
          error.message ||
          'Oops! Something went wrong. Totally our fault, but try again later.',
      });
    }
  }, [error, openWith]);

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
