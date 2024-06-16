import { HStack } from '@holdr-ui/react';
import Filter from './filter';

function ClubsFilter() {
  return (
    <HStack mb={6} gap={3}>
      <Filter
        // active={filters.includes('following')}
        name='following'
        label='Following'
      />
      <Filter
        // active={filters.includes('recommended')}
        name='recommended'
        label='Recommended'
      />
      <Filter
        // active={filters.includes('live')}
        name='Trending'
        label='Trending'
      />
    </HStack>
  );
}
ClubsFilter.displayName = 'ClubsFilter';

export default ClubsFilter;
