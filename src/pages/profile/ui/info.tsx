import { useGeneralContext } from '../../../shared';
import { IProfile } from '../shared';
import { Text, VStack } from '@holdr-ui/react';
import { Fragment } from 'react';

function Info() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      {profile.bio && (
        <VStack py={4}>
          <Text size={{ '@bp1': 2, '@bp3': 3 }}>{profile.bio}</Text>
        </VStack>
      )}
    </Fragment>
  );
}
Info.displayName = 'Profile Info';

export default Info;
