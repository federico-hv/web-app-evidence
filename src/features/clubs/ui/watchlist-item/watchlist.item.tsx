import {
  HStack,
  Avatar,
  Text,
  VStack,
  Countdown,
  theme,
} from '@holdr-ui/react';
import { WatchlistItemProps } from './watchlist-item.types';
import {
  LiveTag,
  TextGroup,
  TextGroupSubheading,
} from '../../../../shared';

function WatchlistItem({ data }: WatchlistItemProps) {
  return (
    <HStack
      w='100%'
      gap={4}
      pl={3}
      pr={4}
      py={0}
      radius={3}
      items='center'
      _hover={{ background: '#9898FF26', cursor: 'pointer' }}
      css={{
        transition: theme.transitions['duration-normal'],
      }}
    >
      <Avatar size='xl' variant='squircle' />
      <VStack gap={1} w='100%' h='80%' py={2}>
        <HStack
          gap={2}
          justify='space-between'
          items='center'
          w='100%'
          h='100%'
        >
          <Text size={2} weight={500} data-testid='watchlist-item-name'>
            {data.name}
          </Text>
          {data.endDate && (
            <LiveTag data-testid='watchlist-item-livetag' />
          )}
        </HStack>
        <HStack justify='space-between'>
          <TextGroup gap={0}>
            <TextGroupSubheading
              size={1}
              weight={300}
              color='white700'
              data-testid='watchlist-item-endDate-title'
            >
              {data.endDate ? 'Entry Price' : 'Buy Now'}
            </TextGroupSubheading>
            <TextGroupSubheading
              size={2}
              weight={400}
              data-testid='watchlist-item-price'
            >
              {`$${data.price.toFixed(2)} USD`}
            </TextGroupSubheading>
          </TextGroup>
          {data.endDate && (
            <TextGroup gap={0} minWidth='73px'>
              <TextGroupSubheading
                size={1}
                weight={300}
                color='white700'
                data-testid='watchlist-item-timeleft-title'
              >
                Time Left
              </TextGroupSubheading>
              <Countdown
                size='sm'
                targetDate={data.endDate}
                color='white500'
                data-testid='watchlist-item-countdown'
              />
            </TextGroup>
          )}
        </HStack>
      </VStack>
    </HStack>
  );
}

WatchlistItem.displayName = 'WatchlistItem';

export default WatchlistItem;
