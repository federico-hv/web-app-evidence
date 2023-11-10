import { Box, Text } from '@holdr-ui/react';

export default function CreatePostPlaceholder({
  option,
}: {
  option: string;
}) {
  return (
    <Box position='absolute' t={0} px='$3'>
      <Text color='base400'>
        {option === 'poll'
          ? 'What do you want to find out from your fans?'
          : 'What do you want your fans to know?'}
      </Text>
    </Box>
  );
}
