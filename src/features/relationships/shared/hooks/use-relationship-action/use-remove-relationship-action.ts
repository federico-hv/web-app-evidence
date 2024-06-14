import { useEffect } from 'react';
import { useRemoveRelationship } from '../use-remove-relationship';
import { useToast } from '../../../../../shared';
import { RelationshipStatusCodeEnum } from '../../constants';

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
    removeRelationship({
      username,
      type: RelationshipStatusCodeEnum.Following,
    });
  const unmute = (username: string) =>
    removeRelationship({
      username,
      type: RelationshipStatusCodeEnum.Muted,
    });
  const removeFollowRequest = (username: string) =>
    removeRelationship({
      username,
      type: RelationshipStatusCodeEnum.Requested,
    });

  const removeRestriction = (username: string) =>
    removeRelationship({
      username,
      type: RelationshipStatusCodeEnum.Restricted,
    });

  const removeBlock = (username: string) =>
    removeRelationship({
      username,
      type: RelationshipStatusCodeEnum.Blocked,
    });
  return {
    unfollow,
    unmute,
    removeFollowRequest,
    removeBlock,
    removeRestriction,
    loading,
  };
}
