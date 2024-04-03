import { Avatar, HStack, AvatarBadge, Circle } from '@holdr-ui/react';
import {
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../../shared';
import { MyMemberItemProps } from './types';

function MyMemberItem({ data, isOnline }: MyMemberItemProps) {
  return (
    <HStack
      p={2}
      gap={4}
      radius={2}
      items='center'
      _hover={{ backgroundColor: '#9898FF26', cursor: 'pointer' }}
    >
      <Avatar size='base' src={data.avatar}>
        {isOnline && (
          <AvatarBadge
            size={1}
            aria-label='members-item online status'
            role='status'
          >
            <Circle
              size='13px'
              css={{
                backgroundColor: '$success400',
                borderColor: '$purple1000',
              }}
              border={1}
            />
          </AvatarBadge>
        )}
      </Avatar>
      <TextGroup gap={0}>
        <TextGroupHeading size={2} aria-label='members-item displayName'>
          {data.displayName}
        </TextGroupHeading>
        <TextGroupSubheading
          size={1}
          weight={300}
          aria-label='members-item username'
        >
          {`@${data.username}`}
        </TextGroupSubheading>
      </TextGroup>
    </HStack>
  );
}

MyMemberItem.displayName = 'MyMemberItem';

export default MyMemberItem;
