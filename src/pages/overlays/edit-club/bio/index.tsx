import { useRecordState, VStack } from '@holdr-ui/react';
import {
  InputTextField,
  isMatchingPattern,
  MaxFieldLength,
  PatternErrorMessage,
  Patterns,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  voidFn,
} from '../../../../shared';
import {
  IUpdateSocialLink,
  retrieveSocialLink,
  useClubContext,
  useSuspenseSocialLinks,
} from '../../../../features';
import { ChangeEvent } from 'react';

interface IArtistProfile {
  username: string;
  name: string;
  bio: string;
  location: string;
}

function EditArtistClubBioPage() {
  const club = useClubContext();

  const { data: linksData } = useSuspenseSocialLinks(
    club.artist.accountId,
  );
  const [profile, updateProfile] = useRecordState<IArtistProfile>({
    username: club.artist.username,
    name: club.artist.name,
    bio: club.artist.bio || '',
    location: '',
  });

  const [newSocialLinks, updateNewSocialLinks] =
    useRecordState<IUpdateSocialLink>({
      X: retrieveSocialLink(linksData.socialLinks, 'X')?.url || '',
      Instagram:
        retrieveSocialLink(linksData.socialLinks, 'Instagram')?.url || '',
      TikTok:
        retrieveSocialLink(linksData.socialLinks, 'TikTok')?.url || '',
    });

  const InstagramURLErrorText = isMatchingPattern(
    newSocialLinks.Instagram,
    Patterns.InstagramURL,
    PatternErrorMessage.invalid('Instagram URL'),
  );

  const TikTokURLErrorText = isMatchingPattern(
    newSocialLinks.TikTok,
    Patterns.TikTokURL,
    PatternErrorMessage.invalid('TikTok URL'),
  );

  const XURLErrorText = isMatchingPattern(
    newSocialLinks.X,
    Patterns.XURL,
    PatternErrorMessage.invalid('X URL'),
  );

  const UsernameErrorText = isMatchingPattern(
    profile.username,
    Patterns.Username,
    PatternErrorMessage.invalidCharacters(
      'username',
      'alphanumeric characters',
    ),
  );

  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNewSocialLinks({ [e.target.name]: e.target.value });
  };

  return (
    <VStack
      as='form'
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
          value={profile.username}
          onChange={(e) => updateProfile({ username: e.target.value })}
          name='username'
          label='Username'
          placeholder='@username'
          errorText={UsernameErrorText}
        />
        <InputTextField
          value={profile.name}
          onChange={(e) => updateProfile({ name: e.target.value })}
          name='artistName'
          label='Artist Name'
          placeholder='Artist Name'
        />
        <TextareaField
          value={profile.bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          id='bio'
          name='bio'
          placeholder='Let people know a little about yourself and your musical interests.'
          maxLength={MaxFieldLength.FanProfile.Bio}
        />
        <InputTextField
          value={profile.location}
          onChange={(e) => updateProfile({ location: e.target.value })}
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
          value={newSocialLinks.Instagram}
          onChange={handleSocialLinkChange}
          errorText={InstagramURLErrorText}
        />
        <InputTextField
          name='TikTok'
          label='TikTok URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your TikTok link'
          value={newSocialLinks.TikTok}
          onChange={handleSocialLinkChange}
          errorText={TikTokURLErrorText}
        />
        <InputTextField
          name='X'
          label='X URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your X link'
          value={newSocialLinks.X}
          onChange={handleSocialLinkChange}
          errorText={XURLErrorText}
        />
      </VStack>
    </VStack>
  );
}
EditArtistClubBioPage.displayName = 'EditArtistClubBioPage';

export default EditArtistClubBioPage;
