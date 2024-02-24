import { MembershipCard, useCurrentUser } from '../../../features';
import {
  arrayFrom,
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Grid, Heading, VStack } from '@holdr-ui/react';
import { dummyOwnedMembershipData } from '../shared';

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
                My memberships
              </Heading>
            </Box>
            {/*<Box*/}
            {/*  h='1px'*/}
            {/*  css={{ backgroundColor: 'rgba(152, 152, 255, 0.10)' }}*/}
            {/*/>*/}
            <VStack>
              <Grid gap={3} templateColumns='repeat(3, 1fr)'>
                {arrayFrom(10)
                  .map(() => dummyOwnedMembershipData)
                  .map((data, idx) => (
                    <Grid.Item key={`my-membership-${idx}`}>
                      <MembershipCard data={data} />
                    </Grid.Item>
                  ))}
              </Grid>
            </VStack>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsMyMembershipsPage.displayName = 'ClubsMyMembershipsPage';

export default ClubsMyMembershipsPage;
