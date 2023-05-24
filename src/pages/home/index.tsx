import {
  ContentLayout,
  ContentLayoutMain,
  ContentLayoutAside,
} from 'layouts';
import { ContentBox, Head, RecommendationListsGroup } from 'components';

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
          <ContentBox>Nothing To Display</ContentBox>
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
