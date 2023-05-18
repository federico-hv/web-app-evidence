import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head, RecommendationListsGroup } from '../../components';

function BookmarksPage() {
  return (
    <>
      <Head
        title='Channels'
        description='Tap back into all the stuff that you saved earlier and found interesting.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Bookmarks page</Text>
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
