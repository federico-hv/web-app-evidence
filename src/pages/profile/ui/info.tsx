import { useGeneralContext } from '../../../shared';
import { IProfile } from '../shared';
import { Container, Text, VStack } from '@holdr-ui/react';
function Info() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Container
      // borderBottom={1}
      // borderColor='base100'
      w='100%'
      maxWidth={{ '@bp1': '100%', '@bp3': 600 }}
    >
      {profile.bio && (
        <VStack py={4}>
          <Text size={{ '@bp1': 2, '@bp3': 3 }}>{profile.bio}</Text>
        </VStack>
      )}
    </Container>
  );
}
Info.displayName = 'Profile Info';

export default Info;
