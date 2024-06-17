import { VStack } from '@holdr-ui/react';
import {
  InputTextField,
  MaxFieldLength,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';

function EditArtistClubBioPage() {
  // const InstagramURLErrorText = isMatchingPattern(
  //   newSocialLinks.Instagram,
  //   Patterns.InstagramURL,
  //   PatternErrorMessage.invalid('Instagram URL'),
  // );
  //
  // const TikTokURLErrorText = isMatchingPattern(
  //   newSocialLinks.TikTok,
  //   Patterns.TikTokURL,
  //   PatternErrorMessage.invalid('TikTok URL'),
  // );
  //
  // const XURLErrorText = isMatchingPattern(
  //   newSocialLinks.X,
  //   Patterns.XURL,
  //   PatternErrorMessage.invalid('X URL'),
  // );
  //
  // const UsernameErrorText = isMatchingPattern(
  //   newProfile.username,
  //   Patterns.Username,
  //   PatternErrorMessage.invalidCharacters(
  //     'username',
  //     'alphanumeric characters',
  //   ),
  // );

  return (
    <VStack
      gap={8}
      h='100%'
      overflowY='auto'
      pr={4}
      className='thin-scrollbar'
    >
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Artist Bio
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter the information that will be displayed on your bio page
          </TextGroupSubheading>
        </TextGroup>
        <InputTextField
          name='username'
          label='Username'
          placeholder='@username'
        />
        <InputTextField
          name='fullname'
          label='Full Name'
          placeholder='Full Name'
        />
        <TextareaField
          id='bio'
          name='bio'
          placeholder='Let people know a little about yourself and your musical interests.'
          maxLength={MaxFieldLength.FanProfile.Bio}
          // value={newProfile.bio}
          // onChange={handleProfileChange}
        />
        <InputTextField
          name='location'
          label='Based In'
          placeholder='Enter your location'
        />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Add your social links
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Share your social links for your fans
          </TextGroupSubheading>
        </TextGroup>
        <InputTextField
          name='Instagram'
          label='Instagram URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your Instgram link'
          // value={newSocialLinks.Instagram}
          // onChange={handleSocialLinkChange}
          // errorText={InstagramURLErrorText}
        />
        <InputTextField
          name='TikTok'
          label='TikTok URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your TikTok link'
          // value={newSocialLinks.TikTok}
          // onChange={handleSocialLinkChange}
          // errorText={TikTokURLErrorText}
        />
        <InputTextField
          name='X'
          label='X URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your X link'
          // value={newSocialLinks.X}
          // onChange={handleSocialLinkChange}
          // errorText={XURLErrorText}
        />
      </VStack>
    </VStack>
  );
}
EditArtistClubBioPage.displayName = 'EditArtistClubBioPage';

export default EditArtistClubBioPage;
