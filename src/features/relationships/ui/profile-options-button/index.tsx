import { useGeneralContext } from '../../../../shared';
import {
  IProfile,
  RelationshipStatusContextProvider,
  useRelationshipStatusInfo,
} from '../../shared';
import OptionsButton from '../options';

function ProfileOptionsButton() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { data } = useRelationshipStatusInfo(profile.username);

  return (
    <RelationshipStatusContextProvider
      value={{ ...data.relationshipStatusInfo }}
    >
      <OptionsButton />
    </RelationshipStatusContextProvider>
  );
}
ProfileOptionsButton.displayName = 'ProfileOptionsButton';

export default ProfileOptionsButton;
