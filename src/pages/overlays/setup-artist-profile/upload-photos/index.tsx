import { useNavigate } from 'react-router-dom';
import {
  makePath,
  missingField,
  Paths,
  usePreviousLocation,
} from '../../../../shared';
import { Button, HStack, Text, VStack } from '@holdr-ui/react';
import {
  ChangeClubBannerImage,
  ChangeClubImage,
  ChangeProfileAvatar,
} from './ui';
import {
  useClubContext,
  useCurrentArtist,
  useSuspenseGetArtist,
} from '../../../../features';
import { SectionHeader } from '../ui';

function UploadPhotoView() {
  const currentArtist = useCurrentArtist();

  const { data: artistData } = useSuspenseGetArtist({
    id: currentArtist?.id,
  });

  const previousLocation = usePreviousLocation('/');

  const navigate = useNavigate();

  const club = useClubContext();

  return (
    <VStack gap={9} pl={2} h='100%' overflowY='auto'>
      <VStack gap={4}>
        <SectionHeader
          required
          title='Profile'
          subtitle='Add an image for your profile photo'
        />
        <ChangeProfileAvatar />
      </VStack>
      <VStack gap={4}>
        <SectionHeader
          required
          title='Auction Card'
          subtitle='Add an image that will be visible for your fans on the Club page'
        />
        <ChangeClubImage placeholder={club.coverImage} />
      </VStack>
      <VStack gap={4}>
        <SectionHeader
          required
          title='Banner'
          subtitle='Add a banner image that willy be displayed on your member’s
            page'
        />
        <ChangeClubBannerImage />
      </VStack>
      <HStack
        justify='flex-end'
        position='absolute'
        b={0}
        r={0}
        w='fit-content'
        bgColor='#30304B'
        gap={3}
        pl={56}
        pr={56}
        pb={56}
        pt='14px'
      >
        <Button
          type='button'
          onClick={() => navigate(previousLocation)}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Skip
        </Button>
        <Button
          disabled={missingField({
            avatar: artistData.artist.avatar,
            banner: club.bannerImage,
            cover: club.coverImage,
          })}
          onClick={() =>
            navigate(
              makePath([
                Paths.setupArtists,
                Paths.setupArtist.aboutMeAndPerks,
              ]),
              {
                state: {
                  previousLocation,
                },
              },
            )
          }
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
UploadPhotoView.displayName = 'UploadPhotoView';

export default UploadPhotoView;
