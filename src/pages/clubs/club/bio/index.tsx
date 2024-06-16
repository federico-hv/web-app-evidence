import { Link, useLocation, useParams } from 'react-router-dom';
import {
  GQLRenderer,
  Head,
  makePath,
  Paths,
  usePreviousLocation,
} from '../../../../shared';
import {
  Avatar,
  AvatarBadge,
  AvatarGroup,
  Box,
  Circle,
  Heading,
  HStack,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { IClub } from '../../../../features';
import { Fragment } from 'react';
import { FlatList } from '../../../../tmp/flat-list';
import ArtistClubBioAdditionalContent from '../ui/artist-club-bio-additional.content';
import { ArtistClubSummaryCard } from '../ui';

const imageSrcs = [
  'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250',
  'https://i.pravatar.cc/250?u=mail@ashallendesign.co.uk',
  'https://avatar.iran.liara.run/public/boy?username=Ash',
  'https://api.dicebear.com/7.x/adventurer-neutral/svg?seed=mail@ashallendesign.co.uk',
];

function ArtistClubBioPage() {
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
              <ArtistClubSummaryCard />
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

ArtistClubBioPage.displayName = 'ArtistClubBioPage';
export default ArtistClubBioPage;
