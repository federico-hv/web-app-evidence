import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { Head, RecommendationListsGroup } from 'components';

function HomePage() {
  return (
    <>
      <Head
        title='Feeds'
        description='View all the latest articles, posts and more from all the artists that you are following.'
        url='/feeds'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Home page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
HomePage.displayName = 'HomePage';
export default HomePage;
