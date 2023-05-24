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

function BookmarksPage() {
  return (
    <>
      <Head
        title='Channels'
        description='Tap back into all the stuff that you saved earlier and found interesting.'
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
BookmarksPage.displayName = 'BookmarksPage';
export default BookmarksPage;
