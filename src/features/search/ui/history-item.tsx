import {
  UserModel,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
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
            size={40}
            bgColor='base800'
            color='primary400'
            css={{ flexShrink: 0 }}
          >
            <Icon name='search-outline' />
          </Circle>
        )}
        <TextGroup gap={0}>
          <TextGroupHeading as='h5' size={3}>
            {data.displayName}
          </TextGroupHeading>
          <TextGroupSubheading size={2} color='base400'>
            @{data.username}
          </TextGroupSubheading>
        </TextGroup>
      </HStack>
      <Box position='relative' zIndex={10}>
        <CloseButton
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
