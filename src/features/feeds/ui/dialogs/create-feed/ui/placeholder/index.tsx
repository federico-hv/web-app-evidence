import { Box, Text } from '@holdr-ui/react';

export default function CreatePostPlaceholder() {
  return (
    <Box position='absolute' t={0} px={3}>
      <Box>
        <Text color='base400' font-size={2}>Share something with your fans</Text>
      </Box>
    </Box>
  );
}
