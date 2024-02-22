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
  blink,
  TextGroup,
  TextGroupSubheading,
} from '../../../../../shared';


function WatchlistItem({ data }: WatchlistItemProps) {

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
      <Avatar css={{ size: '60px' }} variant='squircle'/>
      <VStack gap={1} w='100%' h='80%'>
        <HStack
          gap={2}
          justify='space-between'
          items='center'
          w='100%'
          h='100%'
        >
          <Text size={2} weight={500} aria-label='watchlist-item name' >
            {data.name}
          </Text>
          {data.endDate && (
            <HStack items='center' gap={2} role="live-blinker">
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
            <TextGroupSubheading weight={300} color='white700' aria-label='watchlist-item price title' >
              {data.endDate ? 'Entry Price' : 'Buy Now'}
            </TextGroupSubheading>
            <TextGroupSubheading weight={400} aria-label='watchlist-item price' >
              {`$${data.price.toFixed(2)} USD`}
            </TextGroupSubheading>
          </TextGroup>
          {data.endDate && (
            <VStack gap={0} flex={1}>
              <TextGroupSubheading size={1} weight={300} color='white700' aria-label='watchlist-item timeleft title' >
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
