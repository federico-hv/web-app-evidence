import {
  HStack,
  VStack,
  Text,
  Avatar,
  AvatarBadge,
  Icon,
  Box,
  Heading,
  AvatarGroup,
  Circle,
  GeneralContextProvider,
  useGeneralContext,
} from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import {
  GQLRenderer,
  Head,
  ISocialLink,
  Loader,
  makePath,
  Paths,
  usePreviousLocation,
  voidFn,
} from '../../../shared';
import {
  IClub,
  useGetClub,
  useSuspenseSocialLinks,
} from '../../../features';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Fragment } from 'react';
import { BioSocialLinks, UserRelationshipCount } from '../../profile';
import slug = Mocha.utils.slug;

const imageSrcs = [
  'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
  'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk',
];

export interface ArtistProps {
  name: string;
  avatar: string;
  isVerified: boolean;
  socialLinks: ISocialLink[];
}

function ReplaceWithLinkIcon() {
  return (
    <Box>
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.24124 11.9013L5.54582 11.2058C5.357 11.017 5.35429 10.7066 5.53983 10.521C5.72538 10.3355 6.03583 10.3382 6.22465 10.527L6.92006 11.2224C8.12667 12.429 10.0715 12.4461 11.2572 11.2604C12.4429 10.0747 12.4259 8.12983 11.2193 6.92323L10.5285 6.23242C10.3396 6.0436 10.3369 5.73315 10.5225 5.54761C10.708 5.36206 11.0139 5.36017 11.2073 5.5536L11.8981 6.2444C13.4869 7.83326 13.5093 10.3899 11.948 11.9512C10.3867 13.5125 7.83009 13.4901 6.24124 11.9013Z'
          fill='#E5E6E1'
        />
        <path
          d='M2.78926 8.44929L2.09846 7.75848C0.509604 6.16963 0.487235 3.61299 2.04853 2.05169C3.60982 0.490402 6.16646 0.512771 7.75531 2.10163L8.44612 2.79243C8.63494 2.98125 8.63765 3.2917 8.45211 3.47725C8.26656 3.66279 7.95612 3.66007 7.7673 3.47125L7.07649 2.78045C5.86988 1.57384 3.92501 1.55682 2.73933 2.7425C1.55366 3.92818 1.57067 5.87305 2.77728 7.07966L3.46809 7.77046C3.65691 7.95928 3.65962 8.26973 3.47408 8.45528C3.28853 8.64082 2.97808 8.63811 2.78926 8.44929Z'
          fill='#E5E6E1'
        />
        <path
          d='M8.50222 9.18413L4.81793 5.49983C4.62911 5.31101 4.62639 5.00056 4.81193 4.81501C4.99748 4.62947 5.30793 4.63218 5.49675 4.821L9.18105 8.5053C9.36987 8.69412 9.37258 9.00457 9.18704 9.19012C9.00149 9.37566 8.69105 9.37295 8.50222 9.18413Z'
          fill='#E5E6E1'
        />
        <path
          d='M6.24124 11.9013L5.54582 11.2058C5.357 11.017 5.35429 10.7066 5.53983 10.521C5.72538 10.3355 6.03583 10.3382 6.22465 10.527L6.92006 11.2224C8.12667 12.429 10.0715 12.4461 11.2572 11.2604C12.4429 10.0747 12.4259 8.12983 11.2193 6.92323L10.5285 6.23242C10.3396 6.0436 10.3369 5.73315 10.5225 5.54761C10.708 5.36206 11.0139 5.36017 11.2073 5.5536L11.8981 6.2444C13.4869 7.83326 13.5093 10.3899 11.948 11.9512C10.3867 13.5125 7.83009 13.4901 6.24124 11.9013Z'
          stroke='#E5E6E1'
          strokeWidth='0.651298'
        />
        <path
          d='M2.78926 8.44929L2.09846 7.75848C0.509604 6.16963 0.487235 3.61299 2.04853 2.05169C3.60982 0.490402 6.16646 0.512771 7.75531 2.10163L8.44612 2.79243C8.63494 2.98125 8.63765 3.2917 8.45211 3.47725C8.26656 3.66279 7.95612 3.66007 7.7673 3.47125L7.07649 2.78045C5.86988 1.57384 3.92501 1.55682 2.73933 2.7425C1.55366 3.92818 1.57067 5.87305 2.77728 7.07966L3.46809 7.77046C3.65691 7.95928 3.65962 8.26973 3.47408 8.45528C3.28853 8.64082 2.97808 8.63811 2.78926 8.44929Z'
          stroke='#E5E6E1'
          strokeWidth='0.651298'
        />
        <path
          d='M8.50222 9.18413L4.81793 5.49983C4.62911 5.31101 4.62639 5.00056 4.81193 4.81501C4.99748 4.62947 5.30793 4.63218 5.49675 4.821L9.18105 8.5053C9.36987 8.69412 9.37258 9.00457 9.18704 9.19012C9.00149 9.37566 8.69105 9.37295 8.50222 9.18413Z'
          stroke='#E5E6E1'
          strokeWidth='0.651298'
        />
      </svg>
    </Box>
  );
}

export function ArtistClubBioAdditionalContent() {
  return (
    <VStack
      basis='320px'
      grow={0}
      radius={2}
      bgColor='#30304B'
      p={4}
      ml={1}
    >
      <HStack pb='16px'>
        <Heading size={5} weight={500}>
          Artist Pick
        </Heading>
      </HStack>
      <VStack
        className='thin-scrollbar'
        h='100%'
        overflow='auto'
        pb={1}
        pr={3}
      >
        <VStack gap={2}>
          <iframe
            style={{ borderRadius: '12px' }}
            src='https://open.spotify.com/embed/track/0sT4slW2xWai3EwVSiuL9Y?utm_source=generator'
            width='100%'
            height='152'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
          <br />
          <iframe
            style={{ borderRadius: '12px' }}
            src='https://open.spotify.com/embed/track/0grFc6klR3hxoHLcgCYsF4?utm_source=generator'
            width='100%'
            height='152'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
          <br />
          <iframe
            style={{ borderRadius: '12px' }}
            src='https://open.spotify.com/embed/track/73M2Vb5MfZh8iGKudkMtlw?utm_source=generator'
            width='100%'
            height='152'
            allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
            loading='lazy'
          ></iframe>
        </VStack>
        <Box
          my={4}
          borderBottom={1}
          borderColor='rgba(152, 152, 255, 0.10)'
        />
        <VStack>
          <Heading as='h2' size={4} weight={400} mb={4}>
            Announcements
          </Heading>
          <Box pt={'8px'} pb='12px' ml={2} color='white600'>
            <FlatList
              direction='vertical'
              gap={2}
              data={[
                'Infinite Solitude album, Out Now!!',
                ' First show of the tour, this coming Friday',
              ]}
              renderItem={(item) => (
                <HStack gap={2}>
                  <Circle mt='6px' bgColor='white500' size='6px' />
                  <Text>{item}</Text>
                </HStack>
              )}
              keyExtractor={(item) => item}
            />
          </Box>
        </VStack>
        <Box
          my={4}
          borderBottom={1}
          borderColor='rgba(152, 152, 255, 0.10)'
        />
        <VStack>
          <Heading size='18px' weight={500}>
            Links
          </Heading>
          <VStack>
            <VStack>
              <Heading py={5} as='h3' size={3} weight={400}>
                Upcoming Show
              </Heading>
              <HStack gap={2}>
                <Box fontSize={5} mt='0px'>
                  <ReplaceWithLinkIcon />
                </Box>
                <Box flex={10}>
                  <a href='' style={{ cursor: 'pointer' }}>
                    <Text size={3} weight={300}>
                      eventbrite.ca/e/infinites-solitude-tour-tickets
                    </Text>
                  </a>
                </Box>
              </HStack>
            </VStack>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.10)'
            />
            <VStack>
              <Heading as='h3' size={3} mb={4} weight={500}>
                Merchandise
              </Heading>
              <HStack gap={2}>
                <Box mt='0px'>
                  <ReplaceWithLinkIcon />
                </Box>
                <Box flex={10}>
                  <a href='' style={{ cursor: 'poiner' }}>
                    <Text size={3} weight={300}>
                      eventbrite.ca/e/infinites-solitude-tour-tickets
                    </Text>
                  </a>
                </Box>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </VStack>
    </VStack>
  );
}

export function ArtistProfileCard() {
  const { state: club } = useGeneralContext<IClub>();

  const { data } = useSuspenseSocialLinks(club.artist.accountId);

  return (
    <VStack bg='#30304B' radius={4} p={4} justify={'center'}>
      <HStack gap={4} maxHeight={'136px'}>
        <Avatar
          src={club.artist.avatar}
          name={club.artist.name}
          size={'136px'}
          variant='squircle'
        >
          <AvatarBadge
            zIndex={1}
            bgColor='#34C05A'
            borderColor='#292940'
            border={1}
            r={10}
            b={10}
            size={'20px'}
            radius='full'
          />
        </Avatar>
        <VStack gap={2} flex={1} justify='center'>
          <HStack gap={2}>
            <Heading
              color='white500'
              size={'20px'}
              weight={500}
              css={{ lineHeight: '115%' }}
            >
              {club.artist.name}
            </Heading>
            <VStack pt={1}>
              <Icon size='xl' color='white500' name='verified-outline' />
            </VStack>
          </HStack>
          <UserRelationshipCount username={club.artist.username} />
          <BioSocialLinks links={data.socialLinks} />
        </VStack>
      </HStack>
    </VStack>
  );
}

function ArtistBio() {
  const { pathname } = useLocation();
  const { slug } = useParams();
  const previousLocation = usePreviousLocation(pathname);

  const { state: club } = useGeneralContext<IClub>();

  return (
    <Fragment>
      <Head
        prefix={`${club.artist.name}'s Club -`}
        title='Bio'
        description='A catalog of memberships that are being offered by artists.'
      />
      <HStack
        maxHeight='calc(100vh - 230px)'
        overflow='hidden'
        justify='space-between'
        gap={4}
      >
        <Box
          flex={1}
          radius={2}
          overflowY='auto'
          className='thin-scrollbar'
          position='relative'
        >
          <VStack
            h='fit-content'
            bgColor='#30304B'
            css={{ paddingInlineEnd: '$3' }}
          >
            <GQLRenderer>
              <ArtistProfileCard />
            </GQLRenderer>
            <VStack p={4}>
              {club.artist.bio && (
                <Fragment>
                  <VStack gap={3}>
                    <Heading weight={500} size={4}>
                      About
                    </Heading>
                    <VStack flex={1}>
                      <Text weight={300} color='white600'>
                        {club.artist.bio}
                      </Text>
                    </VStack>
                  </VStack>
                  <Box
                    my={4}
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.1)'
                  />
                </Fragment>
              )}
              {club.artist.bio && (
                <Fragment>
                  <VStack gap={3}>
                    <Heading weight={500} size={4}>
                      Based In
                    </Heading>
                    <VStack flex={1}>
                      <Text weight={300} color='white600'>
                        Fairfax, Virginia, United States
                      </Text>
                    </VStack>
                  </VStack>
                  <Box
                    my={4}
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.1)'
                  />
                </Fragment>
              )}
              <VStack gap={3}>
                <Heading weight={500} size={4}>
                  Collaborators
                </Heading>
                <FlatList
                  items='center'
                  divider={<Circle mx={4} bgColor='black300' size='5px' />}
                  data={[
                    'Silas Stone',
                    'Sunny Raye',
                    'Big Grit',
                    'Michael Smith',
                  ]}
                  renderItem={(item) => <Text>{item}</Text>}
                  keyExtractor={(item) => item}
                />
              </VStack>
              <Box
                my={4}
                borderBottom={1}
                borderColor='rgba(152, 152, 255, 0.1)'
              />
              <VStack>
                <HStack justify={'space-between'}>
                  <Box flex={1} h='21px'>
                    <Heading weight={500} size={4}>
                      Club Members
                    </Heading>
                  </Box>
                  <Link
                    to={makePath([Paths.clubs, slug || '', 'members'])}
                    state={{ previousLocation }}
                  >
                    <Text size={4} weight={300} color='purple200'>
                      View all
                    </Text>
                  </Link>
                </HStack>
                <Heading
                  size={'16px'}
                  weight={300}
                  color='white700'
                  css={{ marginTop: '$1' }}
                >
                  50 Members
                </Heading>
                <VStack pt='20px' pb='8px'>
                  <AvatarGroup max={7} borderColor='#292940' size={'56px'}>
                    {imageSrcs.map((item) => (
                      <Avatar key={item} src={item} name='Micky Weekes'>
                        <AvatarBadge
                          zIndex={1}
                          borderColor='#292940'
                          border={1}
                          bgColor='#34C05A'
                          r={10}
                          b={5}
                          size={'12px'}
                          radius='full'
                        />
                      </Avatar>
                    ))}
                  </AvatarGroup>
                </VStack>
              </VStack>
            </VStack>
          </VStack>
        </Box>
        <ArtistClubBioAdditionalContent />
      </HStack>
    </Fragment>
  );
}

ArtistBio.displayName = 'ArtistBio';
export default ArtistBio;
