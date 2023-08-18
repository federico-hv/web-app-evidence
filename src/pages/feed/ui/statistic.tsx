import { Loader, TextGroup, TextGroupSubheading } from '../../../shared';
import millify from 'millify';
import { FeedStatistic } from '../../../features/feeds/shared/types';
import { useQuery } from '@apollo/client';
import { GET_FEED_STATISTIC, useFeedContext } from '../../../features';
import { capitalize } from 'lodash';
import { Skeleton } from '@holdr-ui/react';

function Statistic({ name }: { name: FeedStatistic }) {
  const { feedId } = useFeedContext();
  const { loading, data, error } = useQuery<
    { feedStatistic: number },
    { id: string; name: FeedStatistic }
  >(GET_FEED_STATISTIC, {
    variables: {
      id: feedId,
      name: name,
    },
  });

  if (error && import.meta.env.DEV) {
    console.error(error);
  }

  return (
    <Loader loading={loading} as={<Skeleton h={3} w={8} />}>
      <TextGroup
        direction='horizontal'
        gap={{ '@bp1': 1, '@bp3': 2 }}
        flex={0}
        items='flex-end'
      >
        <TextGroupSubheading size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
          {data && data.feedStatistic ? millify(data.feedStatistic) : 0}
        </TextGroupSubheading>{' '}
        <TextGroupSubheading
          size={{ '@bp1': 2, '@bp3': 3 }}
          color='base400'
        >
          {capitalize(name)}
        </TextGroupSubheading>
      </TextGroup>
    </Loader>
  );
}
Statistic.displayName = 'Statistic';

export default Statistic;
