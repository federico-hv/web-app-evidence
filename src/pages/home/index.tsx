import { ErrorFallback, GQLRenderer, Head } from '../../shared';
import {
  AnalyticsSummary,
  ClubOverview,
  ProfileSummary,
  RecommendedArtists,
  TrendingClubs,
  useCurrentUser,
  UserRoleEnum,
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
      <Head prefix='Holdr - ' title='Home' description='Home page' />
      {currentUser && (
        <ContentLayout>
          <ContentLayoutMain>
            <FeedTabs />
          </ContentLayoutMain>
          <ContentLayoutAside hideScrollbar>
            <GQLRenderer ErrorFallback={() => <Fragment />}>
              <ProfileSummary />
            </GQLRenderer>

            {currentUser.role === UserRoleEnum.Artist ? (
              <Fragment>
                <ClubOverview />
                <AnalyticsSummary />
              </Fragment>
            ) : (
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
