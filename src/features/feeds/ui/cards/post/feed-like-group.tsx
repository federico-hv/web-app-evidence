import { useFeedContext } from '../../../shared';
import { Box, HStack } from '@holdr-ui/react';
import { useFeedStatistic } from '../../../shared';
import LikeButton from '../../buttons/like';
import millify from 'millify';

function FeedLikeGroup() {
  const { feedId } = useFeedContext();
  const { data } = useFeedStatistic(feedId, 'love');

  return (
    <HStack items='center' gap={1} zIndex={5}>
      <LikeButton />
      {data && (
        <Box cursor='pointer'>
          {millify(data.feedStatistic, { precision: 2 })}
        </Box>
      )}
    </HStack>
  );
}
FeedLikeGroup.displayName = 'FeedLikeGroup';

export default FeedLikeGroup;
