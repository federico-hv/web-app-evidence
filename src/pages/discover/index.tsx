import {
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
  Tabs,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  Error,
  Head,
  IReturnMany,
  UserModel,
  LinkOverlay,
  Loader,
  prefix,
  UserNamesGroup,
  useGoBack,
  ErrorFallback,
  GQLRenderer,
  TabBorderFix,
} from '../../shared';
import { CommonRelationshipButton, SEARCH, Search } from '../../features';
import { useSearchParams } from 'react-router-dom';
import { Fragment } from 'react';
import { useQuery } from '@apollo/client';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layout';

/**
 * TODO:
    -[ ] Refactor
    -[ ] Add PageLayout
 */

function useSearchResults(queryString: string) {
  const { data, loading, error } = useQuery<
    {
      search: IReturnMany<UserModel>;
    },
    { queryString: string }
  >(SEARCH, { variables: { queryString: queryString } });

  return { data, loading, error };
}

function PeopleTab({ query }: { query: string }) {
  const { loading, error, data } = useSearchResults(query);

  return (
    <Error hasError={!!error}>
      <Loader loading={loading}>
        <Container maxWidth={600}>
          {data && data.search.count > 0 ? (
            <VStack flex={1}>
              {data.search.data.map((user) => (
                <HStack
                  gap={3}
                  p={4}
                  w='100%'
                  h='100%'
                  radius={2}
                  cursor='pointer'
                  items='center'
                  _hover={{ backgroundColor: '$base100' }}
                  position='relative'
                  key={user.id}
                >
                  <LinkOverlay to={prefix('/', user.username)} />
                  <Avatar
                    variant='squircle'
                    src={user.avatar}
                    name={user.displayName}
                  />
                  <UserNamesGroup
                    displayName={user.displayName}
                    username={user.displayName}
                  />
                  <GQLRenderer
                    ErrorFallback={ErrorFallback}
                    LoadingFallback={<Fragment />}
                  >
                    <CommonRelationshipButton username={user.username} />
                  </GQLRenderer>
                </HStack>
              ))}
            </VStack>
          ) : (
            <Text size={2}>
              We could not find any user that matches
              <Text weight={500} css={{ display: 'inline' }}>
                {` "${query}"`}
              </Text>
            </Text>
          )}
        </Container>
      </Loader>
    </Error>
  );
}

function SearchResults() {
  const [searchParams] = useSearchParams();

  return (
    <VStack>
      <Tabs defaultValue='for-you'>
        <Tabs.List
          variant='link'
          css={{
            position: 'sticky',
            backgroundColor: '$clearTint500',
            blur: '12px',
            zIndex: 11,
            t: '65px',
            '& button': {
              height: '$7',
            },
          }}
        >
          <Container maxWidth={600}>
            <Tabs.Trigger value='for-you'>People</Tabs.Trigger>
            <Tabs.Trigger value='trending'>Releases</Tabs.Trigger>
          </Container>
        </Tabs.List>
        <Tabs.Content value='for-you'>
          <PeopleTab query={searchParams.get('q') || ''} />
        </Tabs.Content>
        <Tabs.Content value='trending'>
          <Container maxWidth={600}>Trending</Container>
        </Tabs.Content>
      </Tabs>
    </VStack>
  );
}

function DiscoverContent() {
  return (
    <TabBorderFix>
      <Tabs defaultValue='for-you'>
        <Tabs.List
          variant='link'
          css={{
            position: 'sticky',
            backgroundColor: '$clearTint500',
            blur: '12px',
            zIndex: 5,
            '& button': {
              height: '$7',
            },
            '@bp1': {
              t: 0,
            },
            '@bp3': {
              t: '65px',
            },
          }}
        >
          <Container maxWidth={600}>
            <Tabs.Trigger value='for-you'>
              <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                For you
              </Text>
            </Tabs.Trigger>
            <Tabs.Trigger value='trending'>
              <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
                Trending
              </Text>
            </Tabs.Trigger>
          </Container>
        </Tabs.List>
        <Tabs.Content value='for-you'>
          <Container maxWidth={600}>
            <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
              For you
            </Text>
          </Container>
        </Tabs.Content>
        <Tabs.Content value='trending'>
          <Container maxWidth={600}>
            <Text weight={500} size={{ '@bp1': 2, '@bp3': 3 }}>
              Trending
            </Text>
          </Container>
        </Tabs.Content>
      </Tabs>
    </TabBorderFix>
  );
}

function DiscoverPage() {
  const goBack = useGoBack();
  const [searchParams] = useSearchParams();

  const query = searchParams.get('q');

  return (
    <Fragment>
      <Head
        prefix={!!query ? `${query} - ` : 'Holdr - '}
        title='Discover'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Box as='header'>
            {query && (
              <Container maxWidth={600}>
                <HStack gap={3} py={4} items='center'>
                  <IconButton
                    icon='arrow-left-outline'
                    ariaLabel='go back'
                    variant='ghost'
                    size='lg'
                    onClick={goBack}
                  />
                  <Text>
                    Search results for{' '}
                    <Text weight={500} css={{ display: 'inline' }}>
                      {searchParams.get('q')}
                    </Text>
                  </Text>
                </HStack>
              </Container>
            )}
            <Container
              py={3}
              maxWidth={600}
              display={{ '@bp1': 'block', '@bp3': 'none' }}
            >
              <Search />
            </Container>
            {query ? <SearchResults /> : <DiscoverContent />}
          </Box>
        </ContentLayoutMain>
        <ContentLayoutAside></ContentLayoutAside>
      </ContentLayout>
    </Fragment>
  );
}
DiscoverPage.displayName = 'DiscoverPage';

export default DiscoverPage;
