import { useClubAnalyticsSuspenseQuery } from '../../../../features';
import { GeneralContextProvider, HStack } from '@holdr-ui/react';
import { voidFn } from '../../../../shared';
import ClubValueSummary from './club-value-summary';
import ClubProgress from './club-progress';

function ClubSummary() {
  const { data } = useClubAnalyticsSuspenseQuery();

  return (
    <GeneralContextProvider value={{ state: data, update: voidFn }}>
      <HStack gap={4}>
        <ClubProgress />
        <ClubValueSummary />
      </HStack>
    </GeneralContextProvider>
  );
}
export default ClubSummary;
