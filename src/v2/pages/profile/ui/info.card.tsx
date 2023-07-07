import { Box, HStack, Icon, Image, Text, VStack } from '@holdr-ui/react';
import { TextGroupSubheading, useProfile } from '../../../packages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import spotifyLogo from '../../../assets/images/spotify-logo.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import appleLogo from '../../../assets/images/apple-logo.png';

function InfoCard() {
  const { profile } = useProfile();

  return (
    <VStack
      gap={4}
      w='100%'
      bgColor='base100'
      radius={4}
      py={4}
      divider={<Box borderBottom={1} borderColor='primary400' />}
    >
      <HStack px={4} gap={3}>
        <Icon name='global-outline' />
        <Text>www.artist.com</Text>
      </HStack>

      <Box px={4}>
        <TextGroupSubheading>{profile.bio}</TextGroupSubheading>
      </Box>

      <HStack gap={5} css={{ justifyContent: 'space-evenly' }}>
        <Image src={spotifyLogo} size={30} />
        <Image src={appleLogo} size={30} />
      </HStack>
    </VStack>
  );
}
InfoCard.displayName = 'InfoCard';

export default InfoCard;
