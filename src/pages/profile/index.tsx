import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Circle,
  Countdown,
  FontSize,
  HStack,
  Icon,
  IconButton,
  StackDivider,
  StringNumeric,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  Head,
  ISocialLink,
  LinkOverlay,
  makePath,
  Menu,
  MenuContent,
  MenuItem,
  MenuTrigger,
  Paths,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  SocialProvider,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../shared';
import { ProfileProvider } from './shared';
import { ContentLayout, ContentLayoutMain } from '../../layout';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  IExternalId,
  IProfile,
  MembershipCard,
  MusicReleaseProvider,
  SocialButton,
  useCurrentUser,
  useGetProfile,
  useRelationshipCount,
  useRelationshipStatusInfo,
} from '../../features';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import membershipCover from '../../assets/dummy/membership-1.jpg';
import {
  IconName,
  ResponsiveValue,
} from '@holdr-ui/react/dist/shared/types';
import { Fragment } from 'react';
import { orderBy } from 'lodash';
import millify from 'millify';
import { FlatList } from '../../tmp/flat-list';

dayjs.extend(LocalizedFormat);
dayjs().format('L LT');

export function SpotifyEmbeddedPlayer({ id }: { id: string }) {
  return (
    <iframe
      style={{ borderRadius: '12px' }}
      src={`https://open.spotify.com/embed/track/${id}?utm_source=generator`}
      width='100%'
      height='152'
      allowFullScreen
      allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
      loading='lazy'
    ></iframe>
  );
}

function EmbeddedPlayer({
  ids,
  provider,
}: {
  ids: IExternalId<number, MusicReleaseProvider>[];
  provider: MusicReleaseProvider;
}) {
  const item = ids.find((item) => item.provider === provider);

  return (
    <Fragment>
      {provider === 'Spotify' && item && (
        <Box w={288}>
          <SpotifyEmbeddedPlayer id={item.externalId} />
        </Box>
      )}
    </Fragment>
  );
}

function FavoriteArtist({
  name,
  id,
  externalIds,
}: {
  name: string;
  id?: string;
  externalIds: Array<
    IExternalId<number, MusicReleaseProvider> & { externalUrl: string }
  >;
}) {
  const spotifyItem = externalIds.find(
    (item) => item.provider === 'Spotify',
  );

  return (
    <Box
      position='relative'
      h='fit-content'
      w='fit-content'
      _hover={{
        '& > *': {
          textDecoration: 'underline',
        },
      }}
    >
      {(id || spotifyItem) && (
        <LinkOverlay
          target={id ? '_self' : '_blank'}
          to={
            id
              ? makePath([Paths.clubs, 'username'])
              : spotifyItem?.externalUrl
          }
        />
      )}
      <Text>{name}</Text>
    </Box>
  );
}

export function GeneralUserBioContent() {
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
                name: 'Thomas Selas Club',
                coverImage: membershipCover,
                artist: {
                  username: 'thomasselas',
                  displayName: 'Thomas Selas',
                  id: 'id',
                  avatar: '',
                  role: 'artist',
                },
              }}
            />
          </HStack>
        </VStack>
      </VStack>
    </Fragment>
  );
}

function FollowCountItem({
  count,
  label,
  onClick,
}: {
  onClick?: VoidFunction;
  count: number;
  label: string;
}) {
  return (
    <Box onClick={onClick}>
      <TextGroup direction='horizontal' fontSize={4} gap={1}>
        <TextGroupSubheading weight={500}>
          {millify(count, { precision: 2 })}
        </TextGroupSubheading>
        <TextGroupSubheading weight={300} color='white700'>
          {label}
        </TextGroupSubheading>
      </TextGroup>
    </Box>
  );
}

function IconLink({
  fontSize = 8,
  iconName = 'spotify-fill',
  to,
  isExternal = true,
}: {
  iconName: IconName;
  isExternal?: boolean;
  fontSize?: ResponsiveValue<FontSize | StringNumeric>;
  to?: string;
}) {
  return (
    <Box fontSize={fontSize} position='relative'>
      <LinkOverlay to={to} target={isExternal ? '_blank' : '_self'} />
      <Icon color='white600' name={iconName} />
    </Box>
  );
}

export function BioSocialLinks({ links }: { links: ISocialLink[] }) {
  const toIcon: Record<SocialProvider, IconName> = {
    Instagram: 'instagram',
    X: 'x-twitter',
    TikTok: 'tiktok',
  };

  return (
    <HStack gap={4}>
      {orderBy(links, ['provider'], 'asc').map((link) => (
        <IconLink
          key={link.provider}
          to={link.url}
          iconName={toIcon[link.provider]}
        />
      ))}
    </HStack>
  );
}

export function UserRelationshipCount({ username }: { username: string }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    loading: loading0,
    data: profileData,
    error: error0,
  } = useGetProfile(username);
  const {
    loading: loading1,
    data: relationshipCountData,
    error: error1,
  } = useRelationshipCount(username);

  if (error1 || error0 || loading0 || loading1) {
    return <Fragment />;
  }

  return (
    <Fragment>
      {profileData && relationshipCountData && (
        <HStack
          items='center'
          gap={3}
          divider={<Circle bgColor='black300' size='5px' />}
        >
          <FollowCountItem
            onClick={
              profileData.profile.protected
                ? undefined
                : () =>
                    navigate(makePath([username, 'followers']), {
                      state: {
                        previousLocation: pathname,
                      },
                    })
            }
            count={relationshipCountData.relationshipCount.followers}
            label='Followers'
          />
          <FollowCountItem
            onClick={
              profileData.profile.protected
                ? undefined
                : () =>
                    navigate(makePath([username, 'following']), {
                      state: {
                        previousLocation: pathname,
                      },
                    })
            }
            count={relationshipCountData.relationshipCount.following}
            label='Following'
          />
        </HStack>
      )}
    </Fragment>
  );
}

function GeneralUserProfileHeader() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { username } = useParams();
  const { pathname } = useLocation();
  const previousLocation = usePreviousLocation(pathname);

  const { state: profile } = useGeneralContext<IProfile>();

  const { data: statusInfoData } = useRelationshipStatusInfo(
    profile.username,
  );

  if (!username) {
    return <Fragment />;
  }

  return (
    <HStack items='center' gap={3} mb={5}>
      <Avatar
        key={profile.displayName}
        fallbackTextSize={10}
        size={124}
        src={profile.avatar}
        name={profile.displayName}
      >
        <AvatarBadge
          zIndex={1}
          size={18}
          bgColor='success500'
          r={20}
          b={15}
          border={2}
          borderColor='#1C1C29'
        />
      </Avatar>
      <VStack flex={1} gap={1}>
        <HStack flex={1} justify='space-between'>
          <VStack gap={1}>
            <VStack>
              <Text size={6}>{profile.displayName}</Text>
            </VStack>
            <UserRelationshipCount username={username} />
          </VStack>
          <HStack>
            {currentUser.username !== username ? (
              <SocialButton
                statusInfo={statusInfoData.relationshipStatusInfo}
                username={username}
              />
            ) : (
              <Button
                onClick={() =>
                  navigate('edit', {
                    state: {
                      previousLocation,
                    },
                  })
                }
                css={{ px: '50px' }}
                colorTheme='purple100'
              >
                Edit Profile
              </Button>
            )}
          </HStack>
        </HStack>
        {profile.socialLinks.length > 0 && (
          <BioSocialLinks links={profile.socialLinks} />
        )}
      </VStack>
    </HStack>
  );
}

function GeneralUserBidHistoryItem() {
  const price = 829.12;
  const createdAt = new Date();

  return (
    <HStack items='center'>
      <HStack flex={1} gap={2} items='center'>
        <Avatar size='44px' variant='squircle' name='D D'></Avatar>
        <VStack mb={1}>
          <HStack gap={1} items='center'>
            <Text weight={500}>Abraham Curtis’ Club</Text>
            <Icon name='verified-outline' />
          </HStack>
          <Text color='white700' size={1} weight={300}>
            @AbCurt
          </Text>
        </VStack>
      </HStack>
      <Box basis='156px'>
        <Text weight={300}>${price.toFixed(2)}</Text>
      </Box>
      <Box basis='180px'>
        <Text weight={300}>{dayjs(createdAt).format('ll')}</Text>
      </Box>
      <Box basis='108px'>
        <Text weight={300}>Pending</Text>
      </Box>
    </HStack>
  );
}

export function GeneralUserBidHistoryContent() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <Head
        prefix={`${profile.displayName} - `}
        title='Bids'
        description="View the user's bid history."
      />
      <VStack
        h='full'
        radius={2}
        mt={6}
        divider={
          <StackDivider width={1} color='rgba(152, 152, 255, 0.05)' />
        }
        bgColor='rgba(48, 48, 75, 0.60)'
      >
        <HStack p={4}>
          <Box flex={1}>
            <Text weight={500}>Club</Text>
          </Box>
          <Box basis='156px'>
            <Text weight={500}>Bid</Text>
          </Box>
          <Box basis='180px'>
            <Text weight={500}>Date</Text>
          </Box>
          <Box basis='108px'>
            <Text weight={500}>Status</Text>
          </Box>
        </HStack>
        <VStack h='calc(100%)' p={4} gap={5}>
          <GeneralUserBidHistoryItem />
        </VStack>
      </VStack>
    </Fragment>
  );
}

function GeneralUserWatchlistItem() {
  const price = 829.12;

  return (
    <HStack items='center'>
      <HStack flex={1} gap={2} items='center'>
        <Avatar size='44px' variant='squircle' name='D D'></Avatar>
        <VStack mb={1}>
          <HStack gap={1} items='center'>
            <Text weight={500}>Abraham Curtis’ Club</Text>
            <Icon name='verified-outline' />
          </HStack>
          <Text color='white700' size={1} weight={300}>
            @AbCurt
          </Text>
        </VStack>
      </HStack>
      <Box basis='156px'>
        <Text weight={300}>${price.toFixed(2)}</Text>
      </Box>
      <Box basis='180px'>
        <Countdown
          color='white500'
          targetDate={dayjs().add(1, 'day').toDate()}
        />
      </Box>
      <Box basis='108px'>
        <Box
          radius={1}
          px={1}
          w='fit-content'
          border={1}
          borderColor='#5CE581'
        >
          <Text weight={500} color='#5CE581' size={2}>
            LIVE
          </Text>
        </Box>
      </Box>
      <Box basis='40px'>
        <Menu minWidth={150}>
          <MenuTrigger>
            <IconButton
              colorTheme='purple600'
              icon='more-fill'
              ariaLabel='options'
              variant='ghost'
            />
          </MenuTrigger>
          <MenuContent>
            <MenuItem dangerous>Remove from Watchlist</MenuItem>
            <MenuItem>View Artist Club</MenuItem>
          </MenuContent>
        </Menu>
      </Box>
    </HStack>
  );
}

export function GeneralUserWatchlistContent() {
  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Fragment>
      <Head
        prefix={`${profile.displayName} - `}
        title='Watchlist'
        description="View the user's watchlist."
      />

      <VStack
        h='full'
        radius={2}
        mt={6}
        divider={
          <StackDivider width={1} color='rgba(152, 152, 255, 0.05)' />
        }
        bgColor='rgba(48, 48, 75, 0.60)'
      >
        <HStack p={4}>
          <Box flex={1}>
            <Text weight={500}>Club</Text>
          </Box>
          <Box basis='156px'>
            <Text weight={500}>Entry Price</Text>
          </Box>
          <Box basis='180px'>
            <Text weight={500}>Ends In</Text>
          </Box>
          <Box basis='108px'>
            <Text weight={500}>Status</Text>
          </Box>
          <Box basis='40px' />
        </HStack>
        <VStack h='calc(100%)' p={4} gap={5}>
          <GeneralUserWatchlistItem />
        </VStack>
      </VStack>
    </Fragment>
  );
}

function ProfilePage() {
  const { username } = useParams();

  const currentUser = useCurrentUser();

  if (currentUser.role === 'artist' && username === currentUser.username) {
    return <Navigate to={`/artist/${currentUser.username}`} replace />;
  }

  return (
    <GQLRenderer>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <RadialSurface w='100%' p={4} radius={4}>
              <GeneralUserProfileHeader />
              <RoutingTabs flex={1}>
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
                      to='bid-history'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Bid History
                    </RoutingTabsTrigger>
                    <RoutingTabsTrigger
                      to='watchlist'
                      w='fit-content'
                      py={2}
                      px={6}
                      fontSize={2}
                      _hover={{ background: '#9898FF26' }}
                    >
                      Watchlist
                    </RoutingTabsTrigger>
                  </RoutingTabsList>
                </RoutingTabsHeader>
                <RoutingTabsContent h='full' />
              </RoutingTabs>
            </RadialSurface>
          </ContentLayoutMain>
        </ContentLayout>
      </ProfileProvider>
    </GQLRenderer>
  );
}

export default ProfilePage;
