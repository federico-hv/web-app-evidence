import { CreatePost, FeedFilterTypeEnum } from '../../../features';
import { Box, HStack, VStack } from '@holdr-ui/react';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../tmp/custom-tabs';
import { useState } from 'react';
import FeedFilter from './feed-filter';
import FollowingFeeds from './followingFeeds';
import { TrendingFeeds } from './index';
import { CSS } from '@stitches/react';

const FeedsContainerStyles: CSS = {
  borderRight: '1px solid rgba(152, 152, 255, 0.10)',
  borderLeft: '1px solid rgba(152, 152, 255, 0.10)',
  borderBottom: '1px solid rgba(152, 152, 255, 0.10)',
  borderBottomLeftRadius: '$4',
  borderBottomRightRadius: '$4',
};

function FeedTabs() {
  const [filter, setFilter] = useState<FeedFilterTypeEnum>(
    FeedFilterTypeEnum.All,
  );

  const updateFilter = (value: FeedFilterTypeEnum) => setFilter(value);

  return (
    <CustomTabs
      defaultValue='for-you'
      flex={1}
      css={{
        background:
          'radial-gradient(50% 100% at 50% 100%, rgba(128, 128, 255, 0.15) 0%, rgba(128, 128, 255, 0.05) 100%)',
      }}
    >
      <CustomTabsHeader
        h={64}
        position='sticky'
        t={80}
        css={{
          backgroundColor: '#141317',
          zIndex: 6,
        }}
      >
        <HStack
          items='center'
          w='100%'
          css={{
            border: '1px solid rgba(152, 152, 255, 0.10)',
            borderTopLeftRadius: '$4',
            borderTopRightRadius: '$4',
            background:
              'radial-gradient(50% 100% at 50% 100%, rgba(128, 128, 255, 0.15) 0%, rgba(128, 128, 255, 0.05) 100%)',
          }}
        >
          <CustomTabsList>
            <CustomTabsTrigger
              _hover={{ background: '#9898FF26' }}
              css={{ borderTopLeftRadius: '$4' }}
              value='for-you'
            >
              For you
            </CustomTabsTrigger>
            <CustomTabsTrigger
              _hover={{ background: '#9898FF26' }}
              value='following'
            >
              Following
            </CustomTabsTrigger>
          </CustomTabsList>
          <Box p={4}>
            <FeedFilter current={filter} onClick={updateFilter} />
          </Box>
        </HStack>
      </CustomTabsHeader>
      <CustomTabsContent
        value='for-you'
        minHeight='calc(100vh - 158px)'
        css={FeedsContainerStyles}
      >
        <VStack minHeight={0} w='100%' p={3} as='aside' gap={4}>
          <CreatePost />
          <TrendingFeeds filter={filter} />
        </VStack>
      </CustomTabsContent>
      <CustomTabsContent
        value='following'
        minHeight='calc(100vh - 158px)'
        css={FeedsContainerStyles}
      >
        <VStack w='100%' p={3} gap={4}>
          <CreatePost />
          <FollowingFeeds filter={filter} />
        </VStack>
      </CustomTabsContent>
    </CustomTabs>
  );
}
FeedTabs.displayName = 'FeedTabs';

export default FeedTabs;
