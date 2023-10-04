import { Center, HStack, Icon } from '@holdr-ui/react';
import { useGeneralContext, UserNamesGroup } from '../../../../shared';
import { useCurrentUser } from '../../../../features';
import { Fragment } from 'react';
import { IProfile } from '../../shared';
import { ProfileOptionsButton } from '../buttons';

function TitleHeader() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <HStack w='100%' justify='space-between' items='flex-start'>
        <HStack gap={3}>
          <UserNamesGroup
            displayName={profile.displayName}
            username={profile.username}
          />
          {profile.protected && (
            <Center pt={1} h='fit-content'>
              <Icon
                size='sm'
                color='base400'
                name='lock-fill'
                aria-label='Protected account'
              />
            </Center>
          )}
        </HStack>
        {currentUser && currentUser.username !== profile.username && (
          <ProfileOptionsButton />
        )}
      </HStack>
    </Fragment>
  );
}

TitleHeader.displayName = 'Header';

export default TitleHeader;
