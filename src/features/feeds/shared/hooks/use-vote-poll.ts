import { useMutation } from '@apollo/client';
import { VOTE_POLL } from '../../mutations';
import {
  FeedModel,
  FeedsReturnModel,
  IPoll,
  PostModel,
} from '../interface';
import { StringNumeric, useToast } from '../../../../shared';
import { GET_FEEDS, GET_USER_FEEDS } from '../../queries';
import { useParams } from 'react-router-dom';

function getNewData(
  data: FeedModel[],
  newPolls: IPoll[],
  itemId: StringNumeric,
) {
  const idx = data.findIndex(
    (item: { id: StringNumeric }) => item.id === itemId,
  );

  // new poll
  const node = data[idx].node as PostModel;
  const newNode = {
    ...node,
    polls: newPolls,
  };

  // construct new data
  return [
    ...data.slice(0, idx),
    { ...data[idx], node: newNode },
    ...data.slice(idx + 1),
  ];
}

export function useVotePoll() {
  const { username } = useParams();
  const { openWith } = useToast();

  const [mutation, { loading, error }] = useMutation<
    { votePoll: PostModel },
    { id: number; pollId: number }
  >(VOTE_POLL);

  const votePoll = async (
    feedId: string,
    postId: number,
    pollId: number,
  ) => {
    try {
      return await mutation({
        variables: {
          id: postId,
          pollId,
        },
        update: (cache, { data }) => {
          cache.modify({
            fields: {
              feeds() {
                const result: { feeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                  });

                if (result && result.feeds) {
                  const newData = getNewData(
                    result.feeds.data,
                    data?.votePoll.polls || [],
                    feedId,
                  );

                  // Update get feeds
                  cache.writeQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                    data: {
                      feeds: {
                        __typename: 'FeedReturnModel',
                        count: result.feeds.count,
                        data: newData,
                      },
                    },
                  });
                }
              },
              userFeeds() {
                const result: { userFeeds: FeedsReturnModel } | null =
                  cache.readQuery({
                    query: GET_USER_FEEDS,
                    variables: { username, type: 'post' },
                  });

                if (result && result.userFeeds) {
                  const newData = getNewData(
                    result.userFeeds.data,
                    data?.votePoll.polls || [],
                    feedId,
                  );

                  // Update get feeds
                  cache.writeQuery({
                    query: GET_FEEDS,
                    variables: { type: 'all' },
                    data: {
                      feeds: {
                        __typename: 'FeedReturnModel',
                        count: result.userFeeds.count,
                        data: newData,
                      },
                    },
                  });
                }
              },
            },
          });
        },
      });
    } catch (err) {
      console.error('Failed to add reaction.');
      openWith({
        status: 'danger',
        description:
          'Oops! Something went wrong. Its definitely our fault. Please try again.',
      });
    }
  };

  return { votePoll, error, loading };
}
