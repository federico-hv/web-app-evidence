import {
  IMAGE_GRID,
  ImageSizes,
  PostModel,
  IPostMedia,
  IPoll,
  useFeedContext,
  useVotePoll,
  Reaction,
} from '../shared';
import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Circle,
  Countdown,
  Grid,
  HStack,
  Icon,
  Image,
  Skeleton,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  DateUtility,
  extraBtnPadding,
  LinkOverlay,
  Loader,
  MediaItem,
  Menu,
  prefix,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
} from '../../../shared';
import { theme } from '../../../configs';
import { capitalize } from 'lodash';
import {
  useCreateRelationshipAction,
  useRelationshipStatusInfo,
  useRemoveRelationshipAction,
} from '../../relationships';
import dayjs from 'dayjs';

import pollAlt from '../../../assets/images/poll-alt.png';
import ReactionPopover from './reaction-popover';

function PollResponse({ data, total }: { data: IPoll; total: number }) {
  const percentage = !total ? 0 : (data.count / total) * 100;

  return (
    <HStack
      items='center'
      gap={3}
      p={3}
      radius={4}
      position='relative'
      overflow='hidden'
      css={{ userSelect: 'none' }}
    >
      {data.voted ? (
        <Circle zIndex={10} size={20} bgColor='secondary400'>
          <Icon size='sm' color='primary400' name='check' />
        </Circle>
      ) : (
        <Circle
          zIndex={10}
          border={1}
          borderColor='secondary400'
          size={20}
          // bgColor='base100'
        />
      )}
      <Box
        position='absolute'
        role='progressbar'
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={parseInt(percentage.toFixed(0))}
        t={0}
        l={0}
        h='100%'
        w={`${percentage.toFixed(0)}%`}
        css={{ backgroundColor: '#ECECFF' }}
      />
      <VStack w='100%' gap={2} zIndex={10}>
        <HStack justify='space-between'>
          <Text color='secondary400' weight={data.voted ? 500 : 400}>
            {data.text}
          </Text>
          <Text weight={500} color='base400'>
            {percentage.toFixed(0)}%
          </Text>
        </HStack>
      </VStack>
    </HStack>
  );
}

function PollAnswer({
  data,
  action,
}: {
  data: IPoll;
  action: VoidFunction;
}) {
  return (
    <Center
      onClick={action}
      cursor='pointer'
      role='button'
      p={3}
      border={1}
      radius='full'
      borderColor='base200'
      position='relative'
      overflow='hidden'
      _hover={{
        backgroundColor: '$base100',
      }}
      css={{
        userSelect: 'none',
        '&:active': {
          scale: 0.95,
          transition: `all ${theme.transitions['duration-normal']} linear`,
        },
      }}
    >
      {/** 👇🏾 Label */}
      <Text weight={500} noOfLines={1} css={{ zIndex: 10 }}>
        {data.text}
      </Text>
    </Center>
  );
}

function Polls({
  id,
  items,
  endDate,
}: {
  items: IPoll[];
  id: number;
  endDate?: Date | null;
}) {
  const { feedId } = useFeedContext();

  const { votePoll, loading } = useVotePoll();
  // parse poll to check whether there is a vote or not
  const voted = items.reduce((prev, curr) => prev || curr.voted, false);
  // total number of votes
  const total = items.reduce((prev, curr) => prev + curr.count, 0);

  const notExpired = dayjs(dayjs()).isBefore(endDate);

  return (
    <Loader
      loading={loading}
      h='fit-content'
      as={
        <VStack w='100%' gap={3} mt={4}>
          {items.map(({ id }) => (
            <Box
              key={`loader-${id}`}
              w='100%'
              radius='full'
              overflow='hidden'
            >
              <Skeleton h='29px' />
            </Box>
          ))}
        </VStack>
      }
    >
      <VStack gap={5}>
        <VStack gap={3} mt={5}>
          {items.map((data) => (
            <SwitchConditional key={`poll-${data.id}`}>
              <SwitchConditionalCase on={!voted}>
                <PollAnswer
                  action={async () =>
                    votePoll(feedId, id, data.id as number)
                  }
                  data={data}
                />
              </SwitchConditionalCase>
              <SwitchConditionalCase
                on={voted || (!!endDate && !notExpired)}
              >
                <PollResponse total={total} data={data} />
              </SwitchConditionalCase>
            </SwitchConditional>
          ))}
        </VStack>
        {voted || !notExpired ? (
          <HStack
            fontSize={2}
            gap={2}
            items='flex-end'
            css={{ userSelect: 'none' }}
          >
            <Image size={16} alt='' src={pollAlt} />
            <Text color='base400'>
              {total} {total > 1 ? 'people' : 'person'} voted
            </Text>
          </HStack>
        ) : (
          <SwitchConditional>
            <SwitchConditionalCase on={!!endDate}>
              <HStack fontSize={2} gap={2} items='center'>
                <Icon name='time-outline' size='base' />
                <Text size={2} color='base400'>
                  Ends in
                </Text>
                <Countdown
                  size='sm'
                  targetDate={dayjs(endDate, 'x').toDate()}
                />
              </HStack>
            </SwitchConditionalCase>
          </SwitchConditional>
        )}
      </VStack>
    </Loader>
  );
}

function Media({ items }: { items: IPostMedia[] }) {
  return (
    <>
      {items.length > 0 && (
        <Box h={350} mt={5}>
          <Grid
            gap={3}
            h='100%'
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(2, 1fr)'
          >
            {items.length <= 4 &&
              IMAGE_GRID[items.length as ImageSizes].map(
                ({ rowSpan, colSpan }, index) => (
                  <Grid.Item
                    rowSpan={rowSpan}
                    colSpan={colSpan}
                    key={`image-grid-${index}`}
                  >
                    <Box radius={2} h='100%' w='100%' overflow='hidden'>
                      <MediaItem
                        url={items[index].url}
                        type={items[index].type}
                      />
                    </Box>
                  </Grid.Item>
                ),
              )}
          </Grid>
        </Box>
      )}
    </>
  );
}

function MoreButton() {
  const { owner } = useFeedContext();
  const { loading, data } = useRelationshipStatusInfo(owner.username);
  const { mute, follow } = useCreateRelationshipAction();
  const { unfollow, unmute } = useRemoveRelationshipAction();

  return (
    <Loader loading={loading}>
      {data && (
        <Menu>
          <Menu.Trigger />
          <Menu.Header />
          <Menu.Content>
            {data.relationshipStatusInfo.isFollowing ? (
              <Menu.Item
                action={() => unfollow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack gap={2}>
                  Unfollow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => follow(owner.username)}
                icon='user-unfollow-outline'
              >
                <HStack gap={2}>
                  Follow <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            {data.relationshipStatusInfo.isMuted ? (
              <Menu.Item
                action={() => unmute(owner.username)}
                icon='mute-fill'
              >
                <HStack gap={2}>
                  Unmute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            ) : (
              <Menu.Item
                action={() => mute(owner.username)}
                icon='mute-outline'
              >
                <HStack gap={2}>
                  Mute <Text weight={500}>@{owner.username}</Text>
                </HStack>
              </Menu.Item>
            )}
            <Menu.Item icon='eye-hide' label='Hide post' />
            <Menu.Item
              icon='report-outline'
              label='Report post'
              dangerous
            />
          </Menu.Content>
        </Menu>
      )}
    </Loader>
  );
}

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
