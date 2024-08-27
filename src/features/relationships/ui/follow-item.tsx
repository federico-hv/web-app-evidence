import {
  IRelationshipStatusInfo,
  RelationshipStatusCodeEnum,
  UserWithRelationship,
} from '../shared';
import { Avatar, Box, Button, HStack, Icon, Text } from '@holdr-ui/react';
import { LinkOverlay } from '../../../shared';
import { ThemeColor } from '@holdr-ui/react/dist/shared/types';
import { Fragment } from 'react';
import { UserRoleEnum } from '../../user';
import {
  useCustomCreateRelationshipMutation,
  useCustomRemoveRelationshipMutation,
} from '../mutations';

interface SocialButtonProps {
  account: UserWithRelationship;
  statusInfo: IRelationshipStatusInfo;
  colorTheme?: {
    follow?: ThemeColor;
    following?: ThemeColor;
  };
}

function SocialButton({
  statusInfo,
  account,
  colorTheme = {
    follow: 'purple100',
  },
}: SocialButtonProps) {
  const { create, loading: loadingCreate } =
    useCustomCreateRelationshipMutation(account.id);
  const { remove, loading: loadingRemove } =
    useCustomRemoveRelationshipMutation(account.id);

  return (
    <Fragment>
      {statusInfo.isFollowing && (
        <Button
          onClick={async () =>
            await remove({
              id: account.id,
              type: RelationshipStatusCodeEnum.Following,
            })
          }
          isLoading={loadingRemove}
          variant='outline'
          css={{ px: '50px' }}
          colorTheme={colorTheme?.follow}
        >
          Following
        </Button>
      )}
      {statusInfo.hasFollowRequest && (
        <Button
          variant='outline'
          css={{ px: '50px' }}
          colorTheme={colorTheme?.following}
        >
          Requested
        </Button>
      )}
      {!(
        statusInfo.isFollowing ||
        statusInfo.isBlocked ||
        statusInfo.hasFollowRequest
      ) && (
        <Button
          isLoading={loadingCreate}
          onClick={async () =>
            await create({
              id: account.id,
              type: RelationshipStatusCodeEnum.Following,
            })
          }
          css={{ px: '50px' }}
          colorTheme={colorTheme?.follow}
        >
          Follow
        </Button>
      )}
    </Fragment>
  );
}

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
          {data.role === UserRoleEnum.Artist && (
            <Box fontSize='18px'>
              <Icon name='verified-outline' />
            </Box>
          )}
        </HStack>
      </HStack>
      {/* Show the current viewers relationship with the user*/}
      <Box zIndex={5}>
        <SocialButton
          colorTheme={colorTheme}
          account={data}
          statusInfo={data.relationshipStatusInfo}
        />
      </Box>
    </HStack>
  );
}
FollowItem.displayName = 'FollowItem';

export default FollowItem;
