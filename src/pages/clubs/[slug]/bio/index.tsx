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
  VStack,
} from '@holdr-ui/react';
import {
  useSuspenseGetArtist,
  useSuspenseGetCollaborators,
} from '../../../../features';
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
  const previousLocation = usePreviousLocation(pathname);
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { data: collaborationData } = useSuspenseGetCollaborators(
    artistData.artist.id,
  );

  return (
    <Fragment>
      <Head
        prefix={`${artistData.artist.name}'s Club -`}
        title='Bio'
        description='A catalog of memberships that are being offered by artists.'
      />
      <HStack
        maxHeight='calc(100vh - 250px)'
        overflow='hidden'
        justify='space-between'
        gap={4}
      >
        <VStack
          flex={1}
          radius={2}
          overflowY='auto'
          className='thin-scrollbar'
          bgColor='#30304B'
          css={{ paddingInlineEnd: '$3' }}
        >
          <GQLRenderer>
            <ArtistClubSummaryCard />
          </GQLRenderer>
          <VStack p={4}>
            {artistData.artist.bio && (
              <Fragment>
                <VStack gap={3}>
                  <Heading weight={500} size={4}>
                    About
                  </Heading>
                  <VStack flex={1}>
                    <Text
                      css={{ lineHeight: 1.5 }}
                      weight={300}
                      color='white600'
                    >
                      {artistData.artist.bio}
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
            {artistData.artist.location && (
              <Fragment>
                <VStack gap={3}>
                  <Heading weight={500} size={4}>
                    Based In
                  </Heading>
                  <VStack flex={1}>
                    <Text
                      css={{ lineHeight: 1.5 }}
                      weight={300}
                      color='white600'
                    >
                      {artistData.artist.location}
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
            {collaborationData.collaborators.length > 0 && (
              <Fragment>
                <VStack gap={3}>
                  <Heading weight={500} size={4}>
                    Collaborators
                  </Heading>
                  <FlatList
                    items='center'
                    divider={
                      <Circle mx={4} bgColor='black300' size='5px' />
                    }
                    data={collaborationData.collaborators}
                    renderItem={(item) => (
                      <Text
                        color='white600'
                        weight={300}
                        css={{ lineHeight: 1.5 }}
                      >
                        {item.name}
                      </Text>
                    )}
                    keyExtractor={(item) => item.id}
                  />
                </VStack>
                <Box
                  my={4}
                  borderBottom={1}
                  borderColor='rgba(152, 152, 255, 0.1)'
                />
              </Fragment>
            )}
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
                css={{ marginTop: '$1', lineHeight: 1.5 }}
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

        <ArtistClubBioAdditionalContent />
      </HStack>
    </Fragment>
  );
}

ArtistClubBioPage.displayName = 'ArtistClubBioPage';
export default ArtistClubBioPage;
