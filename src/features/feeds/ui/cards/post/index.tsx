import { PostModel, useFeedContext } from '../../../shared';
import {
  Avatar,
  Box,
  Card,
  Countdown,
  HStack,
  Icon,
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
import FeedLikeGroup from './feed-like-group';
import FeedBookmarkGroup from './feed-bookmark-group';
import FeedCommentGroup from './feed-comment-group';
import { Fragment } from 'react';
import dayjs from 'dayjs';
import { PollsProps } from '../../groups/polls/types';

function PollTimer({ endDate }: { endDate?: Date | null }) {
  const expired = dayjs(dayjs()).isAfter(endDate);

  return (
    <Fragment>
      {!expired && !!endDate && (
        <Fragment>
          <HStack fontSize={2} gap={2} color='white700' items='center'>
            <Icon name='time-outline' size='sm' />
            {/*<Text size={2} color='base400'>*/}
            {/*  Ends in*/}
            {/*</Text>*/}
            <Countdown
              color='white700'
              size='sm'
              targetDate={dayjs(endDate, 'x').toDate()}
            />
          </HStack>
        </Fragment>
      )}
    </Fragment>
  );
}

function PollVotesCount({ id, items, endDate }: PollsProps) {
  const user = useCurrentUser();

  const { owner } = useFeedContext();

  const voted = items.reduce((prev, curr) => prev || curr.voted, false);

  const total = items.reduce((prev, curr) => prev + curr.count, 0);

  const expired = dayjs(dayjs()).isAfter(endDate);

  return (
    <Fragment>
      {(voted || expired || user?.id === owner.id) && (
        <HStack
          fontSize={2}
          gap={2}
          items='center'
          w='fit-content'
          css={{ userSelect: 'none' }}
          {...(user?.id === owner.id && {
            _hover: {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
            // onClick: onOpen,
          })}
        >
          {/*<Icon name='poll-fill' color='base400' />*/}
          <HStack color='white700' items='center' gap={1}>
            <Text weight={500}>{total}</Text>
            <Text weight={300}>{total > 1 ? 'votes' : 'vote'}</Text>
          </HStack>
        </HStack>
      )}
    </Fragment>
  );
}

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
        <Box position='relative'>
          <LinkOverlay to={prefix('/clubs/', owner.username)} />
          <HStack gap={3}>
            <Avatar
              variant='squircle'
              src={owner.avatar}
              css={{
                size: '55px',
              }}
              name={owner.displayName}
            />

            <VStack>
              <HStack gap={1} css={{ fontSize: '$2', fontWeight: 500 }}>
                {owner.displayName}
                <Icon name='verified-fill' color='purple500' />
              </HStack>
              <Text color='base300' weight={400} size={1}>
                {capitalize(DateUtility.fromNow(createdAt))} ago
              </Text>
            </VStack>
          </HStack>
        </Box>

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
        {data.polls && data.polls.length > 0 && (
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
        justify='space-between'
        w='100%'
      >
        <HStack gap={2} items='center'>
          <FeedLikeGroup />
          <FeedCommentGroup />
          {/*<FeedShareGroup />*/}
          <FeedBookmarkGroup />
        </HStack>
        {data.polls?.find((item) => item.voted) ? (
          <PollVotesCount
            id={data.id}
            endDate={data.endDate}
            items={data.polls}
          />
        ) : (
          <PollTimer endDate={data.endDate} />
        )}
      </Card.Footer>
    </Card>
  );
}
PostCard.displayName = 'PostCard';

export default PostCard;
