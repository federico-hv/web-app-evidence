import { PostModel, useFeedContext, Reaction } from '../../../shared';
import {
  Avatar,
  Box,
  Button,
  Card,
  HStack,
  IconButton,
  Text,
} from '@holdr-ui/react';
import {
  DateUtility,
  extraBtnPadding,
  LinkOverlay,
  prefix,
  Responsive,
  ResponsiveItem,
  TextGroup,
} from '../../../../../shared';
import { capitalize } from 'lodash';
import { useCurrentUser } from '../../../../auth';
import { BookmarkPopover } from '../../../../bookmarks';
import { FeedOwnerMoreButton, GeneralPostMoreButton } from '../../buttons';
import { ReactionPopover } from '../../popovers';
import { PostMedia, Polls } from '../../groups';

function PostCard({ data }: { data: PostModel }) {
  const currentUser = useCurrentUser();
  const { owner, createdAt, reaction, bookmarked } = useFeedContext();
  return (
    <Card>
      <Card.Header
        borderBottom={1}
        borderColor='base100'
        p={{ '@bp1': 3, '@bp3': 4 }}
        direction='horizontal'
        justify='space-between'
      >
        <HStack gap={4} position='relative'>
          <LinkOverlay to={prefix('/', owner.username)} />
          <Avatar
            size={{ '@bp1': 'base', '@bp3': 'xl' }}
            variant='squircle'
            src={owner.avatar}
            name={owner.displayName}
          />
          <TextGroup gap={1}>
            <TextGroup.Heading size={{ '@bp1': 2, '@bp3': 3 }}>
              {owner.displayName}
            </TextGroup.Heading>
            <TextGroup.Subheading color='base400' size={1} weight={500}>
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
        py={{ '@bp1': 4, '@bp3': 6 }}
        position='relative'
      >
        <Text size={{ '@bp1': 2, '@bp3': 3 }}>{data.description}</Text>
        {data.media && <PostMedia items={data.media} />}
        {data.polls && (
          <Polls id={data.id} endDate={data.endDate} items={data.polls} />
        )}
      </Card.Body>
      <Card.Footer
        px={{ '@bp1': 3, '@bp3': 4 }}
        py={{ '@bp1': 2, '@bp3': 3 }}
        borderTop={1}
        borderColor='base100'
        direction='horizontal'
        items='center'
        justify='space-between'
        w='100%'
      >
        <Box w={{ '@bp3': '100%', '@bp1': undefined }} css={{ zIndex: 5 }}>
          <ReactionPopover>
            <Responsive>
              <ResponsiveItem mobile='show'>
                <IconButton
                  icon={
                    reaction ? Reaction[reaction].icon : 'reaction-add'
                  }
                  variant='ghost'
                  colorTheme='base600'
                  ariaLabel={reaction ? Reaction[reaction].name : 'React'}
                />
              </ResponsiveItem>
              <ResponsiveItem fullWidth laptop='show' desktop='show'>
                <Button
                  fullWidth
                  leftIcon={
                    reaction ? Reaction[reaction].icon : 'reaction-add'
                  }
                  className={extraBtnPadding()}
                  variant='ghost'
                  colorTheme='base600'
                >
                  {reaction ? Reaction[reaction].name : 'React'}
                </Button>
              </ResponsiveItem>
            </Responsive>
          </ReactionPopover>
        </Box>

        <Box
          w={{ '@bp3': '100%', '@bp1': undefined }}
          position='relative'
          css={{ zIndex: 5 }}
        >
          <BookmarkPopover>
            <Responsive>
              <ResponsiveItem mobile='show'>
                <IconButton
                  ariaLabel={
                    !bookmarked ? 'create bookmark' : 'remove bookmark'
                  }
                  icon={!bookmarked ? 'bookmark-outline' : 'bookmark-fill'}
                  variant='ghost'
                  colorTheme='base600'
                />
              </ResponsiveItem>
              <ResponsiveItem fullWidth laptop='show' desktop='show'>
                <Button
                  fullWidth
                  leftIcon={
                    !bookmarked ? 'bookmark-outline' : 'bookmark-fill'
                  }
                  className={extraBtnPadding()}
                  variant='ghost'
                  colorTheme='base600'
                >
                  Bookmark
                </Button>
              </ResponsiveItem>
            </Responsive>
          </BookmarkPopover>
        </Box>

        <Box
          w={{ '@bp3': '100%', '@bp1': undefined }}
          position='relative'
          css={{ zIndex: 5 }}
        >
          <Responsive>
            <ResponsiveItem mobile='show'>
              <IconButton
                icon='share-outline'
                ariaLabel='Bookmark'
                variant='ghost'
                colorTheme='base600'
              />
            </ResponsiveItem>
            <ResponsiveItem fullWidth laptop='show' desktop='show'>
              <Button
                leftIcon='share-outline'
                fullWidth
                className={extraBtnPadding()}
                variant='ghost'
                colorTheme='base600'
              >
                Share
              </Button>
            </ResponsiveItem>
          </Responsive>
        </Box>
      </Card.Footer>
    </Card>
  );
}
PostCard.displayName = 'PostCard';

export default PostCard;
