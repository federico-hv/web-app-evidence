import { PostModel, useFeedContext, Reaction } from '../../shared';
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
} from '../../../../shared';
import { capitalize } from 'lodash';
import ReactionPopover from '../reaction-popover';
import GeneralMoreButton from './general-more.button';
import Media from './media';
import Polls from './polls';
import { useCurrentUser } from '../../../auth';
import OwnerMoreButton from '../owner-more.button';

function PostCard({ data }: { data: PostModel }) {
  const currentUser = useCurrentUser();
  const { owner, createdAt, reaction } = useFeedContext();
  return (
    <Card>
      <Card.Header
        borderBottom={1}
        borderColor='base100'
        p={4}
        direction='horizontal'
        justify='space-between'
      >
        <HStack gap={4} position='relative'>
          <LinkOverlay to={prefix('/', owner.username)} />
          <Avatar
            size='xl'
            variant='squircle'
            src={owner.avatar}
            name={owner.displayName}
          />
          <TextGroup gap={1}>
            <TextGroup.Heading size={3}>
              {owner.displayName}
            </TextGroup.Heading>
            <TextGroup.Subheading color='base400' size={1} weight={500}>
              {capitalize(DateUtility.fromNow(createdAt))} ago
            </TextGroup.Subheading>
          </TextGroup>
        </HStack>

        <Box position='relative' css={{ zIndex: 5 }}>
          {currentUser && currentUser.id === owner.id ? (
            <OwnerMoreButton />
          ) : (
            <GeneralMoreButton />
          )}
        </Box>
      </Card.Header>
      <Card.Body px={4} py={6}>
        <Text>{data.description}</Text>
        {data.media && <Media items={data.media} />}
        {data.polls && (
          <Polls id={data.id} endDate={data.endDate} items={data.polls} />
        )}
      </Card.Body>
      <Card.Footer
        px={4}
        py={3}
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
                  size='lg'
                  icon={
                    reaction
                      ? Reaction[reaction.name].icon
                      : 'reaction-add'
                  }
                  variant='ghost'
                  colorTheme='base600'
                  ariaLabel={
                    reaction ? Reaction[reaction.name].name : 'React'
                  }
                />
              </ResponsiveItem>
              <ResponsiveItem fullWidth mobile='hide' tablet='show'>
                <Button
                  fullWidth
                  leftIcon={
                    reaction
                      ? Reaction[reaction.name].icon
                      : 'reaction-add'
                  }
                  className={extraBtnPadding()}
                  variant='ghost'
                  colorTheme='base600'
                >
                  {reaction ? Reaction[reaction.name].name : 'React'}
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
          <Responsive>
            <ResponsiveItem mobile='show'>
              <IconButton
                icon='bookmark-outline'
                ariaLabel='Bookmark'
                variant='ghost'
                colorTheme='base600'
                size='lg'
              />
            </ResponsiveItem>
            <ResponsiveItem fullWidth mobile='hide' tablet='show'>
              <Button
                fullWidth
                leftIcon='bookmark-outline'
                className={extraBtnPadding()}
                variant='ghost'
                colorTheme='base600'
              >
                Bookmark
              </Button>
            </ResponsiveItem>
          </Responsive>
        </Box>

        <Box
          w={{ '@bp3': '100%', '@bp1': undefined }}
          position='relative'
          css={{ zIndex: 5 }}
        >
          <Responsive>
            <ResponsiveItem mobile='show'>
              <IconButton
                size='lg'
                icon='share-outline'
                ariaLabel='Bookmark'
                variant='ghost'
                colorTheme='base600'
              />
            </ResponsiveItem>
            <ResponsiveItem fullWidth mobile='hide' tablet='show'>
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
