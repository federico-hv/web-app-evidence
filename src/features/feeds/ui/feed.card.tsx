import {
  ArticleModel,
  FeedContextProvider,
  FeedModel,
  PostModel,
} from '../shared';
import {
  LinkOverlay,
  SwitchConditional,
  SwitchConditionalCase,
} from '../../../shared';
import PostCard from './post-card';
import ArticleCard from './article-card';
import { Box } from '@holdr-ui/react';
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
          owner: data.owner,
          feedId: data.id as string,
          reaction: data.reaction,
          createdAt: data.createdAt,
        }}
      >
        <SwitchConditional>
          <SwitchConditionalCase on={data.type === 'post'}>
            <PostCard data={data.node as PostModel} />
          </SwitchConditionalCase>
          <SwitchConditionalCase on={data.type === 'article'}>
            <ArticleCard data={data.node as ArticleModel} />
          </SwitchConditionalCase>
        </SwitchConditional>
      </FeedContextProvider>
    </Box>
  );
}
FeedCard.displayName = 'FeedCard';

export default FeedCard;
