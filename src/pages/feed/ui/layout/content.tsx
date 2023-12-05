import {
  ArticleModel,
  BookmarkPopover,
  FeedContextProvider,
  FeedModel,
  PostModel,
  Reaction,
  ReactionPopover,
  useCurrentUser,
  useFeedContext,
} from '../../../../features';
import {
  arrayFrom,
  DateUtility,
  DialogTabContextProvider,
  ErrorFallback,
  GeneralContextProvider,
  GenericProps,
  GQLRenderer,
  Head,
  LinkOverlay,
  prefix,
  TextGroup,
  useGeneralContext,
} from '../../../../shared';
import {
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
  Skeleton,
  VStack,
  useDisclosure,
} from '@holdr-ui/react';
import { capitalize } from 'lodash';
import { useState } from 'react';
import {
  FeedBookmarksUsersDialog,
  FeedReactionUsersDialog,
  FeedViewsUsersDialog,
} from '../dialogs';
import { ArticleDetails, FeedStatistic, PostDetails } from '../groups';

function StatisticsWrapper({ children }: GenericProps) {
  return (
    <HStack
      gap={{ '@bp1': 3, '@bp3': 5 }}
      p={{ '@bp1': 4, '@bp3': 5 }}
      bgColor='base100'
      w='full'
      radius={3}
    >
      {children}
    </HStack>
  );
}

function Statistics() {
  const { isOpen, onOpen: open, onClose } = useDisclosure();
  const [option, setOption] = useState('');

  const currentUser = useCurrentUser();
  const { owner, createdAt, reaction, feedId, bookmarked } =
    useFeedContext();

  const onOpen = (value: string) => {
    setOption(value);
    open();
  };

  const LoadingFallback = (
    <StatisticsWrapper>
      {arrayFrom(3).map((n) => (
        <Skeleton key={`skeleton-loader-${n}`} h='1.25rem' w='6rem' />
      ))}
    </StatisticsWrapper>
  );

  return (
    <GQLRenderer
      ErrorFallback={ErrorFallback}
      LoadingFallback={LoadingFallback}
    >
      <DialogTabContextProvider
        value={{
          isOpen,
          onOpen,
          onClose,
          option,
        }}
      >
        <StatisticsWrapper>
          <FeedStatistic
            name='views'
            {...(owner.id === currentUser?.id && {
              action: () => onOpen('views'),
            })}
          />
          <FeedStatistic
            name='reactions'
            action={() => onOpen('reactions')}
          />
          <FeedStatistic
            name='bookmarks'
            {...(owner.id === currentUser?.id && {
              action: () => onOpen('bookmarks'),
            })}
          />
        </StatisticsWrapper>
        <FeedReactionUsersDialog />
        <FeedViewsUsersDialog />
        <FeedBookmarksUsersDialog />
      </DialogTabContextProvider>
    </GQLRenderer>
  );
}

function Content() {
  const { state } = useGeneralContext<FeedModel>();

  return (
    <FeedContextProvider
      value={{
        bookmarked: state.bookmarked,
        isPinned: state.isPinned,
        owner: state.owner,
        feedId: state.id as string,
        reaction: state.reaction,
        createdAt: state.createdAt,
      }}
    >
      <Head
        prefix={`${state.owner.displayName} -`}
        title={state.node.description}
        description={state.node.description}
      />
      <VStack>
        <Box borderBottom={2} borderColor='base100'>
          <Container maxWidth={600} py={4} borderColor='base100'>
            <VStack gap={{ '@bp1': 5, '@bp3': 5 }} w='full'>
              <HStack justify='space-between'>
                <HStack gap={4} position='relative'>
                  <LinkOverlay to={prefix('/', state.owner.username)} />
                  <Avatar
                    variant='squircle'
                    size={{ '@bp1': 'base', '@bp3': 'xl' }}
                    src={state.owner.avatar}
                    name={state.owner.displayName}
                  />
                  <TextGroup gap={0}>
                    <TextGroup.Heading
                      weight={500}
                      size={{ '@bp1': 2, '@bp3': 3 }}
                    >
                      {state.owner.displayName}
                    </TextGroup.Heading>
                    <TextGroup.Subheading
                      color='base400'
                      size={1}
                      weight={500}
                    >
                      {capitalize(DateUtility.fromNow(state.createdAt))}{' '}
                      ago
                    </TextGroup.Subheading>
                  </TextGroup>
                </HStack>
                {/*<FeedMoreOptionsButton type.ts={state.type.ts} />*/}
              </HStack>
              {state.type === 'post' ? (
                <PostDetails data={state.node as PostModel} />
              ) : (
                <ArticleDetails data={state.node as ArticleModel} />
              )}

              <Statistics />

              <HStack gap={5}>
                <ReactionPopover>
                  <IconButton
                    size={{ '@bp1': 'base', '@bp4': 'lg' }}
                    icon={
                      state.reaction
                        ? Reaction[state.reaction].icon
                        : 'reaction-add'
                    }
                    variant='ghost'
                    colorTheme='base600'
                    ariaLabel={
                      state.reaction
                        ? Reaction[state.reaction].name
                        : 'React'
                    }
                  />
                </ReactionPopover>
                <BookmarkPopover alignOffset={20}>
                  <IconButton
                    variant='ghost'
                    ariaLabel={
                      !state.bookmarked
                        ? 'create bookmark'
                        : 'remove bookmark'
                    }
                    icon={
                      !state.bookmarked
                        ? 'bookmark-outline'
                        : 'bookmark-fill'
                    }
                    size={{ '@bp1': 'base', '@bp4': 'lg' }}
                  />
                </BookmarkPopover>
                <IconButton
                  variant='ghost'
                  icon='share-outline'
                  ariaLabel='share'
                  size={{ '@bp1': 'base', '@bp4': 'lg' }}
                />
              </HStack>
            </VStack>
          </Container>
        </Box>
      </VStack>
    </FeedContextProvider>
  );
}
Content.displayName = 'FeedContent';

export default Content;
