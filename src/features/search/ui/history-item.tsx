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

function HistoryItem({ data }: { data: UserModel }) {
  const { remove } = useRemoveSearchHistoryItem<UserModel>();

  return (
    <HStack
      position='relative'
      items='center'
      justify='space-between'
      px={2}
    >
      <HStack gap={3} items='center' py={3}>
        {data.avatar ? (
          <Avatar src={data.avatar} name={data.displayName} />
        ) : (
          <Circle
            size={{ '@bp1': 30, '@bp3': 40 }}
            bgColor='base800'
            color='primary400'
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
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
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
