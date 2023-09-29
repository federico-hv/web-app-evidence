import {
  useCurrentUser,
  useRelationshipStatusInfo,
} from '../../../features';
import { useGeneralContext } from '../../../shared';
import { IProfile } from './types';

export function useCanViewProfile() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();
  const { data } = useRelationshipStatusInfo(profile.username);

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

  return { canViewProfile };
}
