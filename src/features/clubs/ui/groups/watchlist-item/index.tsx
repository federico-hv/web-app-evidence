import {
  HStack,
  Avatar,
  Text,
  VStack,
  Countdown,
  theme,
  Circle,
} from '@holdr-ui/react';
import { WatchlistItemProps } from './types';
import {
  Asset,
  blink,
  TextGroup,
  TextGroupSubheading,
} from '../../../../../shared';
import FollowCountItem from '../../../../../features/relationships/ui/follow-count-item';
import millify from 'millify';

function WatchlistItem({
  data,
}:
  | WatchlistItemProps
  | { data: any; followers?: number; following?: number }) {
  return (
    <HStack
      w='100%'
      gap={4}
      p={1}
      radius={2}
      items='center'
      _hover={{ background: '#9898FF26', cursor: 'pointer' }}
      css={{
        transition: theme.transitions['duration-normal'],
      }}
    >
      <Avatar
        name={data.name}
        src={data.coverImage}
        css={{ size: '60px' }}
        variant='squircle'
      />
      <VStack gap={1} w='100%' h='80%'>
        <HStack
          gap={2}
          justify='space-between'
          items='center'
          w='100%'
          h='100%'
        >
          <Text size={2} weight={500} aria-label='watchlist-item name'>
            {data.name}
          </Text>
          {data.endDate && (
            <HStack items='center' gap={2} role='live-blinker'>
              <Circle
                size='6px'
                css={{
                  backgroundColor: '#34C05A',
                  animation: `1s ease 0s infinite normal none running ${blink}`,
                }}
              />
              <Text
                size={2}
                css={{
                  color: '#34C05A',
                }}
              >
                LIVE
              </Text>
            </HStack>
          )}
        </HStack>
        <HStack justify='space-between'>
          <TextGroup fontSize={1} gap={0}>
            <TextGroupSubheading
              weight={300}
              color='white700'
              aria-label='watchlist-item price title'
            >
              {data.endDate ? 'Entry Price' : 'Followers'}
            </TextGroupSubheading>
            <TextGroupSubheading
              weight={400}
              aria-label='watchlist-item price'
            >
              {data.endDate
                ? `$${data.price.toFixed(2)} USD`
                : millify(data.followers, { precision: 2 })}
            </TextGroupSubheading>
          </TextGroup>
          {data.endDate && (
            <VStack gap={0} flex={1}>
              <TextGroupSubheading
                size={1}
                weight={300}
                color='white700'
                aria-label='watchlist-item timeleft title'
              >
                Time Left
              </TextGroupSubheading>

              <Countdown
                size='sm'
                targetDate={data.endDate}
                color='white500'
              />
            </VStack>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}

WatchlistItem.displayName = 'WatchlistItem';

export default WatchlistItem;
