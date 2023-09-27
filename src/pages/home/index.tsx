import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
  Responsive,
  ResponsiveItem,
} from '../../shared';
import { VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';
import SmNavigation from '../../features/layout/ui/navigation/sm';

//TODO: Rename move

function HomePage() {
  const currentUser = useCurrentUser();

  return (
    <Error hasError={!currentUser} errorEl={<></>}>
      <Head prefix='Holdr Base' title='' description='Home page' />
      <Responsive>
        <ResponsiveItem mobile='show'>
          <SmNavigation />
        </ResponsiveItem>
      </Responsive>
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
