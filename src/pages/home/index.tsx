import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { Head, RecommendationListsGroup, MainHeaderSm } from 'components';
import { HomeContent } from 'content';

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
          <MainHeaderSm />
          <HomeContent />
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
