import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { capitalize } from 'lodash';
import {
  DateUtility,
  LinkOverlay,
  prefix,
  TextGroup,
} from '../../../../../shared';
import { ArticleModel, Reaction, useFeedContext } from '../../../shared';
import { useCurrentUser } from '../../../../auth';
import { BookmarkPopover } from '../../../../bookmarks';
import {
  FeedOwnerMoreButton,
  GeneralArticleMoreButton,
} from '../../buttons';
import { ReactionPopover } from '../../popovers';
//import ProfileHoverCard from '../profile.hovercard';

// `https://logo.clearbit.com/${domainUrl}` logo finder

function ArticleCard({ data }: { data: ArticleModel }) {
  const location = useLocation();
  const currentUser = useCurrentUser();
  const { owner, createdAt, reaction, feedId, bookmarked } =
    useFeedContext();

  return (
    <VStack gap={3}>
      <Card
        bgImageUrl={data.imageUrl}
        h={{ '@bp1': '450px', '@bp3': '550px' }}
      >
        <Card.Header
          p={4}
          direction='horizontal'
          justify='space-between'
          position='relative'
          css={{ zIndex: 5 }}
        >
          <Link to={prefix('/', owner.username)}>
            <VStack>
              <Avatar
                size={{ '@bp1': 'base', '@bp3': 'xl' }}
                variant='squircle'
                src={owner.avatar}
                name={owner.displayName}
              />
            </VStack>
          </Link>
          {currentUser && currentUser.id === owner.id ? (
            <FeedOwnerMoreButton ghost />
          ) : (
            <GeneralArticleMoreButton />
          )}
        </Card.Header>
        <Card.Footer
          p={4}
          bgColor='darkTint400'
          position='absolute'
          b={0}
          w='100%'
          css={{
            blur: '12px',
            borderBottomRadius: '$4',
            zIndex: 5,
          }}
        >
          <Box position='relative'>
            <LinkOverlay to={`/${owner.username}/feeds/${feedId}`} />
            <VStack
              gap={4}
              divider={<Box borderBottom={1} borderColor='base500' />}
            >
              <VStack gap={3}>
                <TextGroup>
                  <TextGroup.Subheading
                    size={1}
                    weight={500}
                    color='base200'
                  >
                    {capitalize(DateUtility.fromNow(createdAt))} ago
                  </TextGroup.Subheading>
                  <TextGroup.Heading
                    size={{ '@bp1': 3, '@bp3': 4 }}
                    color='primary400'
                    as='h2'
                    noOfLines={2}
                  >
                    {data.title}
                  </TextGroup.Heading>
                </TextGroup>
              </VStack>
              <VStack gap={5}>
                <Text
                  size={{ '@bp1': 2, '@bp3': 3 }}
                  noOfLines={2}
                  color='base100'
                >
                  {data.description}
                </Text>
                <HStack
                  justify='space-between'
                  items='center'
                  position='relative'
                  zIndex={5}
                >
                  <HStack items='center'>
                    <BookmarkPopover position='right' sideOffset={0}>
                      <IconButton
                        variant='ghost'
                        colorTheme='primary400'
                        ariaLabel={
                          !bookmarked
                            ? 'create bookmark'
                            : 'remove bookmark'
                        }
                        icon={
                          !bookmarked
                            ? 'bookmark-outline'
                            : 'bookmark-fill'
                        }
                        size={{ '@bp1': 'base', '@bp3': 'lg' }}
                      />
                    </BookmarkPopover>
                    <Box>
                      <ReactionPopover
                        alignOffset={-6}
                        sideOffset={10}
                        position='right'
                      >
                        <IconButton
                          variant='ghost'
                          colorTheme='primary400'
                          ariaLabel={reaction ? reaction : 'add reaction'}
                          icon={
                            reaction
                              ? Reaction[reaction].icon
                              : 'reaction-add'
                          }
                          size={{ '@bp1': 'base', '@bp3': 'lg' }}
                        />
                      </ReactionPopover>
                    </Box>
                  </HStack>
                  <Box>
                    <Link
                      to={data.url}
                      target='_blank'
                      state={{ from: location }}
                    >
                      <Button
                        size={{ '@bp1': 'sm', '@bp3': 'base' }}
                        colorTheme='primary400'
                      >
                        Read
                      </Button>
                    </Link>
                  </Box>
                </HStack>
              </VStack>
            </VStack>
          </Box>
        </Card.Footer>
      </Card>
      <Link to={`https://${data.source.url}`} target='_blank'>
        <HStack
          fontSize={{ '@bp1': 2, '@bp3': 3 }}
          gap={2}
          justify='flex-end'
        >
          from <Text weight={500}>{data.source.name}</Text>
        </HStack>
      </Link>
    </VStack>
  );
}
ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;
