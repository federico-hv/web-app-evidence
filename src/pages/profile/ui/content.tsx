import { Container, Tabs, VStack } from '@holdr-ui/react';
import {
  ContextBox,
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  useProfile,
} from '../../../shared';

import { ArticleCard, FeedCard, useUserFeeds } from '../../../features';

function UserFeeds({ type }: { type: 'article' | 'post' }) {
  const { profile } = useProfile();

  const { loading, data, error } = useUserFeeds(profile.username, type);

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
        <SwitchConditional>
          <SwitchConditionalCase on={type === 'post'}>
            {data && (
              <VStack gap={5} w='full' pb={6}>
                {data.userFeeds.data.map((item) => (
                  <FeedCard key={item.id} data={item} />
                ))}
              </VStack>
            )}
          </SwitchConditionalCase>
          <SwitchConditionalCase on={type === 'article'}>
            {data && (
              <VStack gap={5} w='full' pb={6}>
                {data.userFeeds.data.map((item) => (
                  <ArticleCard key={item.id} data={item} />
                ))}
              </VStack>
            )}
          </SwitchConditionalCase>
        </SwitchConditional>
      </Loader>
    </Error>
  );
}

function ArtistContent() {
  return (
    <Tabs defaultValue='posts'>
      <Tabs.List variant='link'>
        <Tabs.Trigger value='posts'>Posts</Tabs.Trigger>
        <Tabs.Trigger value='articles'>Articles</Tabs.Trigger>
        <Tabs.Trigger value='releases'>Releases</Tabs.Trigger>
        <Tabs.Trigger value='club'>Club</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='posts'>
        <UserFeeds type='post' />
      </Tabs.Content>
      <Tabs.Content value='articles'>
        <UserFeeds type='article' />
      </Tabs.Content>
      <Tabs.Content value='releases'>
        <ContextBox>Nothing to display</ContextBox>
      </Tabs.Content>
      <Tabs.Content value='club'>
        <ContextBox>Nothing to display</ContextBox>
      </Tabs.Content>
    </Tabs>
  );
}

function GeneralUserContent() {
  return (
    <Tabs defaultValue='posts'>
      <Tabs.List variant='link'>
        <Tabs.Trigger value='posts'>Post</Tabs.Trigger>
        <Tabs.Trigger value='likes'>Likes</Tabs.Trigger>
      </Tabs.List>
      <Tabs.Content value='posts'>
        <ContextBox> Nothing to display</ContextBox>
      </Tabs.Content>
      <Tabs.Content value='likes'>
        <ContextBox> Nothing to display</ContextBox>
      </Tabs.Content>
    </Tabs>
  );
}

function Content() {
  const { profile } = useProfile();

  return (
    <Container maxWidth={650} mt={3}>
      <SwitchConditional>
        <SwitchConditionalCase on={profile.role === 'artist'}>
          <ArtistContent />
        </SwitchConditionalCase>
        <SwitchConditionalCase on={profile.role === 'general'}>
          <GeneralUserContent />
        </SwitchConditionalCase>
      </SwitchConditional>
    </Container>
  );
}
Content.displayName = 'Content';

export default Content;
