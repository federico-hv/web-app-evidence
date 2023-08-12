import {
  useCurrentUser,
  useRelationshipStatusInfo,
} from '../../../features';
import { useProfile } from '../../../shared';

export function useCanViewProfile() {
  const currentUser = useCurrentUser();
  const { profile } = useProfile();
  const { loading, error, data } = useRelationshipStatusInfo(
    profile.username,
  );

  let canViewProfile = true; // lenient

  if (data && profile && currentUser) {
    if (
      !data.relationshipStatusInfo.isFollowing &&
      !data.relationshipStatusInfo.isOwned &&
      profile.protected
    ) {
      canViewProfile = false;
    }
  }

  return { canViewProfile, loading, error };
}
