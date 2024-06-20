import {
  Box,
  Circle,
  Heading,
  HStack,
  VStack,
  Text,
  useGeneralContext,
} from '@holdr-ui/react';
import { FlatList } from '../../../../tmp/flat-list';
import {
  EmbeddedPlayer,
  ExternalLinkTypeEnum,
  IExternalLink,
} from '../../../../shared';
import {
  IClub,
  useClubContext,
  useGetArtistDetails,
  useSuspenseGetArtistDetails,
} from '../../../../features';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

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

function ExternalLink({ data }: { data: IExternalLink }) {
  return (
    <HStack gap={2} items='center'>
      <Box fontSize={5} mt='0px'>
        <ReplaceWithLinkIcon />
      </Box>
      <Box
        flex={10}
        _hover={{
          '& a': {
            textDecoration: 'underline',
          },
        }}
      >
        <Link
          to={data.url}
          target='_blank'
          referrerPolicy='no-referrer'
          style={{ cursor: 'pointer' }}
        >
          <Text size={3} weight={300}>
            {data.url}
          </Text>
        </Link>
      </Box>
    </HStack>
  );
}

function ArtistClubBioAdditionalContent() {
  const { state: club } = useGeneralContext<IClub>();

  const { data } = useSuspenseGetArtistDetails(club.artist.id);

  return (
    <Box basis='320px' grow={0} radius={2} bgColor='#30304B' p={4} ml={1}>
      <VStack
        className='thin-scrollbar'
        h='100%'
        overflow='auto'
        pb={1}
        pr={3}
      >
        {data.artistPicks.length > 0 && (
          <Fragment>
            <HStack pb='16px'>
              <Heading size={5} weight={500}>
                Artist Pick
              </Heading>
            </HStack>

            <FlatList
              direction='vertical'
              gap={3}
              data={data.artistPicks}
              keyExtractor={(item) => item.id}
              renderItem={(item) => (
                <EmbeddedPlayer
                  provider='Spotify'
                  ids={item.externalIds}
                />
              )}
            />

            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.10)'
            />
          </Fragment>
        )}

        {data.announcements.length > 0 && (
          <Fragment>
            <VStack>
              <Heading as='h2' size={4} weight={500} mb={4}>
                Announcements
              </Heading>
              <Box pt={'8px'} pb='12px' ml={2} color='white600'>
                <FlatList
                  direction='vertical'
                  gap={2}
                  data={data.announcements}
                  renderItem={(item) => (
                    <HStack gap={2}>
                      <Circle mt='6px' bgColor='white500' size='6px' />
                      <Text>{item.description}</Text>
                    </HStack>
                  )}
                  keyExtractor={(item) => item.description}
                />
              </Box>
            </VStack>
            <Box
              my={4}
              borderBottom={1}
              borderColor='rgba(152, 152, 255, 0.10)'
            />
          </Fragment>
        )}

        {data.externalArtistLinks.length > 0 && (
          <VStack>
            <Heading size='18px' weight={500}>
              Links
            </Heading>
            <VStack>
              {data.externalArtistLinks.filter(
                (item) => item.type === ExternalLinkTypeEnum.Event,
              ).length > 0 && (
                <Fragment>
                  <VStack>
                    <Heading py={5} as='h3' size={3} weight={400}>
                      Upcoming Show
                    </Heading>
                    <FlatList
                      direction='vertical'
                      gap={1}
                      pl={2}
                      data={data.externalArtistLinks.filter(
                        (item) => item.type === ExternalLinkTypeEnum.Event,
                      )}
                      renderItem={(item) => <ExternalLink data={item} />}
                      keyExtractor={(item) => item.url}
                    />
                  </VStack>
                  <Box
                    my={4}
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.10)'
                  />
                </Fragment>
              )}
              {data.externalArtistLinks.filter(
                (item) => item.type === ExternalLinkTypeEnum.Merch,
              ).length > 0 && (
                <Fragment>
                  <VStack>
                    <Heading as='h3' size={3} weight={400}>
                      Merchandise
                    </Heading>
                    <FlatList
                      direction='vertical'
                      gap={1}
                      pl={2}
                      data={data.externalArtistLinks.filter(
                        (item) => item.type === ExternalLinkTypeEnum.Merch,
                      )}
                      renderItem={(item) => <ExternalLink data={item} />}
                      keyExtractor={(item) => item.url}
                    />
                  </VStack>
                  <Box
                    my={4}
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.10)'
                  />
                </Fragment>
              )}
              {data.externalArtistLinks.filter(
                (item) => item.type === ExternalLinkTypeEnum.Other,
              ).length > 0 && (
                <Fragment>
                  <VStack>
                    <Heading as='h3' size={3} weight={400}>
                      Other
                    </Heading>
                    <FlatList
                      direction='vertical'
                      gap={1}
                      pl={2}
                      data={data.externalArtistLinks.filter(
                        (item) => item.type === ExternalLinkTypeEnum.Other,
                      )}
                      renderItem={(item) => <ExternalLink data={item} />}
                      keyExtractor={(item) => item.url}
                    />
                  </VStack>
                  <Box
                    my={4}
                    borderBottom={1}
                    borderColor='rgba(152, 152, 255, 0.10)'
                  />
                </Fragment>
              )}
            </VStack>
          </VStack>
        )}
      </VStack>
    </Box>
  );
}
ArtistClubBioAdditionalContent.displayName =
  'ArtistClubBioAdditionalContent';

export default ArtistClubBioAdditionalContent;
