import { useToast } from '../use-toast';
import { useRemoveRelationship } from '../../lib';
import { useEffect } from 'react';

/**
 * Remove a relationship
 * @param username
 */
export function useRemoveRelationshipAction(username: string) {
  const { removeRelationship, loading, error } = useRemoveRelationship();
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

  const unfollow = () =>
    removeRelationship({ username, action: 'follow' });
  const unmute = () => removeRelationship({ username, action: 'mute' });
  const removeFavourite = () =>
    removeRelationship({ username, action: 'favourite' });
  const removeFriendRequest = () =>
    removeRelationship({ username, action: 'friend request' });
  const removeFriend = () =>
    removeRelationship({ username, action: 'friend' });
  const removeRestriction = () =>
    removeRelationship({ username, action: 'restrict' });

  return {
    unfollow,
    unmute,
    removeFavourite,
    removeFriendRequest,
    removeFriend,
    removeRestriction,
    loading,
  };
}
