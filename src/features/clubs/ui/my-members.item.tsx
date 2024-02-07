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
    online: boolean;
  }
  
  function MyMembersItem({ data, online }: MyMembersItemProps) {
    return (
      <HStack p={'8px'} gap={4} radius={2} items={'center'}>
        <Avatar size='base' src={data.avatar}>
          {online && (
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
          <Text size='16px' weight={500}>
            {data.displayName}
          </Text>
          <Text size='12px' weight={300}>
            {`@${data.username}`}
          </Text>
        </VStack>
      </HStack>
    );
  }
  
  MyMembersItem.displayName = 'MyMembers item';
  
  export default MyMembersItem;