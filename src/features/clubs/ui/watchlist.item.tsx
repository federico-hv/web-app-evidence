import { HStack, Avatar, Text, VStack, Circle, Countdown } from '@holdr-ui/react';
import { OnSaleMembershipModel } from '../shared';

interface WatchlistItemProps {
  data: OnSaleMembershipModel,
}
function WatchlistItem({
  data
}: WatchlistItemProps) {
  return (
    <HStack
      w='95%'
      gap={4}
      px={3}
      py={2}
      radius={1}
      items={'center'}
    >
      <Avatar size='xl' variant='squircle' />
      <VStack gap={3} w='100%' h='80%' py={2}>
        <HStack
          gap={2}
          justify={'space-between'}
          items={'center'}
          w='100%'
          h='100%'
        >
          <Text size={2} weight={500}>
            {data.name}
          </Text>
          {data.endDate && (
            <HStack gap={2} items={'center'}>
              <Circle size='6px' bgColor='success500' />
              <Text size={1} weight={500} color='success500'>
                LIVE
              </Text>
            </HStack>
          )}
        </HStack>
        <HStack justify={'space-between'}>
          <VStack>
            <Text size={1} weight={300} color='white700'>
              {data.endDate ? 'Entry Price' : 'Buy Now'}
            </Text>
            <Text size={1} weight={400}>
              {`$${data.price.toFixed(2)} USD`}
            </Text>
          </VStack>
          {data.endDate &&
          <VStack>
            <Text size={1} weight={300} color='white700'>
              Time Left
            </Text>
            <Countdown size={'sm'} targetDate={data.endDate} color='white500'/>
          </VStack>}
        </HStack>
      </VStack>
    </HStack>
  );
}

WatchlistItem.displayName = 'Watchlist item';

export default WatchlistItem;
