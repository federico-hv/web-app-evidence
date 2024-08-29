import {
  Alert,
  AlertContent,
  AlertDescription,
  Box,
  Center,
  Circle,
  Dialog,
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  GeneralContextProvider,
  Heading,
  HStack,
  IconButton,
  Text,
  useGeneralContext,
} from '@holdr-ui/react';
import { IDialogContext } from '../../../../shared/contexts/dialog/types';
import {
  getDialogColors,
  IPoll,
  PostModel,
  useFeedContext,
} from '../../shared';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../../tmp/custom-tabs';
import { Loader, voidFn } from '../../../../shared';
import { useFeedQuery, useUsersWhoVotedQuery } from '../../queries';
import { FlatList } from '../../../../tmp/flat-list';
import { Fragment } from 'react';
import { FollowItem } from '../../../relationships';
import millify from 'millify';

function PollUsersList({
  postId,
  pollId,
}: {
  pollId: number;
  postId: number;
}) {
  const { state } = useGeneralContext<{
    theme: 'primary' | 'secondary';
  }>();

  const { data, error, loading } = useUsersWhoVotedQuery({
    postId,
    pollAnswerId: pollId,
  });

  return (
    <Fragment>
      {error ? (
        <Alert status='danger'>
          <AlertContent>
            <AlertDescription color='danger700'>
              {error.message}
            </AlertDescription>
          </AlertContent>
        </Alert>
      ) : (
        <Loader loading={loading}>
          {data && (
            <FlatList
              h={450}
              overflowY='auto'
              className='thin-scrollbar'
              direction='vertical'
              gap={4}
              data={data.usersWhoVoted.edges}
              renderItem={(data) => (
                <FollowItem
                  color={
                    state.theme === 'secondary' ? 'base800' : 'white500'
                  }
                  colorTheme={
                    state.theme === 'secondary'
                      ? {
                          follow: 'purple500',
                          following: 'purple300',
                        }
                      : undefined
                  }
                  data={data.node}
                />
              )}
              keyExtractor={({ node }) => node.id}
            />
          )}
        </Loader>
      )}
    </Fragment>
  );
}

function PollTabs({ data }: { data: { polls: IPoll[]; postId: number } }) {
  const { state } = useGeneralContext<{
    theme: 'primary' | 'secondary';
  }>();

  const colors = getDialogColors(state.theme || 'primary');

  return (
    <CustomTabs>
      <CustomTabsHeader>
        <CustomTabsList
          className='hide-scrollbar'
          overflowX='auto'
          borderBottom={1}
          borderColor='rgba(152, 152, 255, 0.10)'
        >
          {data.polls.map((poll) => {
            const hasMoreThanTwoResponses = data.polls.length > 2;

            return (
              <CustomTabsTrigger
                gap={4}
                w={hasMoreThanTwoResponses ? 230 : 250}
                basis={hasMoreThanTwoResponses ? 230 : 250}
                shrink={0}
                py={3}
                px={2}
                _inactive={{
                  color: colors.tabColor.inactive,
                  fontWeight: 400,
                }}
                _active={{
                  color: colors.tabColor.active,
                  borderBottom: '2px solid $purple500',
                  fontWeight: 500,
                }}
                _hover={{ background: '#9898FF26' }}
                key={`PollTabKey-${poll.id}`}
                value={poll.id.toString()}
              >
                <Text noOfLines={1}>{poll.text}</Text>
                <Center
                  shrink={0}
                  bgColor='purple100'
                  py={0}
                  px={2}
                  h='20px'
                  minWidth='20px'
                  radius='999px'
                >
                  <Text color='purple800' size={1} weight={500}>
                    {millify(poll.count)}
                  </Text>
                </Center>
              </CustomTabsTrigger>
            );
          })}
        </CustomTabsList>
      </CustomTabsHeader>
      {data.polls.map((poll) => (
        <CustomTabsContent
          px={4}
          py={4}
          key={`PollContentKey-${poll.id}`}
          value={poll.id.toString()}
        >
          <Center
            bgColor='rgba(152, 152, 255, 0.10)'
            p={4}
            radius={1}
            mb={4}
            fontWeight={500}
          >
            {poll.text}
          </Center>
          <PollUsersList pollId={poll.id} postId={data.postId} />
        </CustomTabsContent>
      ))}
    </CustomTabs>
  );
}

function PollVotesDialog({
  theme,
  ...props
}: IDialogContext & { theme?: 'primary' | 'secondary' }) {
  const { feedId } = useFeedContext();

  const { data, error, loading } = useFeedQuery({ id: feedId });

  const colors = getDialogColors(theme || 'primary');

  return (
    <Dialog {...props}>
      <DialogPortal>
        <DialogOverlay zIndex={20} />
        <DialogContent
          gap={0}
          zIndex={20}
          minWidth={500}
          h={600}
          maxHeight='90vh'
          overflowY='hidden'
          color={colors.color}
          bgColor={colors.bgColor}
          css={{
            userSelect: 'none',
            backdropFilter: 'blur(12px)',
          }}
        >
          <DialogHeader
            py={4}
            borderBottom={1}
            borderColor='rgba(152, 152, 255, 0.10)'
          >
            <HStack w='100%' justify='space-between' items='center'>
              <Heading casing='capitalize' weight={500} size={5}>
                Polls
              </Heading>
              <IconButton
                onClick={props.onClose}
                size='sm'
                ariaLabel='close'
                variant='outline'
                icon='close'
                colorTheme={colors.iconButtonColor}
              />
            </HStack>
          </DialogHeader>
          <DialogBody px={0}>
            {error ? (
              <Alert status='danger'>
                <AlertContent>
                  <AlertDescription color='danger700'>
                    {error.message}
                  </AlertDescription>
                </AlertContent>
              </Alert>
            ) : (
              <Loader loading={loading}>
                {data && data.feed && data.feed.item && (
                  <GeneralContextProvider
                    value={{
                      state: { theme },
                      update: voidFn,
                    }}
                  >
                    <PollTabs
                      data={{
                        polls: (data.feed.item as PostModel).polls || [],
                        postId: data.feed.item.id as number,
                      }}
                    />
                  </GeneralContextProvider>
                )}
              </Loader>
            )}
          </DialogBody>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
}

export default PollVotesDialog;
