import { useQuery } from '@apollo/client';
import { FeedCard, FeedsReturnModel, GET_FEEDS } from '../../../features';
import { Error, Loader } from '../../../shared';
import { Alert, VStack } from '@holdr-ui/react';
import { FeedFilterValue, FeedViewType } from '../shared';

function Feeds({
  filter,
  type,
}: {
  filter: FeedFilterValue;
  type: FeedViewType;
}) {
  const { loading, data, error } = useQuery<
    { feeds: FeedsReturnModel },
    { type: string }
  >(GET_FEEDS, {
    variables: {
      type: filter,
    },
  });

  return (
    <Error
      hasError={!!error}
      errorEl={
        <Alert>
          <Alert.Description>{error?.message}</Alert.Description>
        </Alert>
      }
    >
      <Loader loading={loading}>
        {data && (
          <VStack w='100%' gap={5} pb={6}>
            {data.feeds.data.map((item) => (
              <FeedCard key={item.id} data={item} />
            ))}
          </VStack>
        )}
      </Loader>
    </Error>
  );
}
Feeds.displayName = 'Feeds';

export default Feeds;
