import { Box, HStack, IconButton } from '@holdr-ui/react';
import millify from 'millify';

function FeedCommentGroup({
  onClick,
  isCommenting,
}: {
  isCommenting: boolean;
  onClick: VoidFunction;
}) {
  return (
    <HStack w={70} items='center' gap={1} zIndex={5}>
      <IconButton
        onClick={onClick}
        variant='ghost'
        colorTheme='white50'
        icon={isCommenting ? 'chat-alt-fill' : 'chat-alt-outline'}
        ariaLabel='view comments'
      />
      <Box fontSize={2} cursor='pointer'>
        {millify(0, { precision: 2 })}
      </Box>
    </HStack>
  );
}
FeedCommentGroup.displayName = 'FeedCommentGroup';

export default FeedCommentGroup;
