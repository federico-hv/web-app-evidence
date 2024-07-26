import { useCreateRelationship } from '../use-create-relationship';
import { RelationshipStatusCodeEnum } from '../../constants';

export function useCreateRelationshipAction() {
  const { createRelationship, error, loading } = useCreateRelationship();

  const follow = (username: string) =>
    createRelationship({
      username,
      type: RelationshipStatusCodeEnum.Following,
    });
  const mute = (username: string) =>
    createRelationship({
      username,
      type: RelationshipStatusCodeEnum.Muted,
    });
  const block = (username: string) =>
    createRelationship({
      username,
      type: RelationshipStatusCodeEnum.Blocked,
    });
  const restrict = (username: string) =>
    createRelationship({
      username,
      type: RelationshipStatusCodeEnum.Restricted,
    });

  return { mute, follow, restrict, block, loading };
}
