import { useQuery } from '@apollo/client';
import {
  // CreatePost,
  FeedsReturnModel,
  GET_FEEDS,
  FeedCard,
  CreatePost,
} from '../../../features';
import { Error, Loader } from '../../../shared';
import { Alert, HStack, VStack } from '@holdr-ui/react';
import CustomTabs, {
  CustomTabsContent,
  CustomTabsHeader,
  CustomTabsList,
  CustomTabsTrigger,
} from '../../../tmp/custom-tabs';

function Feeds({ type = 'all' }: { type: 'all' | 'article' | 'post' }) {
  const { loading, data, error } = useQuery<
    { feeds: FeedsReturnModel },
    { type: string }
  >(GET_FEEDS, {
    variables: {
      type,
    },
  });

  return (
    <Error
      hasError={!!error}
      errorEl={
        <Alert>
          <Alert.Description>{error?.message}</Alert.Description>
        </Alert>
      }
    >
      <Loader loading={loading}>
        {data && (
          <VStack w='100%' gap={5} pb={6}>
            {data.feeds.data.map((item) => (
              <FeedCard key={item.id} data={item} />
            ))}
          </VStack>
        )}
      </Loader>
    </Error>
  );
}

function FeedTabs() {
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
        zIndex={10}
        css={{
          backgroundColor: '#141317',
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
              css={{ borderTopRightRadius: '$4' }}
              value='following'
            >
              Following
            </CustomTabsTrigger>
          </CustomTabsList>
          {/*<HStack placeholder='' p={4}>*/}
          {/*  <IconButton*/}
          {/*    radius={4}*/}
          {/*    variant='outline'*/}
          {/*    icon='settings-outline'*/}
          {/*    colorTheme='white50'*/}
          {/*    ariaLabel={'settings'}*/}
          {/*  />*/}
          {/*</HStack>*/}
        </HStack>
      </CustomTabsHeader>
      <CustomTabsContent
        value='for-you'
        css={{
          borderRight: '1px solid rgba(152, 152, 255, 0.10)',
          borderLeft: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottom: '1px solid rgba(152, 152, 255, 0.10)',
          borderBottomLeftRadius: '$4',
          borderBottomRightRadius: '$4',
        }}
      >
        <VStack minHeight={0} w='100%' p={3} as='aside' gap={4}>
          <CreatePost />
          <Feeds type='all' />
        </VStack>
      </CustomTabsContent>
      <CustomTabsContent value='following'>
        <VStack
          minHeight={0}
          w='100%'
          p={3}
          as='aside'
          gap={4}
          css={{
            borderLeft: '1px solid rgba(152, 152, 255, 0.10)',
            borderRight: '1px solid rgba(152, 152, 255, 0.10)',
            borderBottom: '1px solid rgba(152, 152, 255, 0.10)',
            borderBottomLeftRadius: '$4',
            borderBottomRightRadius: '$4',
          }}
        >
          <CreatePost />
          <Feeds type='all' />
        </VStack>
      </CustomTabsContent>
    </CustomTabs>
  );
}
FeedTabs.displayName = 'FeedTabs';

export default FeedTabs;
