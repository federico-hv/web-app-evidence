import { Box, HStack, Icon, Image, Text, VStack } from '@holdr-ui/react';
import { TextGroup, TextGroupSubheading } from '../../../packages';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import spotifyLogo from '../../../assets/images/spotify-logo.png';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import appleLogo from '../../../assets/images/apple-logo.png';

function InfoCard() {
  return (
    <VStack
      gap={4}
      w='100%'
      bgColor='base100'
      radius={4}
      py={4}
      divider={<Box borderBottom={1} borderColor='primary400' />}
    >
      <TextGroup px={4}>
        {/*<TextGroupHeading size={3} color='base400'>*/}
        {/*  About*/}
        {/*</TextGroupHeading>*/}
        <TextGroupSubheading>
          Emerging artist from vancouver.
        </TextGroupSubheading>
      </TextGroup>

      <HStack px={4} gap={3}>
        <Icon name='global-outline' />
        <Text>www.artist.com</Text>
      </HStack>

      <HStack gap={5} justify='center'>
        <Image src={spotifyLogo} size={30} />
        <Image src={appleLogo} size={30} />
      </HStack>
    </VStack>
  );
}
InfoCard.displayName = 'InfoCard';

export default InfoCard;
