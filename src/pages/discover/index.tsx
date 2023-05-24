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

function DiscoverPage() {
  return (
    <>
      <Head
        title='Discover'
        description='Looking for something new? We can help you find new artists, new channels and more.'
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
DiscoverPage.displayName = 'DiscoverPage';
export default DiscoverPage;
