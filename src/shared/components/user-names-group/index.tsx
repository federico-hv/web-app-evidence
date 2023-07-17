import { TextGroup, TextGroupSubheading } from '../index';
import { UserNamesGroupProps } from './types';

function UserNamesGroup({ displayName, username }: UserNamesGroupProps) {
  return (
    <TextGroup gap={0}>
      <TextGroupSubheading weight={500}>{displayName}</TextGroupSubheading>
      <TextGroup.Subheading color='base400' size={2}>
        @{username}
      </TextGroup.Subheading>
    </TextGroup>
  );
}
UserNamesGroup.displayName = 'UserNamesGroup';

export default UserNamesGroup;
