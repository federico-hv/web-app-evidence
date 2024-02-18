import {
  Avatar,
  HStack,
  VStack,
  Text,
  AvatarBadge,
  Circle,
} from '@holdr-ui/react';
import { MyMembersItemProps } from './members-item.types';
import { TextGroup, TextGroupHeading, TextGroupSubheading } from 'shared';

function MyMembersItem({ data, isOnline }: MyMembersItemProps) {
  return (
    <HStack
      px={3}
      py={2}
      gap={4}
      radius={3}
      items='center'
      _hover={{ backgroundColor: '#9898FF26', cursor: 'pointer' }}
    >
      <Avatar size='base' src={data.avatar} data-testid="member-item-avatar">
        {isOnline && (
          <AvatarBadge size={1} data-testid="member-item-avatar-online">
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
      <TextGroup gap={1}>
        <TextGroupHeading size={3} data-testid="member-item-name">{data.displayName}</TextGroupHeading>
        <TextGroupSubheading size={1} weight={300} data-testid="member-item-username">
          {`@${data.username}`}
        </TextGroupSubheading>
      </TextGroup>
    </HStack>
  );
}

MyMembersItem.displayName = 'MyMembersItem';

export default MyMembersItem;
