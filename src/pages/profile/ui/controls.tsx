import {
  ProfileOptionsButton,
  SocialButton,
  useCurrentUser,
} from '../../../features';
import { useGeneralContext } from '../../../shared';
import { IProfile } from '../shared';
import { Container, HStack } from '@holdr-ui/react';

function Controls() {
  const currentUser = useCurrentUser();
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Container pt={4} w='100%' maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
      <HStack pb={4} items='center' justify='space-between'>
        <HStack gap={3}>
          <SocialButton />
          {currentUser && currentUser.username !== profile.username && (
            <ProfileOptionsButton />
          )}
        </HStack>
      </HStack>
    </Container>
  );
}
Controls.displayName = 'Profile Controls';

export default Controls;
