import { useNavigate, useParams } from 'react-router-dom';

import { ChangeEvent } from 'react';
import {
  customInputStyles,
  isMatchingPattern,
  ISocialLink,
  makePath,
  MaxFieldLength,
  PatternErrorMessage,
  Patterns,
  SocialProvider,
  textAreaClassName,
  TextField,
  usePreviousLocation,
} from '../../../../shared';
import {
  Box,
  Button,
  HStack,
  mergeStyles,
  Textarea,
  useGeneralContext,
  Text,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  IProfile,
  ITinyProfile,
  IUpdateSocialLink,
  retrieveSocialLink,
  useUpdateProfileAndLinks,
} from '../../../../features';

function EditUserProfilePage() {
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');
  const { username } = useParams();
  const { state: profile } = useGeneralContext<IProfile>();

  const { loading, updateProfileAndLinks } = useUpdateProfileAndLinks();

  const [newProfile, updateNewProfile] = useRecordState<ITinyProfile>({
    username: profile.username || '',
    displayName: profile.displayName || '',
    location: profile.location || '',
    bio: profile.bio || '',
  });
  const [newSocialLinks, updateNewSocialLinks] =
    useRecordState<IUpdateSocialLink>({
      X: retrieveSocialLink(profile.socialLinks, 'X')?.url || '',
      Instagram:
        retrieveSocialLink(profile.socialLinks, 'Instagram')?.url || '',
      TikTok: retrieveSocialLink(profile.socialLinks, 'TikTok')?.url || '',
    });

  const nextStep = () => {
    navigate(makePath([username || '', 'edit', 'favourites']), {
      state: {
        previousLocation,
      },
    });
  };

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateNewProfile({ [e.target.name]: e.target.value });
  };
  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNewSocialLinks({ [e.target.name]: e.target.value });
  };

  const isLengthGreaterThanZero = (arr: any | undefined): boolean => {
    if (arr === undefined) {
      return false;
    }
    return arr.length > 0;
  };

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
    newProfile.username,
    Patterns.Username,
    PatternErrorMessage.invalidCharacters(
      'username',
      'alphanumeric characters',
    ),
  );

  return (
    <VStack h='calc(100%)'>
      <VStack overflow='auto' className='thin-scrollbar' gap={6} pr='10px'>
        <TextField
          maxLength={25}
          name='username'
          label='Username'
          placeholder='username'
          value={newProfile.username}
          onChange={handleProfileChange}
          errorText={UsernameErrorText}
        />
        <TextField
          name='displayName'
          maxLength={75}
          label='Display Name'
          placeholder='Enter your display name'
          value={newProfile.displayName}
          onChange={handleProfileChange}
        />
        <VStack gap={2}>
          <Text color='white700' size={1} as='label' htmlFor='bio'>
            About
          </Text>
          <Box position='relative'>
            <Textarea
              id='bio'
              name='bio'
              className={mergeStyles([
                textAreaClassName(),
                customInputStyles(),
              ])}
              radius={1}
              maxLines={6}
              maxLength={MaxFieldLength.FanProfile.Bio}
              colorTheme='white500'
              placeholder='Let people know a little about yourself and your musical interests.'
              value={newProfile.bio}
              onChange={handleProfileChange}
            />
            <Box
              position='absolute'
              b='8px'
              r='8px'
              fontSize={1}
              color='white800'
            >
              {newProfile.bio?.length}/{MaxFieldLength.FanProfile.Bio}
            </Box>
          </Box>
        </VStack>
        <TextField
          name='location'
          maxLength={75}
          label='Based in'
          placeholder='Enter your location'
          value={newProfile.location}
          onChange={handleProfileChange}
        />
        <TextField
          name='Instagram'
          label='Instagram URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your Instgram link'
          value={newSocialLinks.Instagram}
          onChange={handleSocialLinkChange}
          errorText={InstagramURLErrorText}
        />
        <TextField
          name='TikTok'
          label='TikTok URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your TikTok link'
          value={newSocialLinks.TikTok}
          onChange={handleSocialLinkChange}
          errorText={TikTokURLErrorText}
        />
        <TextField
          name='X'
          label='X URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your X link'
          value={newSocialLinks.X}
          onChange={handleSocialLinkChange}
          errorText={XURLErrorText}
        />
      </VStack>
      <HStack gap={2} justify='flex-end' mt={6} pr='10px'>
        <Button
          disabled={loading}
          onClick={() => navigate(previousLocation)}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            isLengthGreaterThanZero(TikTokURLErrorText) ||
            isLengthGreaterThanZero(InstagramURLErrorText) ||
            isLengthGreaterThanZero(XURLErrorText)
          }
          isLoading={loading}
          loadingText='Continue'
          onClick={async () => {
            const formattedLinks: ISocialLink[] = (
              Object.keys(newSocialLinks) as SocialProvider[]
            )
              // .filter((name) => newSocialLinks[name]?.length)
              .map((name: SocialProvider) => ({
                provider: name,
                url: newSocialLinks[name] as string,
              }));

            const currentXURL =
              retrieveSocialLink(profile.socialLinks, 'X')?.url || '';
            const currentTikTokURL =
              retrieveSocialLink(profile.socialLinks, 'TikTok')?.url || '';
            const currentInstagramURL =
              retrieveSocialLink(profile.socialLinks, 'Instagram')?.url ||
              '';

            if (
              profile.bio !== newProfile.bio ||
              profile.username !== newProfile.username ||
              profile.location !== newProfile.location ||
              profile.displayName !== newProfile.displayName ||
              currentXURL !== (newSocialLinks.X || '') ||
              currentInstagramURL !== (newSocialLinks.Instagram || '') ||
              currentTikTokURL !== (newSocialLinks.TikTok || '')
            ) {
              await updateProfileAndLinks(newProfile, formattedLinks);
            }

            // update URL if username is updated

            nextStep();
          }}
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
EditUserProfilePage.displayName = 'EditUserProfilePage';

export default EditUserProfilePage;
