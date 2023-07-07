import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
  Loader,
  NotFoundError,
} from '../../packages';
import { VStack } from '@holdr-ui/react';
import { Content, Header } from './ui';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IProfile } from './shared';
import { GET_PROFILE } from './queries';
import { ProfileContextProvider } from '../../packages';
import SuggestionsCard from './ui/suggestions.card';
import InfoCard from './ui/info.card';
import RelationshipsCard from './ui/relationships.card';

function ProfilePage() {
  const { username } = useParams();
  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        username: username,
      },
    },
  );

  return (
    <ContentLayout>
      <ContentLayoutMain>
        <Error hasError={!!error} errorEl={<NotFoundError />}>
          <Loader h='full' loading={loading}>
            {data && (
              <ProfileContextProvider value={{ profile: data.profile }}>
                <Head
                  prefix=''
                  title={`${data.profile.displayName} (@${data.profile.username})`}
                  description={data.profile.bio || ''}
                />
                <Header />
              </ProfileContextProvider>
            )}
          </Loader>
        </Error>
        <Content />
      </ContentLayoutMain>
      <ContentLayoutAside>
        <Error hasError={!!error} errorEl={<NotFoundError />}>
          <Loader h='full' loading={loading}>
            {data && (
              <ProfileContextProvider value={{ profile: data.profile }}>
                <Head
                  prefix=''
                  title={`${data.profile.displayName} (@${data.profile.username})`}
                  description={data.profile.bio || ''}
                />
                <VStack gap={4}>
                  <RelationshipsCard />
                  <InfoCard />
                  <SuggestionsCard />
                </VStack>
              </ProfileContextProvider>
            )}
          </Loader>
        </Error>
      </ContentLayoutAside>
    </ContentLayout>
  );
}

export default ProfilePage;
