import {
  HStack,
  Avatar,
  Text,
  VStack,
  Countdown,
  theme,
  Heading,
} from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { WatchlistItemProps } from './watchlist-item.types';
import {LiveTag} from './index';
import { TextGroup, TextGroupHeading, TextGroupSubheading } from 'shared';

function WatchlistItem({ data, to }: WatchlistItemProps) {
  return (
    <Link to={to} style={{width: '100%'}}>
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
          transition: theme.transitions['duration-normal']
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
            {data.endDate && (
              <LiveTag/>
            )}
          </HStack>
          <HStack justify='space-between'>
            <TextGroup gap={1}>
              <TextGroupHeading size={1} weight={300} color='white700'>
                {data.endDate ? 'Entry Price' : 'Buy Now'}
              </TextGroupHeading>
              <TextGroupSubheading size={2} weight={400}>
                {`$${data.price.toFixed(2)} USD`}
              </TextGroupSubheading>
            </TextGroup>
            {data.endDate && (
              <TextGroup gap={1} minWidth='73px'>
                <TextGroupHeading size={1} weight={300} color='white700'>
                  Time Left
                </TextGroupHeading>
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
    </Link>
  );
}

WatchlistItem.displayName = 'WatchlistItem';

export default WatchlistItem;
