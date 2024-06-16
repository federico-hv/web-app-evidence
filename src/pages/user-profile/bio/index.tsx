import {
  Box,
  Circle,
  HStack,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { IProfile, MembershipCard } from '../../../features';
import {
  Asset,
  EmbeddedPlayer,
  Head,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../shared';
import { FlatList } from '../../../tmp/flat-list';
import FavoriteArtist from './ui/favorite-artist';
import { dummyPerks } from '../../clubs/shared';

export function UserBioPage() {
  const { state: profile } = useGeneralContext<IProfile>();

  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

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
              <EmbeddedPlayer
                provider='Spotify'
                ids={profile.favoriteSong.externalIds}
              />
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

        <VStack gap={5}>
          <HStack justify='space-between'>
            <TextGroup w='fit-content'>
              <Text casing='capitalize' weight={500} size={4}>
                My memberships
              </Text>
              <Text
                casing='capitalize'
                color='white700'
                weight={300}
                size={3}
              >
                7 memberships
              </Text>
            </TextGroup>
            <Link
              to={`/${profile.username}/memberships`}
              state={{ previousLocation }}
            >
              <Text size={4} weight={300} color='purple200'>
                View all
              </Text>
            </Link>
          </HStack>
          <HStack>
            <MembershipCard
              data={{
                slug: '',
                name: 'Thomas Selas Club',
                coverImage: Asset.Image.DummyMembershipCover,
                perks: dummyPerks,
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </Fragment>
  );
}
UserBioPage.displayName = 'UserBioPage';

export default UserBioPage;
