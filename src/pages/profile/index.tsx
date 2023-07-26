import { VStack } from '@holdr-ui/react';
import {
  Content,
  Header,
  SocialsCard,
  RelationshipsCard,
  ReleasesCard,
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
import { SuggestionsCard } from '../../features';

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
    <Error hasError={!!error} errorEl={<NotFoundError />}>
      <Loader h={250} loading={loading}>
        {data && (
          <ProfileContextProvider value={{ profile: data.profile }}>
            <ContentLayout>
              <ContentLayoutMain>
                {data && (
                  <>
                    <Head
                      prefix=''
                      title={`${data.profile.displayName} (@${data.profile.username})`}
                      description={data.profile.bio || ''}
                    />
                    <Header />
                  </>
                )}

                <Content />
              </ContentLayoutMain>
              <ContentLayoutAside>
                <VStack>
                  <RelationshipsCard />
                  <SocialsCard />
                  <ReleasesCard />
                  <SuggestionsCard />
                </VStack>
              </ContentLayoutAside>
            </ContentLayout>
          </ProfileContextProvider>
        )}
      </Loader>
    </Error>
  );
}

export default ProfilePage;
