import {
  HStack,
  VStack,
  Text,
  IconButton,
  Avatar,
  AvatarBadge,
  Icon,
  Box,
  Heading,
  UnorderedList,
  List,
  AvatarGroup,
  Dialog,
} from '@holdr-ui/react';
import { FlatList } from '../../../tmp/flat-list';
import { ISocialLink } from '../../../shared';

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

export function ArtistClubPageRightPanel() {
  return (
    <VStack
      flex={1}
      radius={4}
      h='h-screen'
      bgColor='#30304B'
      p={4}
      divider={
        <Box
          w={'100%'}
          h={'0.5px'}
          bgColor='purple300'
          css={{ opacity: '10%' }}
        />
      }
      css={{
        '&::-webkit-scrollbar': {
          width: '1px', // Width of the scrollbar
          height: '1px', // Height of the scrollbar
        },
      }}
    >
      <HStack pt='7.5px' pb='16px'>
        <Heading size={'18px'} weight={500}>
          Artist Pick
        </Heading>
      </HStack>
      <VStack overflow='scroll' pb='12px'>
        <VStack flex={3} minHeight={'522px'}>
          <VStack justify={'center'} py={'24px'}>
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
        </VStack>

        <VStack pt={'12px'}>
          <Heading size={'18px'} weight={500} py={'7.5px'}>
            Announcements
          </Heading>
          <Box pt={'8px'} pb='12px' ml={2} color='white600'>
            <UnorderedList style={{ color: 'white600' }}>
              <List.Item>
                <Text size='16px' weight={300}>
                  Infinite Solitude album, Out Now!!
                </Text>
              </List.Item>
              <List.Item>
                <Text size='16px' weight={300}>
                  First show of the tour, this coming Friday
                </Text>
              </List.Item>
            </UnorderedList>
          </Box>
        </VStack>
        <VStack pt={5}>
          <Heading size={'18px'} weight={500}>
            Links
          </Heading>
          <VStack>
            <VStack>
              <Heading py={5} size={'16px'} weight={400}>
                Upcoming Show
              </Heading>
              <HStack>
                <VStack flex={1} justify={'center'}>
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
                      stroke-width='0.651298'
                    />
                    <path
                      d='M2.78926 8.44929L2.09846 7.75848C0.509604 6.16963 0.487235 3.61299 2.04853 2.05169C3.60982 0.490402 6.16646 0.512771 7.75531 2.10163L8.44612 2.79243C8.63494 2.98125 8.63765 3.2917 8.45211 3.47725C8.26656 3.66279 7.95612 3.66007 7.7673 3.47125L7.07649 2.78045C5.86988 1.57384 3.92501 1.55682 2.73933 2.7425C1.55366 3.92818 1.57067 5.87305 2.77728 7.07966L3.46809 7.77046C3.65691 7.95928 3.65962 8.26973 3.47408 8.45528C3.28853 8.64082 2.97808 8.63811 2.78926 8.44929Z'
                      stroke='#E5E6E1'
                      stroke-width='0.651298'
                    />
                    <path
                      d='M8.50222 9.18413L4.81793 5.49983C4.62911 5.31101 4.62639 5.00056 4.81193 4.81501C4.99748 4.62947 5.30793 4.63218 5.49675 4.821L9.18105 8.5053C9.36987 8.69412 9.37258 9.00457 9.18704 9.19012C9.00149 9.37566 8.69105 9.37295 8.50222 9.18413Z'
                      stroke='#E5E6E1'
                      stroke-width='0.651298'
                    />
                  </svg>
                </VStack>
                <Box flex={10}>
                  <a href='' style={{ cursor: 'pointer' }}>
                    <Text size={'16px'} weight={300}>
                      eventbrite.ca/e/infinites-solitude-tour-tickets
                    </Text>
                  </a>
                </Box>
              </HStack>
            </VStack>
            <VStack>
              <Heading py={5} size={'16px'} weight={400}>
                Merchandise
              </Heading>
              <HStack>
                <VStack flex={1} justify={'center'}>
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
                      stroke-width='0.651298'
                    />
                    <path
                      d='M2.78926 8.44929L2.09846 7.75848C0.509604 6.16963 0.487235 3.61299 2.04853 2.05169C3.60982 0.490402 6.16646 0.512771 7.75531 2.10163L8.44612 2.79243C8.63494 2.98125 8.63765 3.2917 8.45211 3.47725C8.26656 3.66279 7.95612 3.66007 7.7673 3.47125L7.07649 2.78045C5.86988 1.57384 3.92501 1.55682 2.73933 2.7425C1.55366 3.92818 1.57067 5.87305 2.77728 7.07966L3.46809 7.77046C3.65691 7.95928 3.65962 8.26973 3.47408 8.45528C3.28853 8.64082 2.97808 8.63811 2.78926 8.44929Z'
                      stroke='#E5E6E1'
                      stroke-width='0.651298'
                    />
                    <path
                      d='M8.50222 9.18413L4.81793 5.49983C4.62911 5.31101 4.62639 5.00056 4.81193 4.81501C4.99748 4.62947 5.30793 4.63218 5.49675 4.821L9.18105 8.5053C9.36987 8.69412 9.37258 9.00457 9.18704 9.19012C9.00149 9.37566 8.69105 9.37295 8.50222 9.18413Z'
                      stroke='#E5E6E1'
                      stroke-width='0.651298'
                    />
                  </svg>
                </VStack>
                <Box flex={10}>
                  <a href='' style={{ cursor: 'poiner' }}>
                    <Text size={'16px'} weight={300}>
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

ArtistClubPageRightPanel.displayName = 'ArtistClubPageRightPanel';

interface ArtistProfileCardProps extends ArtistProps {
  p: number | string;
}

export function ArtistProfileCard({
  name,
  avatar,
  isVerified,
  socialLinks = [],
  p,
}: ArtistProfileCardProps) {
  const getSocialIconName = (provider: string) => {
    switch (provider) {
      case 'TikTok':
        return 'tiktok';
      case 'X':
        return 'x-twitter';
      case 'Instagram':
        return 'instagram';
      default:
        return null;
    }
  };

  const getSocialButton = (link: ISocialLink) => {
    const name = getSocialIconName(link.provider);

    if (!name) return;

    return (
      <VStack>
        <a href={link.url} target='_blank'>
          {/* <Icon name={name} size={'xl'} /> */}
          <IconButton
            colorTheme='transparent'
            size={'xl'}
            icon={name}
            ariaLabel=''
            variant='ghost'
            css={{
              color: '$white100',
            }}
          />
        </a>
      </VStack>
    );
  };

  return (
    <VStack bg='#30304B' p={p} radius={4} h={'168px'} justify={'center'}>
      <HStack flex={2} maxHeight={'136px'}>
        <VStack flex={1} justify={'center'} items={'center'}>
          <Avatar
            src={avatar}
            name={name}
            size={'136px'}
            variant='squircle'
          >
            <AvatarBadge
              bgColor='#34C05A'
              r={10}
              b={10}
              size={'20px'}
              radius='full'
            />
          </Avatar>
        </VStack>
        <VStack flex={3} justify={'center'} pl={5}>
          <HStack>
            <Heading
              color='white500'
              size={'20px'}
              weight={500}
              css={{ lineHeight: '115%' }}
            >
              {name}
            </Heading>
            <VStack pl='6px' pt={1}>
              {isVerified && (
                <Icon color='white500' name='verified-outline' />
              )}
            </VStack>
          </HStack>
          <HStack h={'xl'} items={'center'}>
            <Text
              color='white600'
              weight={500}
              size={'18px'}
              css={{ lineHeight: '115%' }}
            >
              32.2k
            </Text>
            <Text
              ml={'10px'}
              color='white700'
              weight={300}
              size={'18px'}
              css={{ lineHeight: '115%' }}
            >
              Followers
            </Text>

            <VStack
              ml={'8px'}
              w={'23px'}
              items={'flex-end'}
              color='black300'
            >
              <UnorderedList>
                <List.Item></List.Item>
              </UnorderedList>
            </VStack>
            <Text
              color='white600'
              weight={500}
              size={'18px'}
              css={{ lineHeight: '115%' }}
              ml={'8px'}
            >
              770
            </Text>
            <Text
              ml={'10px'}
              color='white700'
              weight={300}
              size={'18px'}
              css={{ lineHeight: '115%' }}
            >
              Following
            </Text>
          </HStack>
          <HStack h={'xl'} items={'center'}>
            {socialLinks.map((el) => getSocialButton(el))}
          </HStack>
        </VStack>
      </HStack>
    </VStack>
  );
}

ArtistClubPageRightPanel.displayName = 'ArtistClubPageRightPanel';

interface ClubMemberModel {
  name: string;
  handle: string;
  isOnline: boolean;
}

function ClubMember({
  index,
  name,
  handle,
  isOnline,
}: ClubMemberModel & { index: number }) {
  return (
    <HStack>
      <VStack>
        <Avatar src={imageSrcs[index]} name='Micky Weekes'>
          <AvatarBadge
            bgColor='#34C05A'
            r={5}
            b={5}
            size={'13px'}
            radius='full'
          />
        </Avatar>
      </VStack>
      <VStack gap={2} pl='12px'>
        <VStack h='18px'>
          <Heading size='16px' weight={500} css={{ lineHeight: '115%' }}>
            {name}
          </Heading>
        </VStack>
        <VStack h='36px'>
          <Text size='12px' weight={300} css={{ lineHeight: '115%' }}>
            {handle}
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
}

function ArtistClubMembersList() {
  const clubMembers: ClubMemberModel[] = [
    {
      name: 'Alice Johnson',
      handle: '@alice_j',
      isOnline: true,
    },
    {
      name: 'Bob Smith',
      handle: '@bob_smith',
      isOnline: false,
    },
    {
      name: 'Charlie Brown',
      handle: '@charlie_b',
      isOnline: true,
    },
    {
      name: 'Diana Prince',
      handle: '@diana_p',
      isOnline: false,
    },
    {
      name: 'Ethan Hunt',
      handle: '@ethan_h',
      isOnline: true,
    },
    {
      name: 'Fiona Gallagher',
      handle: '@fiona_g',
      isOnline: false,
    },
    {
      name: 'George Bailey',
      handle: '@george_b',
      isOnline: true,
    },
    {
      name: 'Hannah Abbott',
      handle: '@hannah_a',
      isOnline: false,
    },
    {
      name: 'Ian Malcolm',
      handle: '@ian_m',
      isOnline: true,
    },
    {
      name: 'Jack Ryan',
      handle: '@jack_r',
      isOnline: false,
    },
  ];

  return (
    <Dialog ariaDescribedBy='dialog-with-custom-close'>
      <Dialog.Trigger>
        <Text size={'18px'} weight={300}>
          View all
        </Text>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay bgColor='darkTint400' />
        <Dialog.Content
          bgColor='#30304B'
          divider={
            <Box
              w={'100%'}
              h={'0.5px'}
              bgColor='purple300'
              css={{ opacity: '10%' }}
            />
          }
          px={'24px'}
          zIndex={100}
          minHeight={'500px'}
        >
          <Dialog.Header css={{ zIndex: 100 }}>
            <HStack flex={1} minHeight={'52px'}>
              <VStack flex={1} justify={'center'}>
                <Heading size={'24px'} weight={500}>
                  Club Members
                </Heading>
              </VStack>
              <VStack maxWidth={'24px'} justify={'center'} pl={'20px'}>
                <Dialog.Close>
                  <Icon
                    size={'xl'}
                    name='close-circle-outline'
                    color='white500'
                  />
                </Dialog.Close>
              </VStack>
            </HStack>
          </Dialog.Header>
          <Dialog.Body h={'388px'} overflow='scroll'>
            <FlatList<ClubMemberModel>
              data={clubMembers}
              keyExtractor={(member) => member.name}
              renderItem={(member, index) => (
                <ClubMember index={index} {...member} />
              )}
              direction={'vertical'}
            />
          </Dialog.Body>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}

interface ArtistBioProps extends ArtistProps {
  bio: string;
}
function ArtistBio({
  bio,
  avatar,
  name,
  isVerified,
  socialLinks,
}: ArtistBioProps) {
  return (
    <HStack gap={4} justify={'space-between'}>
      <VStack
        w={'546px'}
        h='fit-content'
        radius={4}
        bgColor='#30304B'
        p={'16px'}
        divider={
          <Box
            w={'100%'}
            h={'0.5px'}
            bgColor='purple300'
            css={{ opacity: '10%' }}
          />
        }
      >
        <ArtistProfileCard
          socialLinks={socialLinks}
          isVerified={isVerified}
          avatar={avatar}
          name={name}
          p={'0px'}
        />
        <VStack py={'16px'}>
          <Heading size={'18px'} weight={500} py='8px'>
            About
          </Heading>
          <VStack flex={1} py='8px'>
            <Text size={'16px'} weight={300} color='white600'>
              {bio}
            </Text>
          </VStack>
        </VStack>
        <VStack py='16px'>
          <Heading size={'18px'} weight={500} py='8px'>
            Based In
          </Heading>
          <VStack flex={1} pt={4} py='8px'>
            <Text color='white600' weight={300}>
              Fairfax, Virginia, United States
            </Text>
          </VStack>
        </VStack>
        <VStack py='16px'>
          <Heading size={'18px'} weight={500} py='8px'>
            Collaborators
          </Heading>
          <HStack flex={1} pt={4} py='8px'>
            <Text size={'16px'} weight={300} color='white600'>
              Sillas Stone
            </Text>
            <VStack
              mx={'8px'}
              w={'23px'}
              items={'flex-end'}
              color='black300'
            >
              <UnorderedList>
                <List.Item></List.Item>
              </UnorderedList>
            </VStack>
            <Text size={'16px'} weight={300} color='white600'>
              Sunny Raye
            </Text>
            <VStack
              mx={'8px'}
              w={'23px'}
              items={'flex-end'}
              color='black300'
            >
              <UnorderedList>
                <List.Item></List.Item>
              </UnorderedList>
            </VStack>
            <Text size={'16px'} weight={300} color='white600'>
              Big Grit
            </Text>
            <VStack
              mx={'8px'}
              w={'23px'}
              items={'flex-end'}
              color='black300'
            >
              <UnorderedList>
                <List.Item></List.Item>
              </UnorderedList>
            </VStack>
            <Text size={'16px'} weight={300} color='white600'>
              Michael Smith
            </Text>
          </HStack>
        </VStack>
        <VStack pt='16px' pb='20px'>
          <HStack justify={'space-between'}>
            <Box flex={1} h='21px'>
              <Heading size={'18px'} weight={500}>
                Club Members
              </Heading>
            </Box>
            <VStack
              flex={1}
              color='purple200'
              justify={'center'}
              items={'flex-end'}
              h={'21px'}
            >
              <ArtistClubMembersList />
            </VStack>
          </HStack>
          <Box h='18px'>
            <Heading size={'16px'} weight={300} color='white700'>
              50 Members
            </Heading>
          </Box>
          <VStack pt='20px' pb='8px'>
            <AvatarGroup max={7} borderColor='#292940' size={'56px'}>
              <Avatar src={imageSrcs[0]} name='Micky Weekes'>
                <AvatarBadge
                  bgColor='#34C05A'
                  r={5}
                  b={5}
                  size={'13px'}
                  radius='full'
                />
              </Avatar>
              <Avatar src={imageSrcs[1]} name='Micky Weekes'>
                <AvatarBadge
                  bgColor='#34C05A'
                  r={5}
                  b={5}
                  size={'13px'}
                  radius='full'
                />
              </Avatar>
              <Avatar src={imageSrcs[2]} name='Micky Weekes'>
                <AvatarBadge
                  bgColor='#34C05A'
                  r={5}
                  b={5}
                  size={'13px'}
                  radius='full'
                />
              </Avatar>
              <Avatar src={imageSrcs[3]} name='Micky Weekes'>
                <AvatarBadge
                  bgColor='#34C05A'
                  r={5}
                  b={5}
                  size={'13px'}
                  radius='full'
                />
              </Avatar>
            </AvatarGroup>
          </VStack>
        </VStack>
      </VStack>
      <ArtistClubPageRightPanel />
    </HStack>
  );
}

ArtistBio.displayName = 'ArtistBio';
export default ArtistBio;
