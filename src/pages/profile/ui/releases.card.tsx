import { Heading, HStack, Image, VStack } from '@holdr-ui/react';
import {
  Loader,
  SwitchConditional,
  SwitchConditionalCase,
  TextGroup,
  TextGroupSubheading,
  useProfile,
} from '../../../shared';
import { useCanViewProfile } from '../shared';

const releases = [
  {
    id: 'r1',
    artist: {
      name: 'Kendrick Lamar',
      id: '0',
    },
    title: 'Rich Spirit',
    coverImage:
      'https://media.pitchfork.com/photos/627c1023d3c744a67a846260/1:1/w_600/Kendrick-Lamar-Mr-Morale-And-The-Big-Steppers.jpg',
  },
  {
    id: 'r2',
    artist: {
      name: 'Doja Cat',
      id: '2',
    },
    title: 'Attention',
    coverImage: 'https://pbs.twimg.com/media/FyuDKTqXsAEToGL.jpg',
  },
  {
    id: 'r3',
    artist: {
      name: 'Harry Styles',
      id: '3',
    },
    title: 'Satellite',
    coverImage:
      'https://media.architecturaldigest.com/photos/623e05e0b06d6c32457e4358/1:1/w_3000,h_3000,c_limit/FINAL%20%20PFHH-notextwlogo.jpg',
  },
];

function Release({
  title,
  artist,
  coverImage,
}: {
  title: string;
  artist: { name: string; id: string };
  coverImage?: string;
}) {
  return (
    <VStack gap={2} title={`${title} - ${artist.name}`} w='calc(100%/3)'>
      <Image size={100} radius={2} src={coverImage} />
      <TextGroup gap={1}>
        <TextGroupSubheading size={2} noOfLines={1}>
          {title}
        </TextGroupSubheading>
        <TextGroupSubheading size={2} weight={500} noOfLines={1}>
          {artist.name}
        </TextGroupSubheading>
      </TextGroup>
    </VStack>
  );
}

function ReleasesCard() {
  const { profile } = useProfile();
  const { loading, canViewProfile } = useCanViewProfile();
  return (
    <Loader loading={loading}>
      {canViewProfile && (
        <VStack
          gap={4}
          w='100%'
          py={5}
          px={4}
          borderBottom={2}
          borderColor='base100'
        >
          <SwitchConditional>
            <SwitchConditionalCase on={profile.role === 'general'}>
              <Heading as='h2' size={3}>
                Release Activity
              </Heading>
            </SwitchConditionalCase>
            <SwitchConditionalCase on={profile.role === 'artist'}>
              <Heading as='h2' size={3}>
                New Releases
              </Heading>
            </SwitchConditionalCase>
          </SwitchConditional>

          <HStack gap={4} w='100%' overflow='scroll'>
            {releases.map(({ id, coverImage, title, artist }) => (
              <Release
                coverImage={
                  profile.role === 'artist' ? profile.avatar : coverImage
                }
                title={title}
                key={id}
                artist={
                  profile.role === 'artist'
                    ? { name: profile.displayName, id: profile.username }
                    : artist
                }
              />
            ))}
          </HStack>
        </VStack>
      )}
    </Loader>
  );
}
ReleasesCard.displayName = 'ReleasesCard';

export default ReleasesCard;
