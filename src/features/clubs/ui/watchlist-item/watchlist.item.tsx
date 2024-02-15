import {
  HStack,
  Avatar,
  Text,
  VStack,
  Countdown,
  theme,
} from '@holdr-ui/react';
import { WatchlistItemProps } from './watchlist-item.types';
import { LiveTag } from './index';
import { TextGroup, TextGroupSubheading } from 'shared';

function WatchlistItem({ data }: WatchlistItemProps) {
  return (
    <HStack
      w='100%'
      gap={4}
      pl={3}
      pr={4}
      py={2}
      radius={3}
      items='center'
      _hover={{ background: '#9898FF26', cursor: 'pointer' }}
      css={{
        transition: theme.transitions['duration-normal'],
      }}
    >
      <Avatar size='xl' variant='squircle' />
      <VStack gap={3} w='100%' h='80%' py={2}>
        <HStack
          gap={2}
          justify='space-between'
          items='center'
          w='100%'
          h='100%'
        >
          <Text size={2} weight={500}>
            {data.name}
          </Text>
          {data.endDate && <LiveTag />}
        </HStack>
        <HStack justify='space-between'>
          <TextGroup gap={1}>
            <TextGroupSubheading size={1} weight={300} color='white700'>
              {data.endDate ? 'Entry Price' : 'Buy Now'}
            </TextGroupSubheading>
            <TextGroupSubheading size={2} weight={400}>
              {`$${data.price.toFixed(2)} USD`}
            </TextGroupSubheading>
          </TextGroup>
          {data.endDate && (
            <TextGroup gap={1} minWidth='73px'>
              <TextGroupSubheading size={1} weight={300} color='white700'>
                Time Left
              </TextGroupSubheading>
              <Countdown
                size='sm'
                targetDate={data.endDate}
                color='white500'
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
