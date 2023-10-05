import { LinkOverlay, prefix, UserNamesGroup } from '../../../../shared';
import { Avatar, HStack } from '@holdr-ui/react';
import CommonRelationshipButton from '../common-relationship';
import { UserWithRelationshipProps } from './types';
import { useCurrentUser } from '../../../auth';

function UserWithRelationshipAction({
  data,
  onClose,
}: UserWithRelationshipProps) {
  const currentUser = useCurrentUser();

  return (
    <HStack w='100%' justify='space-between' position='relative'>
      <HStack gap={3}>
        <LinkOverlay onClick={onClose} to={prefix('/', data.username)} />
        <Avatar
          size={{ '@bp1': 'sm', '@bp3': 'base' }}
          variant='squircle'
          src={data.avatar}
          name={data.displayName}
        />
        <UserNamesGroup
          displayName={data.displayName}
          username={data.displayName}
        />
      </HStack>

      {currentUser && currentUser.username !== data.username && (
        <CommonRelationshipButton username={data.username} />
      )}
    </HStack>
  );
}
UserWithRelationshipAction.displayName = 'UserWithRelationship';

export default UserWithRelationshipAction;
