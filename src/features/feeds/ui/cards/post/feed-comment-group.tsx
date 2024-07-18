import { Box, HStack, IconButton } from '@holdr-ui/react';
import millify from 'millify';

function FeedCommentGroup() {
  return (
    <HStack items='center' gap={1} zIndex={5}>
      <IconButton
        variant='ghost'
        colorTheme='white50'
        icon='chat-alt-outline'
        ariaLabel='view comments'
      />
      <Box cursor='pointer'> {millify(0, { precision: 2 })}</Box>
    </HStack>
  );
}
FeedCommentGroup.displayName = 'FeedCommentGroup';

export default FeedCommentGroup;
