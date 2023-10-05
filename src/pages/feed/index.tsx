import { ErrorFallback, GQLRenderer, useScrollToTop } from '../../shared';
import { Card, Container, Text, VStack } from '@holdr-ui/react';
import { SuggestionsCard } from '../../features';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  PageLayout,
  PageLayoutContent,
  PageLayoutHeader,
} from '../../layout';
import { FeedProvider } from './shared';
import { Header, Content } from './ui';

function FeedPage() {
  useScrollToTop(document.querySelector('#root'));

  return (
    <ContentLayout>
      <ContentLayoutMain>
        <GQLRenderer ErrorFallback={ErrorFallback}>
          <FeedProvider>
            <PageLayout>
              <PageLayoutHeader>
                <Container maxWidth={{ '@bp1': '100%', '@bp3': 600 }}>
                  <Header />
                </Container>
              </PageLayoutHeader>
              <PageLayoutContent>
                <Content />
              </PageLayoutContent>
            </PageLayout>
          </FeedProvider>
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
