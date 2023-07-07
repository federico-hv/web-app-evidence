import { useEffect } from 'react';
import { useRemoveRelationship } from '../use-remove-relationship';
import { useToast } from '../../../../common';

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
  const removeFollowRequest = () =>
    removeRelationship({ username, action: 'follow request' });
  const removeFriend = () =>
    removeRelationship({ username, action: 'friend' });
  const removeRestriction = () =>
    removeRelationship({ username, action: 'restrict' });
  const removeBlock = () =>
    removeRelationship({ username, action: 'block' });
  return {
    unfollow,
    unmute,
    removeFavourite,
    removeFriendRequest,
    removeFollowRequest,
    removeBlock,
    removeFriend,
    removeRestriction,
    loading,
  };
}
