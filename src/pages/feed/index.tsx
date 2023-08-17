import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../shared';
import { Card, Container, Text, VStack } from '@holdr-ui/react';
import { SuggestionsCard } from '../../features';
import FeedContent from './ui/feed.content';

function FeedPage() {
  return (
    <ContentLayout>
      <ContentLayoutMain>
        <FeedContent />
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
