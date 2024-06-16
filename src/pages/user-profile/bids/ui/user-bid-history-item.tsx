import { Avatar, Box, HStack, Icon, Text, VStack } from '@holdr-ui/react';
import dayjs from 'dayjs';

import localizedFormat from 'dayjs/plugin/localizedFormat';
dayjs.extend(localizedFormat);

function UserBidHistoryItem() {
  const price = 829.12;
  const createdAt = new Date();

  return (
    <HStack items='center'>
      <HStack flex={1} gap={2} items='center'>
        <Avatar size='44px' variant='squircle' name='D D'></Avatar>
        <VStack mb={1}>
          <HStack gap={1} items='center'>
            <Text weight={500}>Abraham Curtis’ Club</Text>
            <Icon name='verified-outline' />
          </HStack>
          <Text color='white700' size={1} weight={300}>
            @AbCurt
          </Text>
        </VStack>
      </HStack>
      <Box basis='156px'>
        <Text weight={300}>${price.toFixed(2)}</Text>
      </Box>
      <Box basis='180px'>
        <Text weight={300}>{dayjs(createdAt).format('ll')}</Text>
      </Box>
      <Box basis='108px'>
        <Text weight={300}>Pending</Text>
      </Box>
    </HStack>
  );
}
UserBidHistoryItem.displayName = 'UserBidHistoryItem';

export default UserBidHistoryItem;
