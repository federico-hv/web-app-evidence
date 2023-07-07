import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layouts';
import { ContentBox, Head, RecommendationListsGroup } from '../../components';

function SupportPage() {
  return (
    <>
      <Head
        title='Support'
        description='Connect with our team and get a case started.'
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
SupportPage.displayName = 'SupportPage';
export default SupportPage;
