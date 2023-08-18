import { Loader } from '../../../shared';
import millify from 'millify';
import { useQuery } from '@apollo/client';
import {
  GET_FEED_STATISTIC,
  useFeedContext,
  FeedStatistic,
} from '../../../features';
import { capitalize } from 'lodash';
import { Box, Skeleton, Text } from '@holdr-ui/react';

function Statistic({
  name,
  action,
}: {
  name: FeedStatistic;
  action?: VoidFunction;
}) {
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
      <Box
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
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>
          <Text weight={500} css={{ display: 'inline' }}>
            {data && data.feedStatistic ? millify(data.feedStatistic) : 0}{' '}
            <Text color='base400' css={{ display: 'inline' }}>
              {capitalize(name)}
            </Text>
          </Text>
        </Text>
      </Box>
    </Loader>
  );
}
Statistic.displayName = 'Statistic';

export default Statistic;
