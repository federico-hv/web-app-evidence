import { Box, HStack, Image, Text, VStack } from '@holdr-ui/react';
import {
  ArticleModel,
  FeedContextProvider,
  FeedModel,
  PostModel,
} from '../../shared';
import ArticleCard from './article';
import PostCard from './post';
import { Asset } from '../../../../shared';

/**
 * Future state:
 * - Need to simplify the rendering of a feed card.
 * - Create separate entities for Post and Poll cards
 */

function FeedCard({
  data,
  showPin,
}: { data: FeedModel } & { showPin?: boolean }) {
  return (
    <VStack gap={2}>
      {showPin && data.isPinned && (
        <HStack gap={2} items='center'>
          <Image
            alt=''
            size={16}
            src={Asset.Icon.PinFilled}
            css={{ opacity: 0.5 }}
          />
          <Text size={2} weight={600} color='white700'>
            Pinned
          </Text>
        </HStack>
      )}
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
        <FeedContextProvider
          value={{
            type: data.type,
            owner: data.owner,
            feedId: data.id as string,
            isBookmarked: data.isBookmarked,
            isLiked: data.isLiked,
            isPinned: data.isPinned,
            createdAt: data.createdAt,
          }}
        >
          {(data.type === 'post' || data.type === 'poll') && (
            <PostCard data={data.item as PostModel} />
          )}
          {data.type === 'article' && (
            <ArticleCard data={data.item as ArticleModel} />
          )}
        </FeedContextProvider>
      </Box>
    </VStack>
  );
}
FeedCard.displayName = 'FeedCard';

export default FeedCard;
