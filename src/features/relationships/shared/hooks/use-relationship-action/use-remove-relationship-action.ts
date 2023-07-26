import { useEffect } from 'react';
import { useRemoveRelationship } from '../use-remove-relationship';
import { useToast } from '../../../../../shared';

export function useRemoveRelationshipAction() {
  const { removeRelationship, loading, error } = useRemoveRelationship();
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

  const unfollow = (username: string) =>
    removeRelationship({ username, action: 'follow' });
  const unmute = (username: string) =>
    removeRelationship({ username, action: 'mute' });
  const removeFavourite = (username: string) =>
    removeRelationship({ username, action: 'favourite' });
  const removeFriendRequest = (username: string) =>
    removeRelationship({ username, action: 'friend request' });
  const removeFollowRequest = (username: string) =>
    removeRelationship({ username, action: 'follow request' });
  const removeFriend = (username: string) =>
    removeRelationship({ username, action: 'friend' });
  const removeRestriction = (username: string) =>
    removeRelationship({ username, action: 'restrict' });
  const removeBlock = (username: string) =>
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
