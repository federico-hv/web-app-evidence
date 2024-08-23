import {
  Alert,
  AlertContent,
  AlertDescription,
  Box,
  Circle,
  HStack,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import {
  IProfile,
  useUserMembershipsQuery,
  MembershipCard,
} from '../../../features';
import {
  CustomSkeleton,
  EmbeddedPlayer,
  Head,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';
import FavoriteArtist from './ui/favorite-artist';

function UserMemberships() {
  const { username } = useParams();

  const { state: profile } = useGeneralContext<IProfile>();

  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

  const CustomLoadingCard = () => (
    <Box w={288} h={350}>
      <CustomSkeleton radius={3} />
    </Box>
  );

  const { data, loading, error } = useUserMembershipsQuery(
    username || '',
    { take: 3 },
  );

  if (!loading && data && data.userMemberships.total === 0) {
    return <Fragment />;
  }

  if (error) {
    return (
      <Box
        mt={5}
        py={4}
        borderTop={1}
        borderColor='rgba(152, 152, 255, 0.1)'
      >
        <Alert variant='solid' status='danger'>
          <AlertContent>
            <AlertDescription>
              Failed to load your memberships
            </AlertDescription>
          </AlertContent>
        </Alert>
      </Box>
    );
  }

  return (
    <Fragment>
      {data && (
        <Fragment>
          <VStack gap={5}>
            <HStack justify='space-between'>
              <TextGroup w='fit-content'>
                <Text casing='capitalize' weight={500} size={4}>
                  My memberships
                </Text>
                {!loading ? (
                  <Text
                    casing='capitalize'
                    color='white700'
                    weight={300}
                    size={3}
                  >
                    {data.userMemberships.total} memberships
                  </Text>
                ) : (
                  <CustomSkeleton h='28px' w='300px' />
                )}
              </TextGroup>
              {data.userMemberships.total > 3 && (
                <Link
                  to={`/${profile.username}/memberships`}
                  state={{ previousLocation }}
                >
                  <Text size={4} weight={300} color='purple200'>
                    View all
                  </Text>
                </Link>
              )}
            </HStack>
            {loading ? (
              <HStack gap={4}>
                <CustomLoadingCard />
                <CustomLoadingCard />
                <CustomLoadingCard />
              </HStack>
            ) : (
              <FlatList
                gap={4}
                data={data.userMemberships.edges.slice(0, 3)}
                keyExtractor={(item) => item.node.id}
                renderItem={(item) => (
                  <MembershipCard
                    data={{
                      id: item.node.club.id,
                      name: `${item.node.club.name}'s club`,
                      coverImage: item.node.club.coverImage,
                      perks: item.node.perks.map(({ label }) => label),
                    }}
                  />
                )}
              />
            )}
          </VStack>
        </Fragment>
      )}
    </Fragment>
  );
}

export function UserBioPage() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <Head
        prefix={`${profile.displayName} - `}
        title='Bio'
        description='View information about the user.'
      />
      <VStack radius={2} p={4} mt={6} bgColor='rgba(48, 48, 75, 0.60)'>
        {profile.bio && (
          <Fragment>
            <TextGroup gap={3}>
              <TextGroupSubheading weight={500} size={4}>
                About
              </TextGroupSubheading>
              <TextGroupSubheading weight={300} color='white600'>
                {profile.bio}
              </TextGroupSubheading>
            </TextGroup>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.1)'
            />
          </Fragment>
        )}
        {profile.location && (
          <Fragment>
            <TextGroup gap={3}>
              <TextGroupSubheading
                casing='capitalize'
                weight={500}
                size={4}
              >
                Based In
              </TextGroupSubheading>
              <TextGroupSubheading weight={300} color='white600'>
                {profile.location}
              </TextGroupSubheading>
            </TextGroup>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.1)'
            />
          </Fragment>
        )}
        {profile.favoriteSong && (
          <Fragment>
            <VStack gap={3}>
              <Text casing='capitalize' weight={500} size={4}>
                Favorite Song
              </Text>
              <Box w={288}>
                <EmbeddedPlayer
                  provider='Spotify'
                  ids={profile.favoriteSong.externalIds}
                />
              </Box>
            </VStack>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.1)'
            />
          </Fragment>
        )}

        {profile.favoriteArtists && profile.favoriteArtists.length > 0 && (
          <Fragment>
            <VStack gap={3}>
              <Text casing='capitalize' weight={500} size={4}>
                Favorite Musicians
              </Text>
              <FlatList
                items='center'
                divider={<Circle mx={4} bgColor='black300' size='5px' />}
                data={profile.favoriteArtists}
                keyExtractor={(item) => item.externalIds[0].externalId}
                renderItem={({ artistId, name, externalIds }) => (
                  <FavoriteArtist
                    id={artistId}
                    name={name}
                    externalIds={externalIds}
                  />
                )}
              />
            </VStack>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.1)'
            />
          </Fragment>
        )}

        <UserMemberships />
      </VStack>
    </Fragment>
  );
}
UserBioPage.displayName = 'UserBioPage';

export default UserBioPage;
