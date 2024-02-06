import { ErrorFallback, GQLRenderer, Head } from '../../shared';
import {
  AnalyticsSummary,
  MembershipValueSummary,
  MonthlySalesSummary,
  ProfileSummary,
  RecommendedArtists,
  TrendingClubs,
  useCurrentUser,
} from '../../features';
import { FeedTabs } from './ui';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../layout';
import { Fragment } from 'react';
function HomePage() {
  const currentUser = useCurrentUser();

  return (
    <GQLRenderer ErrorFallback={ErrorFallback}>
      <Head prefix='Holdr' title='' description='Home page' />
      {currentUser && (
        <ContentLayout>
          <ContentLayoutMain>
            <FeedTabs />
          </ContentLayoutMain>
          <ContentLayoutAside>
            <ProfileSummary />
            {currentUser.role === 'artist' && (
              <Fragment>
                <MembershipValueSummary />
                <MonthlySalesSummary />
                <AnalyticsSummary />
              </Fragment>
            )}
            {currentUser.role === 'general' && (
              <Fragment>
                <TrendingClubs />
                <RecommendedArtists />
              </Fragment>
            )}
          </ContentLayoutAside>
        </ContentLayout>
      )}
    </GQLRenderer>
  );
}
HomePage.displayName = 'HomePage';

export default HomePage;
