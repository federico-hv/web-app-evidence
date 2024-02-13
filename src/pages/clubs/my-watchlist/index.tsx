import {
  MembershipAuctionCard,
  MembershipSecondarySaleCard,
  useCurrentUser,
} from '../../../features';
import {
  arrayFrom,
  ErrorFallback,
  GQLRenderer,
  Head,
  RadialSurface,
} from '../../../shared';
import { Box, Grid, Heading } from '@holdr-ui/react';
import { shuffle } from 'lodash';
import {
  dummyAuctionMembershipData,
  dummySecondarySaleMembershipData,
} from '../shared';

function ClubsMyWatchlistPage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head
        prefix='Clubs -'
        title='My watchlist'
        description='A catalog of memberships that are being offered by artists.'
      />
      {currentUser && (
        <RadialSurface w='100%' radius={4} minHeight='calc(100vh - 96px)'>
          <Box px='16px' py='20px'>
            <Box py='13.5px' mb='20px'>
              <Heading weight={400} size='24px'>
                Watchlist
              </Heading>
            </Box>
            {/*<Box*/}
            {/*  my={4}*/}
            {/*  h='1px'*/}
            {/*  css={{ backgroundColor: 'rgba(152, 152, 255, 0.10)' }}*/}
            {/*/>*/}
            <Grid gap={3} templateColumns='repeat(3, 1fr)'>
              {shuffle([
                ...arrayFrom(10).map(
                  () => dummySecondarySaleMembershipData,
                ),
                ...arrayFrom(10).map(() => dummyAuctionMembershipData),
              ]).map((data, idx) => (
                <Grid.Item key={`watchlist-clubs-${idx}`}>
                  {data.isLive ? (
                    <MembershipAuctionCard data={data} />
                  ) : (
                    <MembershipSecondarySaleCard data={data} />
                  )}
                </Grid.Item>
              ))}
            </Grid>
          </Box>
        </RadialSurface>
      )}
    </GQLRenderer>
  );
}
ClubsMyWatchlistPage.displayName = 'ClubsMyWatchlistPage';

export default ClubsMyWatchlistPage;
