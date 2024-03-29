import { Button, Center, Heading, Text, VStack } from '@holdr-ui/react';
import Head from '../head';
import { useNavigate } from 'react-router-dom';
import { Paths } from '../../constants';
import {
  AnalyticsSummary,
  MembershipValueSummary,
  ProfileSummary,
  RecommendedArtists,
  TrendingClubs,
  useCurrentUser,
} from '../../../features';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from '../../../layout';
import { RadialSurface } from '../surface';
import { makeButtonLarger } from '../../styles';
import { Fragment } from 'react';
import { dummyAnalyticsSummaryData } from 'pages/home/shared/constants';

//TODO: make this a component.

function NotFoundError({ q }: { q?: string }) {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const query = q ? `?q=${q}` : '';

  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      {currentUser && (
        <ContentLayout>
          <ContentLayoutMain>
            <RadialSurface
              radius={4}
              h={{
                '@bp1': '100vh',
                '@bp3': 'calc(100vh - 96px)',
              }}
              w='100%'
            >
              <Center h='100%' css={{ flexDirection: 'column' }}>
                <VStack
                  gap={3}
                  items='center'
                  w={{ '@bp1': '100%', '@bp3': '70%' }}
                  mb={5}
                >
                  <Heading
                    as='h1'
                    weight={500}
                    css={{ textAlign: 'center' }}
                  >
                    Oops, nothing here
                  </Heading>
                  <Text
                    color='base300'
                    size={2}
                    css={{ textAlign: 'center' }}
                  >
                    We could not find what you are looking for. It has
                    either been moved or we never had it. You can try to
                    search for it
                  </Text>
                </VStack>
                <Button
                  colorTheme='white50'
                  className={makeButtonLarger('3rem')}
                  onClick={() => navigate(`/${Paths.discover}${query}`)}
                  label='Search'
                />
              </Center>
            </RadialSurface>
          </ContentLayoutMain>
          <ContentLayoutAside>
            <ProfileSummary />
            {currentUser.role === 'artist' && (
              <Fragment>
                <MembershipValueSummary />
                <AnalyticsSummary data={dummyAnalyticsSummaryData}/>
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
    </>
  );
}
NotFoundError.displayName = 'NotFoundError';

export default NotFoundError;
