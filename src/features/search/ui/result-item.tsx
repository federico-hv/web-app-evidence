import {
  TextGroup,
  TextGroupSubheading,
  UserModel,
} from '../../../shared';
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
      bgColor={isSelected ? 'clearTint300' : 'transparent'}
      _hover={{ backgroundColor: '$clearTint300' }}
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
      <TextGroup gap={0}>
        <TextGroupSubheading weight={500} size={2}>
          {data.displayName}
        </TextGroupSubheading>
        <TextGroupSubheading size={1}>{data.username}</TextGroupSubheading>
      </TextGroup>
    </HStack>
  );
}
ResultItem.displayName = 'ResultItem';

export default ResultItem;
