import { Box, HStack, Image } from '@holdr-ui/react';
import spotifyLogo from '../../../assets/images/spotify-logo.png';
import appleLogo from '../../../assets/images/apple-logo.png';
import instagramLogo from '../../../assets/images/instagram-logo.png';

// only appears if the user is an artist and has socials

function SocialsCard() {
  return (
    <Box w='100%' py={5} borderBottom={2} borderColor='base100'>
      <HStack gap={5} css={{ justifyContent: 'space-evenly' }}>
        <Image src={spotifyLogo} size={30} />
        <Image src={appleLogo} size={30} />
        <Image src={instagramLogo} size={30} />
      </HStack>
    </Box>
  );
}
SocialsCard.displayName = 'SocialsCard';

export default SocialsCard;
