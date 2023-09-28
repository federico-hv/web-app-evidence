import {
  BackButton,
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  ErrorFallback,
  GeneralContextProvider,
  GenericProps,
  GQLRenderer,
  LinkText,
  prefix,
  useGeneralContext,
  useScrollToTop,
} from '../../shared';
import {
  Box,
  Card,
  Container,
  Heading,
  HStack,
  Text,
  VStack,
} from '@holdr-ui/react';
import { FeedModel, GET_FEED, SuggestionsCard } from '../../features';
import { Content } from './ui';
import { useSuspenseQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';

function Header() {
  const { state }: { state: FeedModel } = useGeneralContext<FeedModel>();

  return (
    <Box
      borderBottom={1}
      bgColor='clearTint500'
      borderColor='base100'
      css={{
        zIndex: 10,
        blur: '12px',
        '@bp1': {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
        },
        '@bp3': {
          position: 'sticky',
          top: 65,
        },
      }}
    >
      <Container maxWidth={600} py={3} maxHeight={58}>
        <HStack gap={3}>
          <BackButton />
          <VStack>
            <Heading size={{ '@bp1': 3, '@bp3': 4 }} weight={500} as='h2'>
              Feed
            </Heading>
            <LinkText
              to={prefix('/', state.owner.username)}
              size={1}
              color='base400'
            >
              @{state.owner.username}
            </LinkText>
          </VStack>
        </HStack>
      </Container>
    </Box>
  );
}

function ContextWrapper({ children }: GenericProps) {
  const { id } = useParams();
  const { data } = useSuspenseQuery<{ feed: FeedModel }, { id: string }>(
    GET_FEED,
    { variables: { id: id || '' } },
  );

  return (
    <GeneralContextProvider
      value={{
        state: data.feed,
        update: () => {
          return;
        },
      }}
    >
      {children}
    </GeneralContextProvider>
  );
}

function FeedPage() {
  useScrollToTop(document.querySelector('#root'));

  return (
    <ContentLayout>
      <ContentLayoutMain>
        <GQLRenderer ErrorFallback={ErrorFallback}>
          <ContextWrapper>
            <Header />
            <Content />
          </ContextWrapper>
        </GQLRenderer>
        <Container maxWidth={600}>
          <VStack py={5}>
            <Card>
              <Card.Body p={4}>
                <Text size={2}>
                  No discussion has been started yet. You can share this
                  post to your favorite channels to get started.
                </Text>
              </Card.Body>
            </Card>
          </VStack>
        </Container>
      </ContentLayoutMain>
      <ContentLayoutAside>
        <SuggestionsCard />
      </ContentLayoutAside>
    </ContentLayout>
  );
}

FeedPage.displayName = 'FeedPage';

export default FeedPage;
