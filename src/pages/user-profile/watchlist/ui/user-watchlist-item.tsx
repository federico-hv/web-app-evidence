import {
  Avatar,
  Box,
  Countdown,
  HStack,
  Icon,
  IconButton,
  Text,
  VStack,
} from '@holdr-ui/react';
import dayjs from 'dayjs';
import {
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
} from '../../../../shared';

function UserWatchlistItem() {
  const price = 829.12;

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
        <Countdown
          color='white500'
          targetDate={dayjs().add(1, 'day').toDate()}
        />
      </Box>
      <Box basis='108px'>
        <Box
          radius={1}
          px={1}
          w='fit-content'
          border={1}
          borderColor='#5CE581'
        >
          <Text weight={500} color='#5CE581' size={2}>
            LIVE
          </Text>
        </Box>
      </Box>
      <Box basis='40px'>
        <Menu minWidth={150}>
          <MenuTrigger>
            <IconButton
              colorTheme='purple600'
              icon='more-fill'
              ariaLabel='options'
              variant='ghost'
            />
          </MenuTrigger>
          <MenuContent>
            <MenuItem dangerous>Remove from Watchlist</MenuItem>
            <MenuItem>View Artist Club</MenuItem>
          </MenuContent>
        </Menu>
      </Box>
    </HStack>
  );
}
UserWatchlistItem.displayName = 'UserWatchlistItem';

export default UserWatchlistItem;
