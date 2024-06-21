import {
  BioSocialLinks,
  UserRelationshipCount,
  useSuspenseGetArtist,
} from '../../../../features';
import {
  Avatar,
  AvatarBadge,
  Heading,
  HStack,
  Icon,
  VStack,
} from '@holdr-ui/react';
import { useParams } from 'react-router-dom';

function ArtistClubSummaryCard() {
  const { slug } = useParams();

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  return (
    <VStack bg='#30304B' radius={4} p={4} justify={'center'}>
      <HStack gap={4} maxHeight={'136px'}>
        <Avatar
          key={artistData.artist.name}
          src={artistData.artist.avatar}
          name={artistData.artist.name}
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
          <HStack gap={2} items='center'>
            <Heading
              color='white500'
              size={'20px'}
              weight={500}
              css={{ lineHeight: '115%' }}
            >
              {artistData.artist.name}
            </Heading>
            <VStack>
              <Icon size='xl' color='white500' name='verified-outline' />
            </VStack>
          </HStack>
          <UserRelationshipCount username={artistData.artist.username} />
          <BioSocialLinks links={artistData.artist.socialLinks || []} />
        </VStack>
      </HStack>
    </VStack>
  );
}

export default ArtistClubSummaryCard;
