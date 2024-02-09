import {
  Avatar,
  HStack,
  VStack,
  Text,
  AvatarBadge,
  Icon,
} from '@holdr-ui/react';
import { Link } from 'react-router-dom';
import { MyMembersItemProps } from './members-item.types';


function MyMembersItem({
  data,
  isOnline,
  active,
  to,
}: MyMembersItemProps) {
  return (
    <Link to={to}>
      <HStack
        p={3}
        gap={4}
        radius={3}
        items='center'
        _hover={{ backgroundColor: '#9898FF26', cursor: 'pointer' }}
        css={{
          background: active ? '#9898FF26' : 'transparent',
        }}
      >
        <Avatar size='base' src={data.avatar}>
          {isOnline && (
            <AvatarBadge size={1}>

              {/* LOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOK OVER HEEEERE!!!!!!!!!!!!!!!!!!!!!!! */}

              <Icon name="middle-dot-fill" color="success400" css={{border: '1px solid red'}}/>
              {/* <Circle
                size='13px'
                css={{
                  backgroundColor: 'success500',
                  borderColor: 'purple1000',
                }}
                border={1}
              /> */}
            </AvatarBadge>
          )}
        </Avatar>
        <VStack gap={1}>
          <Text size={3} weight={500}>
            {data.displayName}
          </Text>
          <Text size={1} weight={300}>
            {`@${data.username}`}
          </Text>
        </VStack>
      </HStack>
    </Link>
  );
}

MyMembersItem.displayName = 'MyMembersItem';

export default MyMembersItem;
