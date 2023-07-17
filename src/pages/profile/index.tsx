import { VStack } from '@holdr-ui/react';
import {
  Content,
  Header,
  SocialsCard,
  RelationshipsCard,
  ReleasesCard,
  SuggestionsCard,
} from './ui';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { IProfile } from './shared';
import { GET_PROFILE } from './queries';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
  Loader,
  NotFoundError,
  ProfileContextProvider,
} from '../../shared';

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
          <Loader h={250} loading={loading}>
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
        <Error hasError={!!error} errorEl={<SuggestionsCard />}>
          <Loader h={250} loading={loading}>
            {data && (
              <ProfileContextProvider value={{ profile: data.profile }}>
                <Head
                  prefix=''
                  title={`${data.profile.displayName} (@${data.profile.username})`}
                  description={data.profile.bio || ''}
                />
                <VStack>
                  <RelationshipsCard />
                  <SocialsCard />
                  <ReleasesCard />
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
