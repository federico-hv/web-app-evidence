import {
  FeedOwnerMoreButton,
  GeneralArticleMoreButton,
  GeneralPostMoreButton,
  useCurrentUser,
  useFeedContext,
} from '../../../../features';
import { Box } from '@holdr-ui/react';
import { Fragment } from 'react';

function FeedMoreOptionsButton({ type }: { type: 'article' | 'post' }) {
  const { owner } = useFeedContext();
  const currentUser = useCurrentUser();

  return (
    <Box position='relative' css={{ zIndex: 5 }}>
      {currentUser && currentUser.id === owner.id ? (
        <FeedOwnerMoreButton />
      ) : (
        <Fragment>
          {type === 'article' && (
            <GeneralArticleMoreButton tinted={false} />
          )}
          {type === 'post' && (
            <GeneralPostMoreButton hidden={{ notInterested: true }} />
          )}
        </Fragment>
      )}
    </Box>
  );
}
FeedMoreOptionsButton.displayName = 'FeedMoreOptionsButton';

export default FeedMoreOptionsButton;
