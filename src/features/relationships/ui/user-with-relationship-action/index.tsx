import {
  ActionItemWrapper,
  LinkOverlay,
  prefix,
  UserNamesGroup,
} from '../../../../shared';
import { Avatar } from '@holdr-ui/react';
import RelationshipActionButton from '../relationship-action-button';
import { UserWithRelationshipProps } from './types';

function UserWithRelationshipAction({
  data,
  onClose,
}: UserWithRelationshipProps) {
  return (
    <ActionItemWrapper key={data.id}>
      <LinkOverlay onClick={onClose} to={prefix('/', data.username)} />
      <Avatar
        variant='squircle'
        src={data.avatar}
        name={data.displayName}
      />
      <UserNamesGroup
        displayName={data.displayName}
        username={data.displayName}
      />

      <RelationshipActionButton username={data.username} />
    </ActionItemWrapper>
  );
}
UserWithRelationshipAction.displayName = 'UserWithRelationship';

export default UserWithRelationshipAction;
