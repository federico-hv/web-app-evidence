import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
} from '../../shared';
import { VStack } from '@holdr-ui/react';
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
            <VStack gap={4} w='100%'>
              <FeedTabs />
            </VStack>
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
