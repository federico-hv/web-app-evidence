import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import {
  ArticleModel,
  FeedContextProvider,
  FeedModel,
  GET_FEED,
  PostModel,
  Reaction,
  ReactionPopover,
} from '../../../features';
import {
  DateUtility,
  Error,
  Head,
  LinkText,
  Loader,
  NotFoundError,
  prefix,
  TextGroup,
  useMenuNavigate,
} from '../../../shared';
import {
  Avatar,
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  VStack,
} from '@holdr-ui/react';
import { capitalize } from 'lodash';
import Statistic from './statistic';
import PostContent from './post.content';
import ArticleContent from './article.content';
import MoreOptionsButton from './more-options.button';

function FeedContent() {
  const { id } = useParams();
  const { loading, error, data } = useQuery<
    { feed: FeedModel },
    { id: string }
  >(GET_FEED, { variables: { id: id || '' } });

  const { goto } = useMenuNavigate();

  return (
    <Error hasError={!!error} errorEl={<NotFoundError />}>
      <Loader loading={loading}>
        {data && data.feed ? (
          <FeedContextProvider
            value={{
              owner: data.feed.owner,
              feedId: data.feed.id as string,
              reaction: data.feed.reaction,
              createdAt: data.feed.createdAt,
            }}
          >
            <Head
              prefix={`${data.feed.owner.displayName} -`}
              title={data.feed.node.description}
              description={data.feed.node.description}
            />
            <Box
              borderBottom={2}
              bgColor='clearTint500'
              borderColor='base100'
              position='sticky'
              t={65}
              css={{
                zIndex: 10,
                blur: '12px',
              }}
            >
              <Container maxWidth={600} py={4}>
                <HStack gap={3}>
                  <IconButton
                    size='lg'
                    onClick={goto.back}
                    variant='ghost'
                    icon='arrow-left-outline'
                    ariaLabel='go back'
                  />
                  <VStack>
                    <Heading size={4} weight={500} as='h2'>
                      Feed
                    </Heading>
                    <LinkText
                      to={prefix('/', data.feed.owner.username)}
                      size={1}
                      color='base400'
                    >
                      @{data.feed.owner.username}
                    </LinkText>
                  </VStack>
                </HStack>
              </Container>
            </Box>
            <VStack>
              <Box borderBottom={2} borderColor='base100'>
                <Container maxWidth={600} py={4} borderColor='base100'>
                  <VStack gap={{ '@bp1': 3, '@bp3': 5 }} w='full'>
                    <HStack justify='space-between'>
                      <HStack gap={3}>
                        <Avatar
                          variant='squircle'
                          size='xl'
                          src={data.feed.owner.avatar}
                          name={data.feed.owner.displayName}
                        />
                        <TextGroup gap={1}>
                          <TextGroup.Heading weight={500} size={3}>
                            {data.feed.owner.displayName}
                          </TextGroup.Heading>
                          <TextGroup.Subheading
                            color='base400'
                            size={1}
                            weight={500}
                          >
                            {capitalize(
                              DateUtility.fromNow(data.feed.createdAt),
                            )}{' '}
                            ago
                          </TextGroup.Subheading>
                        </TextGroup>
                      </HStack>
                      <MoreOptionsButton type={data.feed.type} />
                    </HStack>
                    {data.feed.type === 'post' ? (
                      <PostContent data={data.feed.node as PostModel} />
                    ) : (
                      <ArticleContent
                        data={data.feed.node as ArticleModel}
                      />
                    )}
                    <HStack
                      gap={{ '@bp1': 3, '@bp3': 5 }}
                      p={{ '@bp1': 4, '@bp3': 5 }}
                      bgColor='base100'
                      w='full'
                      radius={3}
                    >
                      <Statistic value={5000003} label='Views' />
                      <Statistic value={100000} label='Reactions' />
                      <Statistic value={4093} label='Bookmarks' />
                    </HStack>
                    <HStack gap={5}>
                      <ReactionPopover>
                        <IconButton
                          size={{ '@bp1': 'base', '@bp4': 'lg' }}
                          icon={
                            data.feed.reaction
                              ? Reaction[data.feed.reaction.name].icon
                              : 'reaction-add'
                          }
                          variant='ghost'
                          colorTheme='base600'
                          ariaLabel={
                            data.feed.reaction
                              ? Reaction[data.feed.reaction.name].name
                              : 'React'
                          }
                        />
                      </ReactionPopover>
                      <IconButton
                        variant='ghost'
                        icon='bookmark-outline'
                        ariaLabel='bookmark'
                        size={{ '@bp1': 'base', '@bp4': 'lg' }}
                      />
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
        ) : (
          <NotFoundError />
        )}
      </Loader>
    </Error>
  );
}
FeedContent.displayName = 'FeedContent';

export default FeedContent;
