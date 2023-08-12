import {
  ArticleModel,
  FeedContextProvider,
  FeedModel,
  PostModel,
} from '../shared';
import { SwitchConditional, SwitchConditionalCase } from '../../../shared';
import PostCard from './post.card';
import ArticleCard from './article.card';

function FeedCard({ data }: { data: FeedModel }) {
  return (
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
  );
}
FeedCard.displayName = 'FeedCard';

export default FeedCard;
