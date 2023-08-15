import {
  IUser,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../shared';
import { Avatar, Circle, HStack, Icon } from '@holdr-ui/react';

function ResultItem({ data }: { data: IUser; display?: string[] }) {
  return (
    <HStack gap={3} items='center' py={3} px={2}>
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
  );
}
ResultItem.displayName = 'ResultItem';

export default ResultItem;
