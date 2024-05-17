import { useNavigate } from 'react-router-dom';
import {
  Head,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { Button, HStack, VStack } from '@holdr-ui/react';
import {
  ChangeClubBannerImage,
  ChangeClubImage,
  ChangeProfileAvatar,
} from './ui';

function UploadPhotoView() {
  const previousLocation = usePreviousLocation('/');

  const navigate = useNavigate();

  return (
    <VStack gap={9} pl={2} h='100%'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Profile</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image for your profile photo
          </TextGroupSubheading>
        </TextGroup>
        <ChangeProfileAvatar />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Auction Card</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image that will be visible for your fans on the Clubs
            page
          </TextGroupSubheading>
        </TextGroup>
        <ChangeClubImage />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Banner</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add a banner image that willy be displayed on your member’s
            page
          </TextGroupSubheading>
        </TextGroup>
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
      >
        <Button
          onClick={() =>
            navigate(
              makePath([
                Paths.setupProfile,
                Paths.artist,
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
