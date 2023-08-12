import { Center, Container, Icon, Tabs, VStack } from '@holdr-ui/react';
import {
  Error,
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useProfile,
} from '../../../shared';
import {
  FeedCard,
  FeedsReturnModel,
  GET_REACTED_FEEDS,
  useUserFeeds,
} from '../../../features';
import { useQuery } from '@apollo/client';
import { useCanViewProfile } from '../shared';

function Feeds({
  type,
  emptyMessage,
}: {
  type: 'article' | 'post';
  emptyMessage: { title: string; subtitle: string };
}) {
  const { profile } = useProfile();

  const { loading, data, error } = useUserFeeds(profile.username, type);

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
        <Container maxWidth={600} p={0}>
          {data && data.userFeeds.count > 0 ? (
            <VStack gap={6} w='full' pb={6}>
              {data.userFeeds.data.map((item) => (
                <FeedCard key={item.id} data={item} />
              ))}
            </VStack>
          ) : (
            <TextGroup items='center'>
              <TextGroupHeading>{emptyMessage.title}</TextGroupHeading>
              <TextGroupSubheading size={2} color='base400' weight={500}>
                {emptyMessage.subtitle}
              </TextGroupSubheading>
            </TextGroup>
          )}
        </Container>
      </Loader>
    </Error>
  );
}

function ArtistContent() {
  const { profile } = useProfile();

  return (
    <Tabs defaultValue='posts'>
      <Tabs.List
        variant='link'
        css={{
          position: 'sticky',
          top: '65px',
          backgroundColor: '$clearTint500',
          blur: '12px',
          zIndex: 11,
          '& button': {
            height: '$7',
          },
        }}
      >
        <Container maxWidth={600}>
          <Tabs.Trigger value='posts'>Posts</Tabs.Trigger>
          <Tabs.Trigger value='articles'>Articles</Tabs.Trigger>
          <Tabs.Trigger value='cosign'>Co-signs</Tabs.Trigger>
        </Container>
      </Tabs.List>
      <Tabs.Content value='posts'>
        <Feeds
          type='post'
          emptyMessage={{
            title: 'No posts',
            subtitle: `${profile.displayName} has not yet created any posts.`,
          }}
        />
      </Tabs.Content>
      <Tabs.Content value='articles'>
        <Feeds
          type='article'
          emptyMessage={{
            title: 'No articles',
            subtitle: `${profile.displayName} has not yet added any articles.`,
          }}
        />
      </Tabs.Content>
      <Tabs.Content value='cosign'>
        <TextGroup items='center'>
          <TextGroupHeading>No co-signs</TextGroupHeading>
          <TextGroupSubheading size={2} color='base400' weight={500}>
            {profile.displayName} has not yet received any music release
            co-signs.
          </TextGroupSubheading>
        </TextGroup>
      </Tabs.Content>
    </Tabs>
  );
}

function GeneralUserContent() {
  const { profile } = useProfile();

  const { data, error, loading } = useQuery<
    { reactedFeeds: FeedsReturnModel },
    { username: string }
  >(GET_REACTED_FEEDS, { variables: { username: profile.username } });

  return (
    <Tabs defaultValue='activity'>
      <Tabs.List
        variant='link'
        css={{
          position: 'sticky',
          top: '65px',
          backgroundColor: '$clearTint500',
          blur: '12px',
          zIndex: 11,
          '& button': {
            height: '$7',
          },
        }}
      >
        <Container maxWidth={600}>
          <Tabs.Trigger value='activity'>Activity</Tabs.Trigger>
          <Tabs.Trigger value='cosigns'>Co-signs</Tabs.Trigger>
        </Container>
      </Tabs.List>
      <Tabs.Content value='activity'>
        <Error hasError={!!error} errorMessage={error?.message}>
          <Loader loading={loading}>
            <Container maxWidth='600px'>
              {data && data.reactedFeeds.count > 0 ? (
                <VStack gap={6} pb={6} w='100%'>
                  {data.reactedFeeds.data.map((item) => (
                    <FeedCard key={item.id} data={item} />
                  ))}
                </VStack>
              ) : (
                <TextGroup items='center'>
                  <TextGroupHeading>No activity yet</TextGroupHeading>
                  <TextGroupSubheading
                    size={2}
                    color='base400'
                    weight={500}
                  >
                    {profile.displayName} has not yet reacted to anything.
                  </TextGroupSubheading>
                </TextGroup>
              )}
            </Container>
          </Loader>
        </Error>
      </Tabs.Content>
      <Tabs.Content value='cosigns'>
        <TextGroup items='center'>
          <TextGroupHeading>No co-signs yet</TextGroupHeading>
          <TextGroupSubheading size={2} color='base400' weight={500}>
            {profile.displayName} has not yet co-signed any music release.
          </TextGroupSubheading>
        </TextGroup>
      </Tabs.Content>
    </Tabs>
  );
}

function Content() {
  const { profile } = useProfile();
  const { loading, error, canViewProfile } = useCanViewProfile();

  return (
    <Error hasError={!!error} errorMessage={error?.message}>
      <Loader loading={loading}>
        {!canViewProfile ? (
          <VStack py='70px' gap={5} h='calc(100vh - 322px)'>
            <Center fontSize='36px'>
              <Icon name='lock-fill' />
            </Center>
            <TextGroup items='center'>
              <TextGroup.Heading size={5}>
                Protected Account
              </TextGroup.Heading>
              <TextGroup.Subheading
                size={2}
                color='base400'
                weight={500}
                css={{ maxWidth: '60%', textAlign: 'center' }}
              >
                This account is protected. Request to follow @
                {profile.username} to view their activity and cosigns.
              </TextGroup.Subheading>
            </TextGroup>
          </VStack>
        ) : (
          <SwitchConditional>
            <SwitchConditionalCase on={profile.role === 'artist'}>
              <ArtistContent />
            </SwitchConditionalCase>
            <SwitchConditionalCase on={profile.role === 'general'}>
              <GeneralUserContent />
            </SwitchConditionalCase>
          </SwitchConditional>
        )}
      </Loader>
    </Error>
  );
}
Content.displayName = 'Content';

export default Content;
