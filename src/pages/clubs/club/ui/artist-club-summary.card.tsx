import {
  BioSocialLinks,
  IClub,
  UserRelationshipCount,
  useSuspenseSocialLinks,
} from '../../../../features';
import {
  Avatar,
  AvatarBadge,
  Heading,
  HStack,
  Icon,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';

function ArtistClubSummaryCard() {
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

export default ArtistClubSummaryCard;
