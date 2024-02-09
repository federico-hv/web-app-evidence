import {
  HStack,
  Avatar,
  Text,
  VStack,
  Countdown,
  theme,
} from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { WatchlistItemProps } from './watchlist.types';
import {LiveTag} from './index';

function WatchlistItem({ data, active, to }: WatchlistItemProps) {
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
          background: active ? '#9898FF26' : 'transparent',
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
            <VStack>
              <Text size={1} weight={300} color='white700'>
                {data.endDate ? 'Entry Price' : 'Buy Now'}
              </Text>
              <Text size={2} weight={400}>
                {`$${data.price.toFixed(2)} USD`}
              </Text>
            </VStack>
            {data.endDate && (
              <VStack css={{ minWidth: '73px' }}>
                <Text size={1} weight={300} color='white700'>
                  Time Left
                </Text>
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
    </Link>
  );
}

WatchlistItem.displayName = 'WatchlistItem';

export default WatchlistItem;
