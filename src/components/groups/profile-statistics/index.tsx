import { HStack } from '@holdr-ui/react';
import { IProfile } from 'shared';
import Statistic from '../../data-display/statistic';

function ProfileStatistics({ profile }: { profile: IProfile }) {
  return (
    <HStack gap={3}>
      {profile.accountType === 'ARTIST' && (
        <Statistic value={0} label='followers' />
      )}
      {profile.accountType === 'FAN' && (
        <Statistic value={0} label='friends' />
      )}
      {profile.holdrs && (
        <Statistic value={profile.holdrs} label='holdrs' />
      )}
      {profile.memberships && (
        <Statistic value={profile.memberships} label='memberships' />
      )}
    </HStack>
  );
}
ProfileStatistics.displayName = 'ProfileStatistics';

export default ProfileStatistics;
