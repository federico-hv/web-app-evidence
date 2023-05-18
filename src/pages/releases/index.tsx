import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { Head, RecommendationListsGroup } from '../../components';

function ReleasesPage() {
  return (
    <>
      <Head
        title='Releases'
        description='View all the latest album and song releases from all the artists that you are following and more'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Releases page</Text>
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
