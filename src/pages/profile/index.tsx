import { Heading, StackDivider, Text, VStack } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';

function ProfilePage() {
  return (
    <ContentLayout>
      <ContentLayoutMain>
        <Text role='contentinfo'>Profile page</Text>
      </ContentLayoutMain>
      <ContentLayoutAside>
        <VStack divider={<StackDivider />} gap={4}>
          <Heading as='h1' casing='uppercase' size={3} weight={500}>
            Recommended Artists
          </Heading>
          <Heading as='h1' casing='uppercase' size={3} weight={500}>
            Recommended Channels
          </Heading>
        </VStack>
      </ContentLayoutAside>
    </ContentLayout>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
