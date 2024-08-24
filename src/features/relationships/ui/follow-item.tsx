import { UserWithRelationship } from '../shared';
import { Avatar, Box, HStack, Text } from '@holdr-ui/react';
import { LinkOverlay } from '../../../shared';
import { SocialButton } from './index';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';

function FollowItem({
  data,
  color,
  colorTheme,
}: {
  data: UserWithRelationship;
  color?: ThemeColor;
  colorTheme?: { follow?: ThemeColor; following?: ThemeColor };
}) {
  return (
    <HStack
      color={color}
      justify='space-between'
      items='center'
      position='relative'
    >
      <LinkOverlay
        to={`${data.role === 'artist' ? '/clubs' : ''}/${data.username}`}
      />
      <HStack gap={2} items='center' justify='space-between'>
        <Avatar size={40} src={data.avatar} name={data.displayName} />
        <HStack gap={2} h='fit-content' items='center'>
          <Text weight={500} style={{ marginBottom: '5px' }}>
            {data.displayName}
          </Text>
          {/*{data.isVerified && (*/}
          {/*  <Box fontSize='18px' mt={1}>*/}
          {/*    <Icon name='verified-outline' />*/}
          {/*  </Box>*/}
          {/*)}*/}
        </HStack>
      </HStack>
      {/* Show the current viewers relationship with the user*/}
      <Box zIndex={5}>
        <SocialButton
          colorTheme={colorTheme}
          username={data.username}
          statusInfo={data.relationshipStatusInfo}
        />
      </Box>
    </HStack>
  );
}
FollowItem.displayName = 'FollowItem';

export default FollowItem;
