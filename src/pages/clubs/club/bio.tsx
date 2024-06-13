import {
  Button,
  Card,
  HStack,
  VStack,
  Image,
  Text,
  IconButton,
  Avatar,
  StackDivider,
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

const imageSrcs = [
  'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
  'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk',
];

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

export function ArtistProfileCard({ p }: { p: number | string }) {
  return (
    <VStack bg='#30304B' p={p} radius={4} h={'168px'} justify={'center'}>
      <HStack flex={2} maxHeight={'136px'}>
        <VStack flex={1} justify={'center'} items={'center'}>
          <Avatar
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyQiewCK1xVeDg4hXiae0MaHWGE9SWqXVSoj87zJFrjshTTBSm'
            name='Micky Weekes'
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
              {'Jade Lightning'}
            </Heading>
            <VStack pl='6px' pt={1}>
              <Icon color='white500' name='verified-outline' />
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
          <HStack gap={4} h={'xl'} items={'center'}>
            <svg
              width='18'
              height='18'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.27263 0.0629438C4.31502 0.108124 3.66107 0.260944 3.08939 0.485584C2.49772 0.716164 1.99623 1.02558 1.49727 1.52634C0.998305 2.0271 0.691042 2.52894 0.462079 3.1215C0.240497 3.69444 0.0903755 4.34892 0.0480751 5.30706C0.00577466 6.2652 -0.00358544 6.57318 0.0010946 9.01722C0.00577465 11.4613 0.0165748 11.7676 0.0630152 12.7277C0.108736 13.6852 0.261017 14.3389 0.485659 14.9108C0.716602 15.5024 1.02566 16.0037 1.52661 16.5029C2.02755 17.002 2.52904 17.3086 3.12305 17.5379C3.69545 17.7591 4.35012 17.9099 5.30809 17.9519C6.26606 17.9938 6.5744 18.0035 9.01775 17.9989C11.4611 17.9942 11.7687 17.9834 12.7287 17.9378C13.6886 17.8923 14.339 17.7389 14.911 17.5154C15.5027 17.2839 16.0043 16.9754 16.5031 16.4743C17.0019 15.9731 17.309 15.4709 17.5378 14.878C17.7595 14.3056 17.9102 13.651 17.9518 12.6937C17.9937 11.7331 18.0036 11.4263 17.9989 8.98266C17.9943 6.53898 17.9833 6.23262 17.9377 5.27286C17.8922 4.3131 17.7397 3.66132 17.5153 3.0891C17.284 2.49744 16.9753 1.9965 16.4745 1.497C15.9737 0.997504 15.4712 0.690604 14.8784 0.462364C14.3057 0.240784 13.6514 0.0897638 12.6934 0.0483638C11.7354 0.00696385 11.4271 -0.00365615 8.98283 0.00102385C6.53858 0.00570385 6.23258 0.0161439 5.27263 0.0629438ZM5.37775 16.3328C4.50024 16.2946 4.02378 16.1488 3.70625 16.0268C3.28577 15.8648 2.98624 15.6689 2.6698 15.3556C2.35336 15.0422 2.15896 14.7416 1.99479 14.322C1.87149 14.0045 1.72299 13.5286 1.68195 12.6511C1.63731 11.7026 1.62795 11.4179 1.62273 9.01506C1.61751 6.61224 1.62669 6.32784 1.66827 5.37906C1.70571 4.50228 1.85241 4.02528 1.97427 3.70794C2.13628 3.28692 2.3314 2.98794 2.6455 2.67168C2.9596 2.35542 3.25931 2.16066 3.67925 1.9965C3.99641 1.87266 4.47234 1.72542 5.34949 1.68366C6.29864 1.63866 6.58304 1.62966 8.98553 1.62444C11.388 1.61922 11.6731 1.62822 12.6226 1.66998C13.4994 1.70814 13.9766 1.8534 14.2936 1.97598C14.7143 2.13798 15.0136 2.33256 15.3299 2.6472C15.6461 2.96184 15.8411 3.26046 16.0052 3.6813C16.1293 3.99756 16.2765 4.4733 16.3179 5.35098C16.3631 6.30012 16.3733 6.5847 16.3777 8.98698C16.382 11.3893 16.3735 11.6746 16.3319 12.623C16.2936 13.5005 16.1482 13.9771 16.0259 14.295C15.8639 14.7153 15.6686 15.015 15.3543 15.3311C15.0401 15.6472 14.7407 15.8419 14.3206 16.0061C14.0038 16.1297 13.5273 16.2773 12.6509 16.3191C11.7018 16.3637 11.4173 16.3731 9.01397 16.3783C6.61058 16.3835 6.32708 16.3738 5.37793 16.3328M12.7148 4.1898C12.7152 4.40342 12.7789 4.61214 12.8978 4.78955C13.0168 4.96697 13.1858 5.10511 13.3833 5.18651C13.5808 5.26792 13.798 5.28892 14.0074 5.24687C14.2169 5.20482 14.4091 5.1016 14.5599 4.95028C14.7107 4.79895 14.8132 4.60631 14.8545 4.39671C14.8957 4.18712 14.8739 3.96999 14.7918 3.77279C14.7097 3.57559 14.5709 3.40717 14.3931 3.28884C14.2152 3.17051 14.0063 3.10758 13.7927 3.108C13.5063 3.10858 13.2319 3.22286 13.0297 3.42573C12.8276 3.62859 12.7143 3.90343 12.7148 4.1898ZM4.37892 9.00894C4.38396 11.5613 6.45686 13.6258 9.00875 13.6209C11.5606 13.616 13.6265 11.5433 13.6217 8.99094C13.6168 6.43854 11.5434 4.37358 8.99111 4.37862C6.43886 4.38366 4.37406 6.4569 4.37892 9.00894ZM6.00002 9.0057C5.99884 8.41235 6.17365 7.83197 6.50232 7.33796C6.831 6.84396 7.29879 6.4585 7.84653 6.23035C8.39428 6.0022 8.99737 5.9416 9.57956 6.0562C10.1617 6.17081 10.6969 6.45548 11.1173 6.87421C11.5377 7.29294 11.8245 7.82694 11.9414 8.40866C12.0583 8.99038 12.0001 9.59371 11.7741 10.1424C11.5481 10.691 11.1645 11.1603 10.6718 11.4909C10.1791 11.8215 9.59941 11.9986 9.00605 11.9998C8.61205 12.0007 8.22176 11.9239 7.85745 11.7738C7.49314 11.6238 7.16196 11.4035 6.88281 11.1254C6.60367 10.8474 6.38203 10.5171 6.23056 10.1534C6.07909 9.78967 6.00075 9.39969 6.00002 9.0057Z'
                fill='white'
              />
            </svg>
            <svg
              width='16'
              height='18'
              viewBox='0 0 16 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M13.3975 3.60795C12.4244 2.97584 11.7227 1.96403 11.5034 0.785161C11.4563 0.530514 11.43 0.268192 11.43 0H8.32507L8.32009 12.4018C8.26799 13.7907 7.12095 14.9054 5.71525 14.9054C5.27809 14.9054 4.86675 14.7966 4.50434 14.6065C3.6735 14.1708 3.10497 13.303 3.10497 12.3043C3.10497 10.8699 4.27602 9.70276 5.71479 9.70276C5.98343 9.70276 6.2412 9.74701 6.48492 9.82286V6.66371C6.23259 6.62939 5.97618 6.60817 5.71479 6.60817C2.56362 6.60817 0 9.16322 0 12.3043C0 14.2313 0.96583 15.9366 2.43994 16.9679C3.36817 17.6176 4.49754 18 5.71525 18C8.86642 18 11.43 15.445 11.43 12.3043V6.01535C12.6477 6.8863 14.14 7.39965 15.75 7.39965V4.30506C14.8829 4.30506 14.0752 4.04816 13.3975 3.60795Z'
                fill='white'
              />
            </svg>
            <svg
              width='18'
              height='17'
              viewBox='0 0 18 17'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M14.2213 0H16.9803L10.9224 6.8977L18 16.2546H12.4459L8.0973 10.5685L3.11896 16.2546H0.35988L6.77774 8.87704L0 0H5.6921L9.62079 5.19427L14.2213 0ZM13.2556 14.6351H14.7851L4.88837 1.55948H3.24492L13.2556 14.6351Z'
                fill='white'
              />
            </svg>
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

function ArtistBio() {
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
        <ArtistProfileCard p={'0px'} />
        <VStack py={'16px'}>
          <Heading size={'18px'} weight={500} py='8px'>
            About
          </Heading>
          <VStack flex={1} py='8px'>
            <Text size={'16px'} weight={300} color='white600'>
              A dynamic rock artist known for her electrifying performances
              and soulful vocals, captivating audiences with every chord
              and lyric. With a fiery spirit and a rebellious edge, she's
              set to redefine the rock genre one stage at a time.
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
