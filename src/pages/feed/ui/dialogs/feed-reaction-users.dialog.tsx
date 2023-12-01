import {
  CommonDialog,
  CommonDialogContent,
  CommonDialogHeader,
  EmptyMessage,
  GQLRenderer,
  IReturnMany,
  useDialogContext,
  useDialogTabContext,
} from '../../../../shared';
import {
  FeedReactionTabOptions,
  ReadableFeedReaction,
  ReadableFeedReactionOption,
} from '../../shared';
import { Box, HStack, Icon, Tabs, VStack } from '@holdr-ui/react';
import {
  FeedReactionFetchType,
  GET_FEED_REACTION_USERS,
  IFeedReactionUser,
  ReactionIcon,
  UserWithRelationshipAction,
  useFeedContext,
} from '../../../../features';
import { useSuspenseQuery } from '@apollo/client';
import { Fragment } from 'react';

function FeedReactionUsersDialog() {
  const { isOpen, onOpen, onClose, option } = useDialogTabContext();

  if (option != 'reactions') return null;

  return (
    <CommonDialog
      minHeight='85vh'
      ariaDescribedBy='create-post-dialog__title'
      isOpen={isOpen}
      onOpen={() => onOpen('reactions')}
      onClose={onClose}
    >
      <CommonDialogHeader label='Feed reactions' />
      <CommonDialogContent>
        <Tabs defaultValue='all'>
          <Tabs.List
            variant='ghost'
            css={{
              position: 'sticky',
              blur: '12px',
              zIndex: 5,
              py: '$3',

              '@bp1': {
                t: '50px',
                '& button': {
                  height: '$4',
                  fontSize: '$2',
                  minWidth: 'unset',
                  flex: 1,
                },
              },
              '@bp3': {
                t: '0px',
                '& button': {
                  fontSize: '$3',
                  height: '$7',
                  minWidth: 'unset',
                  flex: 1,
                },
              },
            }}
          >
            {FeedReactionTabOptions.map((name) => (
              <Tabs.Trigger key={`${name}-tab-trigger-`} value={name}>
                <HStack gap={3} items='center'>
                  {name !== 'all' && (
                    <Icon name={ReactionIcon[name].inactive} />
                  )}
                  {ReadableFeedReaction[name]}
                </HStack>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {FeedReactionTabOptions.map((name) => (
            <Tabs.Content key={`${name}-tab-trigger-`} value={name}>
              <ReactionUsersList type={name} />
            </Tabs.Content>
          ))}
        </Tabs>
      </CommonDialogContent>
    </CommonDialog>
  );
}

function ReactionUsersList({ type }: { type: FeedReactionFetchType }) {
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
          <VStack gap={4}>
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

FeedReactionUsersDialog.displayName = 'FeedReactionUsersDialog';

export default FeedReactionUsersDialog;
