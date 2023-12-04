import { useSuspenseQuery } from '@apollo/client';
import { GET_BOOKMARKED_USERS } from '../../queries';
import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  EmptyMessage,
  GQLRenderer,
  IConnection,
  IPaginationParams,
  UserModel,
  useDialogContext,
  useDialogTabContext,
} from 'shared';
import {
  UserWithRelationshipAction,
  useFeedContext,
} from '../../../../features';
import { Box, VStack } from '@holdr-ui/react';
import { Fragment } from 'react';

function FeedBookmarksUsersDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  if (option != 'bookmarks') return null;

  return (
    <CommonDialog
      minHeight='85vh'
      isOpen={isOpen}
      onOpen={() => onOpen('views')}
      onClose={onClose}
    >
      <CommonDialogHeader label='Feed Bookmarks' />
      <CommonDialogContent>
        <BookmarkUsersList />
      </CommonDialogContent>
    </CommonDialog>
  );
}

function BookmarkUsersList() {
  const { feedId } = useFeedContext();
  const { onClose } = useDialogContext();

  function List() {
    const { data } = useSuspenseQuery<
      { usersWhoBookmarked: IConnection<UserModel, string> },
      { id?: string; params?: IPaginationParams<string> }
    >(GET_BOOKMARKED_USERS, {
      variables: { id: feedId },
      fetchPolicy: 'network-only',
    });

    const bookmarkedUsers = data?.usersWhoBookmarked?.edges;
    return (
      <Box borderTop={1} borderColor='base100' mt='calc(-1 * $3)' pt={4}>
        {bookmarkedUsers && bookmarkedUsers.length > 0 ? (
          <VStack gap={4}>
            {bookmarkedUsers.map((item, idx) => (
              <UserWithRelationshipAction
                data={item.node}
                key={`bookmarked-user-${idx}`}
                onClose={onClose}
              />
            ))}
          </VStack>
        ) : (
          <Box>
            <EmptyMessage
              title='No bookmarks yet.'
              subtitle='Nobody has bookmarked your post yet.'
            />
          </Box>
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

export default FeedBookmarksUsersDialog;
