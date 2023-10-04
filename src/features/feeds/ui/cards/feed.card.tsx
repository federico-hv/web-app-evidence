import { Box } from '@holdr-ui/react';
import {
  ArticleModel,
  FeedContextProvider,
  FeedModel,
  PostModel,
} from '../../shared';
import { LinkOverlay } from '../../../../shared';
import ArticleCard from './article';
import PostCard from './post';
import { useLocation } from 'react-router-dom';

function FeedCard({ data }: { data: FeedModel }) {
  const location = useLocation();

  return (
    <Box position='relative' h='fit-content'>
      <LinkOverlay
        to={`/${data.owner.username}/feeds/${data.id}`}
        state={{ from: location }}
      />
      <FeedContextProvider
        value={{
          // TODO: use a lodash pick and cast result
          owner: data.owner,
          feedId: data.id as string,
          bookmarked: data.bookmarked,
          reaction: data.reaction,
          isPinned: data.isPinned,
          createdAt: data.createdAt,
        }}
      >
        {data.type === 'post' && (
          <PostCard data={data.node as PostModel} />
        )}
        {data.type === 'article' && (
          <ArticleCard data={data.node as ArticleModel} />
        )}
      </FeedContextProvider>
    </Box>
  );
}
FeedCard.displayName = 'FeedCard';

export default FeedCard;
