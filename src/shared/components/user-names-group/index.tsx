import { TextGroup, TextGroupSubheading } from '../index';
import { UserNamesGroupProps } from './types';

function UserNamesGroup({ displayName, username }: UserNamesGroupProps) {
  return (
    <TextGroup w='fit-content' gap={0} p={0}>
      <TextGroupSubheading size={{ '@bp1': 2, '@bp3': 3 }} weight={500}>
        {displayName}
      </TextGroupSubheading>
      <TextGroup.Subheading
        size={{ '@bp1': 1, '@bp3': 2 }}
        weight={500}
        color='base400'
      >
        @{username}
      </TextGroup.Subheading>
    </TextGroup>
  );
}
UserNamesGroup.displayName = 'UserNamesGroup';

export default UserNamesGroup;
