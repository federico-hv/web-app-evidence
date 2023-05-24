import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import {
  ContentBox,
  Head,
  RecommendationListsGroup,
} from '../../components';

function ReleasesPage() {
  return (
    <>
      <Head
        title='Releases'
        description='View all the latest album and song releases from all the artists that you are following and more'
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
ReleasesPage.displayName = 'ReleasesPage';
export default ReleasesPage;
