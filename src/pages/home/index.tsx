import {
  Error,
  ErrorFallback,
  GQLRenderer,
  Head,
  Responsive,
  ResponsiveItem,
} from '../../shared';
import { VStack } from '@holdr-ui/react';
import { SuggestionsCard, useCurrentUser } from '../../features';
import { FeedTabs } from './ui';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  SmHeader,
} from '../../layout';

//TODO: Rename move
function HomePage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Error hasError={!currentUser} errorEl={<></>}>
        <Head prefix='Holdr Base' title='' description='Home page' />
        <Responsive>
          <ResponsiveItem mobile='show'>
            <SmHeader />
          </ResponsiveItem>
        </Responsive>
        {currentUser && (
          <ContentLayout>
            <ContentLayoutMain>
              <VStack gap={4} mt={{ '@bp1': 56, '@bp3': 0 }} w='100%'>
                <FeedTabs />
              </VStack>
            </ContentLayoutMain>
            <ContentLayoutAside>
              <SuggestionsCard />
            </ContentLayoutAside>
          </ContentLayout>
        )}
      </Error>
    </GQLRenderer>
  );
}
HomePage.displayName = 'HomePage';

export default HomePage;
