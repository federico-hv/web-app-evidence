import millify from 'millify';
import { useSuspenseQuery } from '@apollo/client';
import {
  GET_FEED_STATISTIC,
  useFeedContext,
  FeedStatisticType,
} from '../../../../features';
import { capitalize } from 'lodash';
import { HStack, Text } from '@holdr-ui/react';

const Readable = {
  bookmarks: 'bookmark',
  views: 'view',
  love: 'like',
};

function FeedStatistic({
  name,
  action,
}: {
  name: FeedStatisticType;
  action?: VoidFunction;
}) {
  const { feedId } = useFeedContext();
  const { data } = useSuspenseQuery<
    { feedStatistic: number },
    { id: string; name: FeedStatisticType }
  >(GET_FEED_STATISTIC, {
    variables: {
      id: feedId,
      name: name,
    },
  });

  return (
    <HStack
      gap={2}
      as='p'
      onClick={action}
      flex={0}
      _hover={
        action
          ? {
              textDecoration: 'underline',
            }
          : undefined
      }
      css={{ userSelect: 'none' }}
    >
      <Text
        size={{ '@bp1': 2, '@bp3': 3 }}
        weight={500}
        css={{ display: 'inline' }}
      >
        {data.feedStatistic ? millify(data.feedStatistic) : 0}{' '}
      </Text>
      <Text
        size={{ '@bp1': 2, '@bp3': 3 }}
        color='base400'
        css={{ display: 'inline' }}
      >
        {capitalize(
          `${Readable[name]}${data.feedStatistic !== 1 ? 's' : ''}`,
        )}
      </Text>
    </HStack>
  );
}
FeedStatistic.displayName = 'FeedStatistic';

export default FeedStatistic;
