import { LinkOverlay, prefix, UserNamesGroup } from '../../../../shared';
import { Avatar, HStack } from '@holdr-ui/react';
import RelationshipActionButton from '../relationship-action-button';
import { UserWithRelationshipProps } from './types';

function UserWithRelationshipAction({
  data,
  onClose,
}: UserWithRelationshipProps) {
  return (
    <HStack w='100%' justify='space-between'>
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
      <RelationshipActionButton username={data.username} />
    </HStack>
  );
}
UserWithRelationshipAction.displayName = 'UserWithRelationship';

export default UserWithRelationshipAction;
