import { Box, Text, VStack } from '@holdr-ui/react';
import { ProfileNameGroupProps } from './profile-name-group.type';
import { textEllipsis } from '../../../shared';

function ProfileNameGroup({
  username,
  displayName,
}: ProfileNameGroupProps) {
  return (
    <VStack
      gap={3}
      w='100%'
      overflow='hidden'
      borderBottom={2}
      borderColor='base100'
      css={{
        whiteSpace: 'nowrap',

        '@bp4': {
          borderBottom: 'none',
        },
      }}
    >
      <Box
        fontSize={4}
        className={textEllipsis()}
        css={{
          fontWeight: 600,
        }}
      >
        {displayName}
      </Box>
      <Text size={2}>@{username}</Text>
    </VStack>
  );
}
ProfileNameGroup.displayName = 'ProfileNameGroup';

export default ProfileNameGroup;
