import { useSuspenseQuery } from '@apollo/client';
import { Box, Tabs, VStack } from '@holdr-ui/react';
import { GET_POLL_VOTES } from '../../queries';
import { IPoll, useFeedContext } from '../../shared';
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
} from 'shared';
import { Fragment } from 'react';
import { UserWithRelationshipAction } from '../../../relationships';

function PollVotesDialog({ items }: { items: IPoll[] }) {
  const { isOpen, onOpen, onClose } = useDialogContext();

  return (
    <CommonDialog
      isOpen={isOpen}
      onClose={onClose}
      onOpen={onOpen}
      minHeight='85vh'
    >
      <CommonDialogHeader label='Poll Votes' />
      <CommonDialogContent>
        <Tabs defaultValue={'All'}>
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
            <Tabs.Trigger value={'All'} key={`All-tab-trigger`}>
              All
            </Tabs.Trigger>
            {items.map((data) => (
              <Tabs.Trigger
                value={data.text}
                key={`${data.text}-tab-trigger`}
              >
                <Box css={{ whiteSpace: 'nowrap' }}>{data.text}</Box>
              </Tabs.Trigger>
            ))}
          </Tabs.List>
          {items.map((data) => (
            <Tabs.Content
              key={`${data.text}-tab-content`}
              value={data.text}
            >
              <PollUserList option={data.text} />
            </Tabs.Content>
          ))}
          <Tabs.Content key={'All-tab-content'} value={'All'}>
            <PollUserList option={'All'} />
          </Tabs.Content>
        </Tabs>
      </CommonDialogContent>
    </CommonDialog>
  );
}

function PollUserList({ option }: { option: string }) {
  const { feedId } = useFeedContext();
  const { onClose } = useDialogContext();

  function List() {
    const { data } = useSuspenseQuery<
      { usersWhoVoted: IConnection<UserModel, string> },
      { id?: string; params?: IPaginationParams<string> }
    >(GET_POLL_VOTES, {
      variables: { id: feedId },
      fetchPolicy: 'network-only',
    });

    const votedUsers = data?.usersWhoVoted?.edges;
    return (
      <Box borderTop={1} borderColor='base100' mt='calc(-1 * $4)' pt={4}>
        {/** TODO: integrade filter support on usersWhoVoted, then remove option === All check  */}
        {option === 'All' && votedUsers && votedUsers.length > 0 ? (
          <VStack gap={4}>
            {votedUsers.map((value, idx) => (
              <UserWithRelationshipAction
                data={value.node}
                onClose={onClose}
                key={`voted-user-${idx}`}
              />
            ))}
          </VStack>
        ) : (
          <EmptyMessage
            title={'No Votes Yet.'}
            subtitle={`Nobody has voted for this result yet.`}
          />
        )}
      </Box>
    );
  }

  return (
    <GQLRenderer ErrorFAllback={() => <Fragment />}>
      <List />
    </GQLRenderer>
  );
}

export default PollVotesDialog;
