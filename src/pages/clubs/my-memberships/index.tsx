import {
  MembershipCard,
  OwnedMembershipModel,
  useCurrentUser,
} from '../../../features';
import {
  arrayFrom,
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Heading, VStack } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import { dummyOwnedMembershipData } from '../shared';
import { FlatList } from '../../../tmp/flat-list';

function ClubsMyMembershipsPage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Clubs -'
        title='My memberships'
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} minHeight='calc(100vh - 96px)'>
          <Box px='16px' py='20px'>
            <Box py='13.5px' mb='20px'>
              <Heading weight={400} size='24px'>
                Holdr Clubs
              </Heading>
            </Box>
            <VStack>
              <FlatList<OwnedMembershipModel>
                gap={4}
                css={{ flexWrap: 'wrap' }}
                data={shuffle(
                  arrayFrom(2).map(() => dummyOwnedMembershipData),
                )}
                renderItem={(data) => <MembershipCard data={data} />}
                keyExtractor={(_, idx) => idx}
              />
            </VStack>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsMyMembershipsPage.displayName = 'ClubsMyMembershipsPage';

export default ClubsMyMembershipsPage;
