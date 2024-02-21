import { Box, HStack, IconButton } from '@holdr-ui/react';
import millify from 'millify';

function FeedShareGroup() {
  return (
    <HStack items='center' gap={2} zIndex={5}>
      <IconButton
        variant='ghost'
        colorTheme='white50'
        icon='send-outline'
        ariaLabel='bookmark feed'
      />
      <Box cursor='pointer'> {millify(0, { precision: 2 })}</Box>
    </HStack>
  );
}
FeedShareGroup.displayName = 'FeedShareGroup';

export default FeedShareGroup;
