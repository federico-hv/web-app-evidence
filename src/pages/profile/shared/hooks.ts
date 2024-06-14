import {
  IProfile,
  useCurrentUser,
  useRelationshipStatusInfo,
} from '../../../features';
import { useGeneralContext } from '../../../shared';

export function useCanViewProfile() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();
  const { data } = useRelationshipStatusInfo(profile.username);

  let canViewProfile = true; // lenient

  if (data && profile && currentUser) {
    if (!data.relationshipStatusInfo.isFollowing && profile.protected) {
      canViewProfile = false;
    }
  }

  return { canViewProfile };
}
