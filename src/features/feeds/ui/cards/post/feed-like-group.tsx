import { useFeedContext } from '../../../shared';
import { Box, HStack, useDisclosure } from '@holdr-ui/react';
import { useFeedStatistic } from '../../../shared';
import LikeButton from '../../buttons/like';
import millify from 'millify';
import { LikesDialog } from '../../dialogs';
import { useCurrentUser } from '../../../../auth';

function FeedLikeGroup() {
  const disclosure = useDisclosure();

  const currentUser = useCurrentUser();

  const { feedId, owner } = useFeedContext();

  const { data } = useFeedStatistic(feedId, 'love');

  return (
    <HStack w={70} items='center' zIndex={5}>
      <LikeButton />

      {data && (
        <Box
          onClick={
            currentUser.id === owner.id ? disclosure.onOpen : undefined
          }
          px={2}
          fontSize={2}
          _hover={
            currentUser.id === owner.id
              ? {
                  color: '$white700',
                  textDecoration: 'underline',
                  cursor: 'pointer',
                }
              : undefined
          }
        >
          {millify(data.feedStatistic, { precision: 2 })}
        </Box>
      )}
      {currentUser.id === owner.id && disclosure.isOpen && (
        <LikesDialog {...disclosure} />
      )}
    </HStack>
  );
}
FeedLikeGroup.displayName = 'FeedLikeGroup';

export default FeedLikeGroup;
