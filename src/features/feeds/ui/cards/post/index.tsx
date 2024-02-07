import { PostModel, useFeedContext } from '../../../shared';
import {
  Avatar,
  Box,
  Card,
  HStack,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
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

function PostCard({ data }: { data: PostModel }) {
  const currentUser = useCurrentUser();
  const { owner, createdAt } = useFeedContext();

  return (
    <Card boxShadow='none' gap={3}>
      <Card.Header
        px={{ '@bp1': 3, '@bp3': 4 }}
        pt={{ '@bp1': 3, '@bp3': 4 }}
        direction='horizontal'
        justify='space-between'
      >
        <HStack gap={3} position='relative'>
          <LinkOverlay to={prefix('/', owner.username)} />
          <VStack>
            <Avatar
              // size={{ '@bp1': 'base', '@bp3': 'lg' }}
              variant='squircle'
              src={owner.avatar}
              css={{
                size: '55px',
              }}
              // name={owner.displayName}
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
        // py={{ '@bp1': 2, '@bp3': 3 }}
        direction='horizontal'
        items='center'
        w='100%'
        gap={7}
      >
        <HStack items='center' gap={2} zIndex={5}>
          <IconButton
            variant='ghost'
            colorTheme='white50'
            icon='heart-outline'
            ariaLabel='like post'
          />
          <Box cursor='pointer'>0</Box>
        </HStack>
        <HStack items='center' gap={2} zIndex={5}>
          <IconButton
            variant='ghost'
            colorTheme='white50'
            icon='chat-alt-outline'
            ariaLabel='view comments'
          />
          <Box cursor='pointer'>0</Box>
        </HStack>
        <HStack items='center' gap={2} zIndex={5}>
          <IconButton
            variant='ghost'
            colorTheme='white50'
            icon='bookmark-outline'
            ariaLabel='bookmark feed'
          />
          <Box cursor='pointer'>0</Box>
        </HStack>
      </Card.Footer>
    </Card>
  );
}
PostCard.displayName = 'PostCard';

export default PostCard;
