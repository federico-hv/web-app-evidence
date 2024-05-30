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
  VStack,
} from '@holdr-ui/react';
import {
  GQLRenderer,
  LinkOverlay,
  makePath,
  RadialSurface,
  RoutingTabs,
  RoutingTabsContent,
  RoutingTabsHeader,
  RoutingTabsList,
  RoutingTabsTrigger,
  TextGroup,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../shared';
import { ProfileProvider } from './shared';
import { ContentLayout, ContentLayoutMain } from '../../layout';
import {
  Link,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { MembershipCard, useCurrentUser } from '../../features';
import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import membershipCover from '../../assets/dummy/membership-1.jpg';

dayjs.extend(LocalizedFormat);
dayjs().format('L LT');

import {
  IconName,
  ResponsiveValue,
} from '@holdr-ui/react/dist/shared/types';
import { Fragment } from 'react';

const favouriteMusicians = [
  'Silas Stone',
  'Sunny Raye',
  'Big Grit',
  'Maverick Taylor',
  'Dylan St Dennis',
];

function SpotifyEmbeddedPlayer({ id }: { id: string }) {
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

export function GeneralUserBioContent() {
  return (
    <VStack
      radius={2}
      p={4}
      mt={6}
      gap={8}
      divider={
        <StackDivider width={1} color='rgba(152, 152, 255, 0.05)' />
      }
      bgColor='rgba(48, 48, 75, 0.60)'
    >
      <TextGroup gap={3}>
        <TextGroupSubheading weight={500} size={4}>
          About
        </TextGroupSubheading>
        <TextGroupSubheading
          casing='capitalize'
          weight={300}
          color='white600'
        >
          {
            "A dynamic rock artist known for her electrifying performances and soulful vocals, captivating audiences with every chord and lyric. With a fiery spirit and a rebellious edge, she's set to redefine the rock genre one stage at a time."
          }
        </TextGroupSubheading>
      </TextGroup>
      <TextGroup gap={3}>
        <TextGroupSubheading casing='capitalize' weight={500} size={4}>
          Based In
        </TextGroupSubheading>
        <TextGroupSubheading weight={300} color='white600'>
          {'Fairfax, Virginia, United States'}
        </TextGroupSubheading>
      </TextGroup>
      <VStack gap={3}>
        <Text casing='capitalize' weight={500} size={4}>
          Favourite Song
        </Text>
        <Box w={288}>
          <SpotifyEmbeddedPlayer id='7BRD7x5pt8Lqa1eGYC4dzj' />
        </Box>
      </VStack>
      <VStack gap={3}>
        <Text casing='capitalize' weight={500} size={4}>
          Favourite Musicians
        </Text>
        <HStack
          items='center'
          divider={<Circle mx={4} bgColor='black300' size='5px' />}
        >
          {favouriteMusicians.map((name) => (
            <Text key={name} weight={300} color='white600'>
              {name}
            </Text>
          ))}
        </HStack>
      </VStack>
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
          <Link to=''>
            <Text size={4} weight={300} color='purple200'>
              View All
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
              },
            }}
          />
        </HStack>
      </VStack>
    </VStack>
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
    <Box cursor='pointer' onClick={onClick}>
      <TextGroup direction='horizontal' fontSize={4} gap={1}>
        <TextGroupSubheading weight={500}>{count}</TextGroupSubheading>
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

function GeneralUserProfileHeader() {
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { username } = useParams();
  const previousLocation = usePreviousLocation(pathname);

  if (!username) {
    return <Fragment />;
  }

  return (
    <HStack items='center' gap={3} mb={5}>
      <Avatar fallbackTextSize={8} size={124} name='Elena Gilbert'>
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
              <Text size={6}>Elena Gilbert</Text>
            </VStack>
            <HStack gap={3}>
              <FollowCountItem
                onClick={() =>
                  navigate(makePath([username, 'followers']), {
                    state: {
                      previousLocation: pathname,
                    },
                  })
                }
                count={129}
                label='Followers'
              />
              <FollowCountItem
                onClick={() =>
                  navigate(makePath([username, 'following']), {
                    state: {
                      previousLocation: pathname,
                    },
                  })
                }
                count={701}
                label='Following'
              />
            </HStack>
          </VStack>
          <HStack>
            {currentUser.username !== username ? (
              <Button css={{ px: '50px' }} colorTheme='purple100'>
                Follow
              </Button>
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
        <HStack gap={4}>
          <IconLink to='https://instagram.com' iconName='instagram' />
          <IconLink to='https://x.com' iconName='x-twitter' />
          <IconLink to='https://tiktok.com' iconName='tiktok' />
        </HStack>
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
        <Text weight={300}>{dayjs(createdAt).format('L')}</Text>
      </Box>
      <Box basis='108px'>
        <Text weight={300}>Pending</Text>
      </Box>
    </HStack>
  );
}

export function GeneralUserBidHistoryContent() {
  return (
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
        <IconButton
          colorTheme='purple600'
          icon='more-fill'
          ariaLabel='options'
          variant='ghost'
        />
      </Box>
    </HStack>
  );
}

export function GeneralUserWatchlistContent() {
  return (
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
  );
}

function ProfilePage() {
  return (
    <GQLRenderer>
      <ProfileProvider>
        <ContentLayout>
          <ContentLayoutMain>
            <Box h='full'>
              <RadialSurface
                w='100%'
                h='full'
                p={4}
                radius={4}
                minHeight='calc(100vh - 96px)'
              >
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
            </Box>
          </ContentLayoutMain>
        </ContentLayout>
      </ProfileProvider>
    </GQLRenderer>
  );
}

export default ProfilePage;
