import { UserModel, UserNamesGroup } from '../../../shared';
import { useRemoveSearchHistoryItem } from '../shared';
import {
  Avatar,
  Box,
  Circle,
  CloseButton,
  HStack,
  Icon,
} from '@holdr-ui/react';

function HistoryItem({
  data,
  isSelected,
}: {
  data: UserModel;
  isSelected?: boolean;
}) {
  const { remove } = useRemoveSearchHistoryItem<UserModel>();

  return (
    <HStack
      position='relative'
      justify='space-between'
      bgColor={isSelected ? 'clearTint300' : 'transparent'}
      _hover={{ backgroundColor: '$clearTint300' }}
      gap={3}
      radius={2}
      items='center'
      py={3}
      px={2}
    >
      <HStack gap={3} items='center'>
        {data.avatar ? (
          <Avatar src={data.avatar} name={data.displayName} />
        ) : (
          <Circle
            size={{ '@bp1': 30, '@bp3': 40 }}
            bgColor='base800'
            color='white50'
            css={{ flexShrink: 0 }}
          >
            <Icon name='search-outline' />
          </Circle>
        )}
        <UserNamesGroup
          displayName={data.displayName}
          username={data.username}
        />
      </HStack>
      <Box position='relative' zIndex={10}>
        <CloseButton
          colorTheme='white500'
          size={{ '@bp1': 'sm', '@bp3': 'sm' }}
          variant='ghost'
          onClick={async (e) => {
            e.stopPropagation();
            await remove(data.id);
          }}
        />
      </Box>
    </HStack>
  );
}
HistoryItem.displayName = 'HistoryItem';

export default HistoryItem;
