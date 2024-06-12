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
    <Box
      position='relative'
      h='fit-content'
      w='100%'
      radius={4}
      css={{
        border: '1px solid rgba(152, 152, 255, 0.10)',
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(133, 133, 255, 0.15) 0%, rgba(133, 133, 255, 0.05) 100%), linear-gradient(180deg, rgba(208, 208, 255, 0.08) 0%, rgba(208, 208, 255, 0.01) 100%)',
      }}
    >
      {/*<LinkOverlay*/}
      {/*  to={`/${data.owner.username}/feeds/${data.id}`}*/}
      {/*  state={{ from: location }}*/}
      {/*/>*/}
      <FeedContextProvider
        value={{
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
