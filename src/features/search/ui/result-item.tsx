import { UserModel, UserNamesGroup } from '../../../shared';
import { Avatar, Circle, HStack, Icon } from '@holdr-ui/react';

function ResultItem({
  data,
  isSelected,
}: {
  data: UserModel;
  display?: string[];
  isSelected?: boolean;
}) {
  return (
    <HStack
      bgColor={isSelected ? 'rgba(152, 152, 255, 0.15)' : 'transparent'}
      _hover={{ backgroundColor: 'rgba(152, 152, 255, 0.15)' }}
      gap={3}
      radius={2}
      items='center'
      py={3}
      px={2}
    >
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
  );
}
ResultItem.displayName = 'ResultItem';

export default ResultItem;
