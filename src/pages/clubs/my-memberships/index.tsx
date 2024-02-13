import { useCurrentUser } from '../../../features';
import {
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Heading } from '@holdr-ui/react';

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
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsMyMembershipsPage.displayName = 'ClubsMyMembershipsPage';

export default ClubsMyMembershipsPage;
