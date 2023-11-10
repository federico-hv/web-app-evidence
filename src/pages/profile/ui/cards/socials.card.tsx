import { Box, HStack, Image } from '@holdr-ui/react';
import spotifyLogo from '../../../../assets/images/spotify-logo.png';
import appleLogo from '../../../../assets/images/apple-music-logo.png';
import instagramLogo from '../../../../assets/images/instagram-logo.png';
import {
  SocialProviderName,
  SwitchConditional,
  SwitchConditionalCase,
  useGeneralContext,
} from '../../../../shared';
import { styled } from '../../../../configs';
import { IProfile } from '../../shared';

// only appears if the user is an artist and has socials

const socials = {
  spotifyUrl: 'https://open.spotify.com/?',
  appleMusicUrl: 'https://music.apple.com/',
  instagramUrl: 'https://www.instagram.com/',
};

const StyledAnchor = styled('a', {
  width: 'fit-content',
});

function SocialLink({
  provider: name,
  url,
}: {
  provider: SocialProviderName;
  url: string;
}) {
  const ImageSrc: Record<SocialProviderName, string> = {
    apple: appleLogo,
    instagram: instagramLogo,
    spotify: spotifyLogo,
  };

  return (
    <StyledAnchor target='_blank' href={url} title={`Link to ${name}`}>
      <Image alt={`${name} social logo`} src={ImageSrc[name]} size={30} />
    </StyledAnchor>
  );
}

function SocialsCard() {
  const { state: profile } = useGeneralContext<IProfile>();
  return (
    <SwitchConditional>
      <SwitchConditionalCase
        on={
          profile.role === 'artist' &&
          (!!socials.appleMusicUrl ||
            !!socials.spotifyUrl ||
            !!socials.instagramUrl)
        }
      >
        <Box w='100%' py={5} borderBottom={2} borderColor='base100'>
          <HStack gap={5} css={{ justifyContent: 'space-evenly' }}>
            <SwitchConditional>
              <SwitchConditionalCase on={!!socials.spotifyUrl}>
                <SocialLink provider='spotify' url={socials.spotifyUrl} />
              </SwitchConditionalCase>
              <SwitchConditionalCase on={!!socials.appleMusicUrl}>
                <SocialLink provider='apple' url={socials.appleMusicUrl} />
              </SwitchConditionalCase>
              <SwitchConditionalCase on={!!socials.instagramUrl}>
                <SocialLink
                  provider='instagram'
                  url={socials.instagramUrl}
                />
              </SwitchConditionalCase>
            </SwitchConditional>
          </HStack>
        </Box>
      </SwitchConditionalCase>
    </SwitchConditional>
  );
}
SocialsCard.displayName = 'SocialsCard';

export default SocialsCard;
