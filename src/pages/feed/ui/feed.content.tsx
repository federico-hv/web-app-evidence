import {
  ArticleModel,
  BookmarkPopover,
  FeedContextProvider,
  FeedModel,
  PostModel,
  Reaction,
  ReactionPopover,
} from '../../../features';
import {
  arrayFrom,
  DateUtility,
  ErrorFallback,
  GeneralContextProvider,
  GenericProps,
  GQLRenderer,
  Head,
  LinkOverlay,
  prefix,
  TextGroup,
  useGeneralContext,
} from '../../../shared';
import {
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
  Skeleton,
  VStack,
} from '@holdr-ui/react';
import { capitalize } from 'lodash';
import Statistic from './statistic';
import PostContent from './post.content';
import ArticleContent from './article.content';
import { FeedReactionUsersDialog } from './index';
import { useState } from 'react';

type Options = 'reactions' | 'views' | 'bookmarks' | undefined;

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
  const [state, setState] = useState<Options>();

  const update = (newState: Options) => setState(newState);

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
      <GeneralContextProvider value={{ state, update }}>
        <StatisticsWrapper>
          <Statistic name='views' />
          <Statistic name='reactions' action={() => update('reactions')} />
          <Statistic name='bookmarks' />
        </StatisticsWrapper>
        <FeedReactionUsersDialog />
      </GeneralContextProvider>
    </GQLRenderer>
  );
}

function FeedContent() {
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
                {/*<MoreOptionsButton type.ts={state.type.ts} />*/}
              </HStack>
              {state.type === 'post' ? (
                <PostContent data={state.node as PostModel} />
              ) : (
                <ArticleContent data={state.node as ArticleModel} />
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
FeedContent.displayName = 'FeedContent';

export default FeedContent;
