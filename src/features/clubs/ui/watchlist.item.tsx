import { HStack, Avatar, Text, VStack, Circle } from '@holdr-ui/react';

interface WatchlistItemProps {
  auctionName: string;
  timeLeft: Date;
  price: number;
  live: boolean;
}
function WatchlistItem({
  auctionName,
  timeLeft,
  price,
  live,
}: WatchlistItemProps) {
  return (
    <HStack gap={4} p='8px' radius={1}  items={'center'}>
      <Avatar size='xl' variant='squircle' />
      <VStack gap={4} w='100%'>
        <HStack
          gap={2}
          justify={'space-between'}
          items={'center'}
          w='100%'
        //   css={{ backgroundColor: 'red' }}
        >
          <Text size='14px' weight={500} >
            {auctionName}
          </Text>
          {live && (
            <HStack gap={2} items={'center'}>
              <Circle size='6px' bgColor='success500'/>
              <Text size='12px' weight={500} color='success500'>
                LIVE
              </Text>
            </HStack>
          )}
        </HStack>
        <HStack justify={'space-between'}>
          <VStack gap={2}>
            <Text size='12px' weight={300}>
              {live ? 'Entry Price' : 'Buy Now'}
            </Text>
            <Text size='12px' weight={400}>
              {`$${price.toFixed(2)} USD`}
            </Text>
          </VStack>
          <VStack gap={2}>
            <Text size='12px' weight={300}>
              Time Left
            </Text>
            <Text size='12px' weight={400}>
              {`${timeLeft.getHours().toString().padStart(2, '0')}hr ${timeLeft.getMinutes().toString().padStart(2, '0')}min`}
            </Text>
          </VStack>
        </HStack>
      </VStack>
    </HStack>
  );
}

WatchlistItem.displayName = 'Watchlist item';

export default WatchlistItem;