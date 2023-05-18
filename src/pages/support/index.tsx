import { Text } from '@holdr-ui/react';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from 'layouts';
import { Head, RecommendationListsGroup } from 'components';

function SupportPage() {
  return (
    <>
      <Head
        title='Support'
        description='Connect with our team and get a case started.'
      />
      <ContentLayout>
        <ContentLayoutMain>
          <Text role='contentinfo'>Support page</Text>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
SupportPage.displayName = 'SupportPage';
export default SupportPage;
