import { ReactNode, useContext, useEffect } from 'react';
import {
  Avatar,
  Box,
  Button,
  HStack,
  IconButton,
  Image,
  Text,
  VStack,
} from '@holdr-ui/react';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import {
  ContentLayout,
  ContentLayoutAside,
  ContentLayoutMain,
} from 'layouts';
import {
  RecommendationListsGroup,
  ContentBox,
  Head,
  Loader,
  NotFoundContent,
} from 'components';
import { GET_PROFILE } from 'lib';
import { IProfile } from 'shared';
import { AuthContext } from 'contexts';
import { useGoBack } from 'hooks';

import lightPlaceholder from '../../assets/images/light-placeholder.jpg';
function HeaderSm({ children }: { children?: ReactNode }) {
  const goBack = useGoBack();
  return (
    <Box
      zIndex={10}
      as='header'
      position='fixed'
      bgColor='clearTint500'
      t={0}
      l={0}
      h={50}
      w='100%'
      p={3}
    >
      <HStack gap={4} items='center'>
        <IconButton
          colorTheme='primary400'
          icon='arrow-left-outline'
          ariaLabel='go back'
          boxShadow='none'
          onClick={goBack}
        />
        <Box w='70%'>{children}</Box>
      </HStack>
    </Box>
  );
}

function ProfileStatistic({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <HStack fontSize={2} gap={1} as='p'>
      <Text weight={600} as='span'>
        {value}
      </Text>
      {label}
    </HStack>
  );
}

function ProfileButton({ profile }: { profile: IProfile }) {
  const { currentUser } = useContext(AuthContext);
  return (
    <>
      {currentUser && (
        <>
          {profile.accountType === 'ARTIST' && (
            <HStack gap={3} items='center'>
              <Button
                size={{ '@bp1': 'sm', '@bp4': 'base' }}
                label='Follow'
              />
              <IconButton
                variant='ghost'
                size={{ '@bp1': 'sm', '@bp4': 'base' }}
                ariaLabel='more'
                icon='more-fill'
              />
            </HStack>
          )}

          {profile.accountType === 'FAN' && (
            <HStack gap={3} items='center'>
              <Button
                size={{ '@bp1': 'sm', '@bp4': 'base' }}
                label='Make Friend'
              />
              <IconButton
                variant='ghost'
                size={{ '@bp1': 'sm', '@bp4': 'base' }}
                ariaLabel='more'
                icon='more-fill'
              />
            </HStack>
          )}

          {profile.accountType === 'PERSONAL' && (
            <Button size={{ '@bp1': 'sm', '@bp4': 'base' }} label='Edit' />
          )}
        </>
      )}
    </>
  );
}

function ProfileNameGroup({
  username,
  displayName,
}: {
  username: string;
  displayName: string;
}) {
  return (
    <VStack
      gap={1}
      w='100%'
      borderBottom={2}
      borderColor='base100'
      css={{
        '@bp4': {
          borderBottom: 'none',
        },
      }}
    >
      <Text weight={600} size={4}>
        {displayName}
      </Text>
      <Text size={2}>@{username}</Text>
    </VStack>
  );
}

function ProfileHeaderOverlay() {
  return (
    <Box
      bgColor='clearTint500'
      position='absolute'
      t={{ '@bp1': 50, '@bp3': 0 }}
      b={0}
      l={0}
      zIndex={10}
      w='100%'
    />
  );
}

function ProfileStatistics({ profile }: { profile: IProfile }) {
  return (
    <HStack gap={3}>
      {profile.accountType === 'ARTIST' && (
        <ProfileStatistic value={0} label='followers' />
      )}
      {profile.accountType === 'FAN' && (
        <ProfileStatistic value={0} label='friends' />
      )}
      {profile.holdrs && (
        <ProfileStatistic value={profile.holdrs} label='holdrs' />
      )}
      {profile.memberships && (
        <ProfileStatistic
          value={profile.memberships}
          label='memberships'
        />
      )}
    </HStack>
  );
}

function ProfileHeaderSm({ profile }: { profile: IProfile }) {
  return (
    <Box css={{ '@bp4': { display: 'none' } }}>
      <HeaderSm />
      <Box
        role='banner'
        h={150}
        t={0}
        w='100%'
        bgColor='base300'
        position='relative'
      >
        <Box position='absolute' t={0} l={0} h='100%' w='100%'>
          <Box position='relative' t={0} h={150} w='100%'>
            <Image
              w='100%'
              h={150}
              src={profile.coverImage}
              fallbackSrc={lightPlaceholder}
            />

            <ProfileHeaderOverlay />

            <HStack
              position='absolute'
              w='100%'
              b={-16}
              zIndex={10}
              gap={4}
              px={3}
            >
              <Box flex={1}>
                <Avatar
                  src={profile.avatar}
                  variant='squircle'
                  name=''
                  css={{
                    height: 75,
                    width: 75,
                  }}
                />
              </Box>
              <ProfileNameGroup
                username={profile.username}
                displayName={profile.displayName}
              />
            </HStack>
          </Box>
        </Box>
      </Box>

      <VStack w='100%' mt={6} px={3}>
        {profile.bio && <Text size={2}>[Bio]</Text>}
        {profile.url && <Text size={2}>[Url]</Text>}
        <HStack justify='space-between' items='center' color='base400'>
          <ProfileStatistics profile={profile} />
          <ProfileButton profile={profile} />
        </HStack>
      </VStack>
    </Box>
  );
}

function ProfileHeaderLg({ profile }: { profile: IProfile }) {
  return (
    <Box
      css={{ '@bp1': { display: 'none' }, '@bp4': { display: 'block' } }}
    >
      <Box
        role='banner'
        h={200}
        t={0}
        w='100%'
        bgColor='base300'
        position='relative'
      >
        <ProfileHeaderOverlay />
        <Image
          w='100%'
          h={200}
          src={profile.coverImage}
          fallbackSrc={lightPlaceholder}
        />
        <HStack
          position='absolute'
          items='center'
          t={0}
          b={0}
          zIndex={10}
          w='100%'
          px={3}
        >
          <HStack w='100%' gap={4}>
            <Box>
              <Avatar
                src={profile.avatar}
                variant='squircle'
                name=''
                css={{
                  height: 100,
                  width: 100,
                }}
              />
            </Box>
            <HStack w='100%' justify='space-between' items='flex-start'>
              <VStack gap={4}>
                <ProfileNameGroup
                  displayName={profile.displayName}
                  username={profile.username}
                />
              </VStack>
              <ProfileButton profile={profile} />
            </HStack>
          </HStack>
        </HStack>
      </Box>
    </Box>
  );
}

function NotFoundError() {
  return (
    <>
      <Head
        title='Page Not Found'
        description="We do not have what you're looking for."
      />
      <Box h={{ '@bp1': '100vh', '@bp3': 'calc(100vh - 65px)' }} w='100%'>
        <NotFoundContent />
      </Box>
    </>
  );
}

function ProfileHeader() {
  const currentUser = useContext(AuthContext).currentUser;
  const username = useLocation().pathname.split('/')[1];

  const { data, loading, error } = useQuery<{ profile: IProfile }>(
    GET_PROFILE,
    {
      variables: {
        payload: { username: username, id: currentUser?.id || 'id' },
      },
    },
  );

  return (
    <Error hasError={!!error} errorEl={<NotFoundError />}>
      {data && data.profile && (
        <Head
          prefix=''
          title={`${data.profile.displayName} (@${data.profile.username})`}
          description={data.profile.bio || ''}
        />
      )}
      <Loader loading={loading}>
        {data && data.profile && (
          <>
            <ProfileHeaderSm profile={data.profile} />
            <ProfileHeaderLg profile={data.profile} />
          </>
        )}
      </Loader>
    </Error>
  );
}

function Error({
  hasError,
  children,
  errorEl: el,
}: {
  errorMessage?: string;
  errorTitle?: string;
  hasError: boolean;
  children?: ReactNode;
  errorEl: JSX.Element;
}) {
  return <>{hasError ? <>{el}</> : <>{children}</>}</>;
}

function ProfilePage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  });
  return (
    <>
      <ContentLayout>
        <ContentLayoutMain>
          <ProfileHeader />
          <ContentBox>🚧 Under construction 🚧</ContentBox>
        </ContentLayoutMain>
        <ContentLayoutAside>
          <RecommendationListsGroup />
        </ContentLayoutAside>
      </ContentLayout>
    </>
  );
}
ProfilePage.displayName = 'ProfilePage';
export default ProfilePage;
