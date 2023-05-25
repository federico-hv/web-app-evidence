import { Text, VStack } from '@holdr-ui/react';
import { ProfileNameGroupProps } from './profile-name-group.type';

function ProfileNameGroup({
  username,
  displayName,
}: ProfileNameGroupProps) {
  return (
    <VStack
      gap={1}
      w='100%'
      borderBottom={2}
      borderColor='base100'
      css={{
        '@bp4': {
          borderBottom: 'none',
        },
      }}
    >
      <Text weight={600} size={4}>
        {displayName}
      </Text>
      <Text size={2}>@{username}</Text>
    </VStack>
  );
}
ProfileNameGroup.displayName = 'ProfileNameGroup';

export default ProfileNameGroup;
