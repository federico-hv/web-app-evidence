import { PostModel, useFeedContext, Reaction } from '../../shared';
import { Avatar, Button, Card, HStack, Text } from '@holdr-ui/react';
import {
  DateUtility,
  extraBtnPadding,
  LinkOverlay,
  prefix,
  TextGroup,
} from '../../../../shared';
import { capitalize } from 'lodash';
import ReactionPopover from '../reaction-popover';
import MoreButton from './more.button';
import Media from './media';
import Polls from './polls';

function PostCard({ data }: { data: PostModel }) {
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
          <Avatar size='xl' variant='squircle' src={owner.avatar} />
          <TextGroup gap={1}>
            <TextGroup.Heading size={3}>
              {owner.displayName}
            </TextGroup.Heading>
            <TextGroup.Subheading color='base400' size={1} weight={500}>
              {capitalize(DateUtility.fromNow(createdAt))} ago
            </TextGroup.Subheading>
          </TextGroup>
        </HStack>
        <MoreButton />
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
        justify='evenly'
      >
        <ReactionPopover>
          <Button
            fullWidth
            leftIcon={
              reaction ? Reaction[reaction.name].icon : 'reaction-add'
            }
            className={extraBtnPadding()}
            variant='ghost'
            colorTheme='base600'
          >
            {reaction ? Reaction[reaction.name].name : 'React'}
          </Button>
        </ReactionPopover>
        <Button
          fullWidth
          leftIcon='bookmark-outline'
          className={extraBtnPadding()}
          variant='ghost'
          colorTheme='base600'
        >
          Bookmark
        </Button>
        <Button
          fullWidth
          leftIcon='share-outline'
          className={extraBtnPadding()}
          variant='ghost'
          colorTheme='base600'
        >
          Share
        </Button>
      </Card.Footer>
    </Card>
  );
}
PostCard.displayName = 'PostCard';

export default PostCard;
