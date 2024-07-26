import { PostModel, useFeedContext } from '../../../shared';
import { Avatar, Box, Card, HStack, Text, VStack } from '@holdr-ui/react';
import {
  DateUtility,
  LinkOverlay,
  prefix,
  TextGroup,
} from '../../../../../shared';
import { capitalize } from 'lodash';
import { useCurrentUser } from '../../../../auth';
import { FeedOwnerMoreButton, GeneralPostMoreButton } from '../../buttons';
import { PostMedia, Polls } from '../../groups';
import FeedLikeGroup from './feed-like-group';
import FeedShareGroup from './feed-share-group';
import FeedBookmarkGroup from './feed-bookmark-group';
import FeedCommentGroup from './feed-comment-group';

function PostCard({ data }: { data: PostModel }) {
  const currentUser = useCurrentUser();
  const { owner, createdAt } = useFeedContext();

  console.log(owner);

  return (
    <Card boxShadow='none' gap={3}>
      <Card.Header
        px={{ '@bp1': 3, '@bp3': 4 }}
        pt={{ '@bp1': 3, '@bp3': 4 }}
        direction='horizontal'
        justify='space-between'
      >
        <HStack gap={3} position='relative'>
          <LinkOverlay to={prefix('/clubs/', owner.username)} />
          <VStack>
            <Avatar
              variant='squircle'
              src={owner.avatar}
              css={{
                size: '55px',
              }}
              name={owner.displayName}
            />
          </VStack>
          <TextGroup>
            <TextGroup.Heading
              weight={500}
              css={{
                fontSize: '14px',
              }}
            >
              {owner.displayName}
            </TextGroup.Heading>
            <TextGroup.Subheading
              color='base300'
              weight={400}
              css={{
                fontSize: '12px',
              }}
            >
              {capitalize(DateUtility.fromNow(createdAt))} ago
            </TextGroup.Subheading>
          </TextGroup>
        </HStack>

        <Box position='relative' css={{ zIndex: 5 }}>
          {currentUser && currentUser.id === owner.id ? (
            <FeedOwnerMoreButton />
          ) : (
            <GeneralPostMoreButton />
          )}
        </Box>
      </Card.Header>
      <Card.Body
        px={{ '@bp1': 3, '@bp3': 4 }}
        // py={{ '@bp1': 4, '@bp3': 6 }}
        position='relative'
      >
        <Box
          mb={{ '@bp1': 3, '@bp3': 4 }}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>{data.description}</Text>
        {data.media && <PostMedia items={data.media} />}
        {data.polls && (
          <Polls id={data.id} endDate={data.endDate} items={data.polls} />
        )}
        <Box
          mt={{ '@bp1': 3, '@bp3': 4 }}
          h='1px'
          w='100%'
          css={{
            backgroundColor: 'rgba(152, 152, 255, 0.10)',
          }}
        />
      </Card.Body>
      <Card.Footer
        px={{ '@bp1': 3, '@bp3': 4 }}
        pb={{ '@bp1': 3, '@bp3': 4 }}
        direction='horizontal'
        items='center'
        w='100%'
        gap={6}
      >
        <FeedLikeGroup />
        <FeedCommentGroup />
        <FeedShareGroup />
        <FeedBookmarkGroup />
      </Card.Footer>
    </Card>
  );
}
PostCard.displayName = 'PostCard';

export default PostCard;
