import {
    Avatar,
    HStack,
    VStack,
    Text,
    AvatarBadge,
    Circle,
  } from '@holdr-ui/react';
  import { UserModel } from 'shared';
  
  interface MyMembersItemProps {
    data: UserModel;
    isOnline: boolean;
  }
  
  function MyMembersItem({ data, isOnline }: MyMembersItemProps) {
    return (
      <HStack p={2} gap={4} radius={2} items={'center'}>
      <Avatar size='base' src={data.avatar}>
        {isOnline && (
          <AvatarBadge size={1}>
            <Circle
              size='13px'
              css={{ backgroundColor: '#34C05A', borderColor: '#141317' }}
              border={1}
            />
          </AvatarBadge>
        )}
      </Avatar>
      <VStack gap={2}>
        <Text size={3} weight={500}>
          {data.displayName}
        </Text>
        <Text size={1} weight={300}>
          {`@${data.username}`}
        </Text>
      </VStack>
    </HStack>
    );
  }
  
  MyMembersItem.displayName = 'MyMembers item';
  
  export default MyMembersItem;