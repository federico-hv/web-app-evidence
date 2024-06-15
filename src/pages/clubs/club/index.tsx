import {
  IClub,
  SocialButton,
  useCurrentUser,
  useGetClub,
  useRelationshipStatusInfo,
} from '../../../features';
import {
  RadialSurface,
  RoutingTabs,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  RoutingTabsContent,
  voidFn,
} from '../../../shared';
import {
  Box,
  Center,
  GeneralContextProvider,
  Heading,
  HStack,
  useGeneralContext,
} from '@holdr-ui/react';
import { Navigate, useParams } from 'react-router-dom';
import { Fragment } from 'react';

function ArtistClubSocialButton({ username }: { username: string }) {
  const { data } = useRelationshipStatusInfo(username);

  return (
    <SocialButton
      username={username}
      statusInfo={data.relationshipStatusInfo}
    />
  );
}

function ArtistClubHeader() {
  const currentUser = useCurrentUser();

  const { state: club } = useGeneralContext<IClub>();

  return (
    <HStack py={3} gap={4} items='center' justify='space-between'>
      <HStack gap={4} items='center'>
        <Heading weight={400} size={6} css={{ lineHeight: '115%' }}>
          {club.artist.name}'s Club Page
        </Heading>
        <Center
          px={2}
          border={1}
          fontWeight={500}
          fontSize={2}
          borderColor='success500'
          color='success500'
          radius={1}
        >
          LIVE
        </Center>
      </HStack>

      {currentUser.id !== club.artist.accountId && (
        <ArtistClubSocialButton username={club.artist.username} />
      )}
    </HStack>
  );
}

function ClubPage() {
  const { slug } = useParams();

  const { data, error } = useGetClub({ slug: slug || '' });

  if (error) {
    return <Navigate to='/' />;
  }
  return (
    <Fragment>
      {data && (
        <GeneralContextProvider
          value={{ state: data.club, update: voidFn }}
        >
          <RadialSurface w='100%' radius={4} h='fit-content'>
            <Box px={5} py={5}>
              <ArtistClubHeader />
              <RoutingTabs defaultValue='bio' flex={1}>
                <RoutingTabsHeader
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.10)'
                >
                  <RoutingTabsList gap={1}>
                    <RoutingTabsTrigger
                      to='bio'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Bio
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='feeds'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Feed
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='live-bids'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Live Bids
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='membership-perks'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Membership Perks
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                </RoutingTabsHeader>

                <RoutingTabsContent mt={4} h='full' />
              </RoutingTabs>
            </Box>
          </RadialSurface>
        </GeneralContextProvider>
      )}
    </Fragment>
  );
}

ClubPage.displayName = 'ClubPage';

export default ClubPage;
