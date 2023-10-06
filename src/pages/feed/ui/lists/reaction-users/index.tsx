import {
  FeedReactionFetchType,
  GET_FEED_REACTION_USERS,
  IFeedReactionUser,
  useFeedContext,
  UserWithRelationshipAction,
} from '../../../../../features';
import { useSuspenseQuery } from '@apollo/client';
import {
  EmptyMessage,
  GQLRenderer,
  IReturnMany,
  useDialogContext,
} from '../../../../../shared';
import { Box, VStack } from '@holdr-ui/react';
import { ReactionUsersListProps } from './types';
import { Fragment } from 'react';
import { ReadableFeedReactionOption } from '../../../shared';

function ReactionUsersList({ type }: ReactionUsersListProps) {
  const { feedId } = useFeedContext();
  const { onClose } = useDialogContext();

  function List() {
    const { data } = useSuspenseQuery<
      { feedReactionUsers: IReturnMany<IFeedReactionUser> },
      { type: FeedReactionFetchType; id: string }
    >(GET_FEED_REACTION_USERS, {
      variables: { id: feedId, type: type },
      fetchPolicy: 'network-only',
    });

    return (
      <Box borderTop={1} borderColor='base100' mt='calc(-1 * $4)' pt={4}>
        {data.feedReactionUsers.count > 0 ? (
          <VStack>
            {data.feedReactionUsers.data.map((item) => (
              <UserWithRelationshipAction
                key={item.user.id}
                data={item.user}
                onClose={onClose}
              />
            ))}
          </VStack>
        ) : (
          <EmptyMessage
            title='No reactions yet.'
            subtitle={`Nobody has expressed ${ReadableFeedReactionOption[type]} for
              this feed yet.`}
          />
        )}
      </Box>
    );
  }

  return (
    <GQLRenderer ErrorFallback={() => <Fragment />}>
      <List />
    </GQLRenderer>
  );
}
ReactionUsersList.displayName = 'ReactionUsersList';

export default ReactionUsersList;
