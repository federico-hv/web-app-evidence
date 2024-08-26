import { HStack, VStack } from '@holdr-ui/react';
import { GQLRenderer } from '../../../shared';
import ClubSummary from './ui/club-summary';
import {
  MembershipValueChart,
  SocialInteractionChart,
  VisitsByCountryChart,
} from './ui';

function ArtistProfileStatsPage() {
  return (
    <VStack gap={4}>
      <ClubSummary />
      <GQLRenderer>
        <MembershipValueChart />
      </GQLRenderer>
      <HStack h={400} gap={4}>
        <GQLRenderer>
          <VisitsByCountryChart />
        </GQLRenderer>
        <GQLRenderer>
          <SocialInteractionChart />
        </GQLRenderer>
      </HStack>
    </VStack>
  );
}
ArtistProfileStatsPage.displayName = 'ArtistProfileStatsPage';

export default ArtistProfileStatsPage;
