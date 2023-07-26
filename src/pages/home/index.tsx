import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
} from '../../shared';
import { Container, VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';

function HomePage() {
  const currentUser = useCurrentUser();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      <Head prefix='Holdr Base' title='' description='Home page' />
      {currentUser && (
        <ContentLayout>
          <ContentLayoutMain>
            <Container maxWidth={650} pt={4}>
              <VStack gap={4} w='100%'>
                <FeedTabs />
              </VStack>
            </Container>
          </ContentLayoutMain>
          <ContentLayoutAside>
            <SuggestionsCard />
          </ContentLayoutAside>
        </ContentLayout>
      )}
    </Error>
  );
}
HomePage.displayName = 'HomePage';

export default HomePage;
