import { Box, HStack, Icon, Stack, VStack } from '@holdr-ui/react';
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
  BackButton,
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
  Error,
  Head,
  Loader,
  NotFoundError,
  ProfileContextProvider,
  UserNamesGroup,
  useScrollDirection,
} from '../../shared';
import { SuggestionsCard } from '../../features';
import { Fragment } from 'react';
import { StackProps } from '@holdr-ui/react/dist/components/stack/src/stack.types';

export function SmHeaderWrapper({
  hideOnScroll = true,
  children,
  ...props
}: StackProps & { hideOnScroll?: boolean }) {
  const { direction, delta } = useScrollDirection('#root');

  return (
    <Box
      display={
        hideOnScroll && direction === 'down' && delta > 0
          ? 'none'
          : 'block'
      }
      position='fixed'
      t={0}
      w='100%'
      bgColor='clearTint500'
      css={{
        blur: '12px',
        zIndex: 50,
      }}
      h={58}
    >
      <Stack h='100%' direction='horizontal' p={3} {...props}>
        {children}
      </Stack>
    </Box>
  );
}

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
          <Fragment>
            <SmHeaderWrapper gap={3}>
              <BackButton />
              <HStack gap={2}>
                <UserNamesGroup
                  displayName={data.profile.displayName}
                  username={data.profile.username}
                />
                {data.profile.protected && (
                  <Box h='fit-content' fontSize={2}>
                    <Icon name='lock-fill' />
                  </Box>
                )}
              </HStack>
            </SmHeaderWrapper>

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
          </Fragment>
        )}
      </Loader>
    </Error>
  );
}

export default ProfilePage;
