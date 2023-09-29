import { HStack, Icon } from '@holdr-ui/react';
import { Head, useGeneralContext, UserNamesGroup } from '../../../shared';
import { ProfileOptionsButton, useCurrentUser } from '../../../features';

import { Fragment } from 'react';
import { IProfile } from '../shared';

function Header() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <Head
        prefix=''
        title={`${profile.displayName} (@${profile.username})`}
        description={profile.bio || ''}
      />

      <HStack w='100%' justify='space-between'>
        <HStack gap={3}>
          <UserNamesGroup
            displayName={profile.displayName}
            username={profile.username}
          />
          {profile.protected && (
            <Icon
              size='sm'
              color='base400'
              name='lock-fill'
              aria-label='Protected account'
            />
          )}
        </HStack>
        {currentUser && currentUser.username !== profile.username && (
          <ProfileOptionsButton />
        )}
      </HStack>
    </Fragment>
  );
}

Header.displayName = 'Header';

export default Header;
