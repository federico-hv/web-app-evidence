import { HStack } from '@holdr-ui/react';
import { IProfile } from 'shared';
import Statistic from '../../data-display/statistic';

function ProfileStatistics({ profile }: { profile: IProfile }) {
  return (
    <HStack gap={3}>
      <Statistic value={profile.followers} label='followers' />
    </HStack>
  );
}
ProfileStatistics.displayName = 'ProfileStatistics';

export default ProfileStatistics;
