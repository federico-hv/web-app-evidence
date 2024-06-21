import {
  Button,
  Center,
  CircularProgress,
  CloseButton,
  HStack,
  Input,
  Text,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  IAnnouncement,
  ICollaborator,
  InformationTooltip,
  InputTextField,
  isLengthGreaterThanZero,
  isMatchingPattern,
  ISocialLink,
  makeButtonLarger,
  makePath,
  MaxFieldLength,
  Paths,
  PatternErrorMessage,
  Patterns,
  SocialProvider,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useArrayState,
  usePreviousLocation,
} from '../../../../shared';
import {
  IUpdateSocialLink,
  retrieveSocialLink,
  useClubContext,
  useDebounceIsUniqueClubUrl,
  useSuspenseGetArtist,
  useUpdateArtistProfile,
} from '../../../../features';
import { ChangeEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  InputGroup,
  InputGroupLeftElement,
  InputGroupRightElement,
} from '../../../../tmp/input-group';
import { AnimatePresence } from 'framer-motion';
import { FlatList } from '../../../../tmp/flat-list';
import { Maximum } from '../music-and-links';

interface IArtistProfile {
  username: string;
  name: string;
  bio?: string;
  location?: string;
}

function EditArtistClubBioPage() {
  const { updateArtistProfile, loading } = useUpdateArtistProfile();

  const { slug } = useParams();

  const navigate = useNavigate();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const club = useClubContext();

  const [isClubURLUnique, { loading: loadingCUU, result: resultCUU }] =
    useDebounceIsUniqueClubUrl();

  const [clubUrl, setClubURL] = useState<string | undefined>(club.url);

  const handleClubUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\w]/gm, '');

    setClubURL(value);

    isClubURLUnique(value, club.id);
  };

  const [profile, updateProfile] = useRecordState<IArtistProfile>({
    username: artistData.artist.username,
    name: artistData.artist.name,
    bio: artistData.artist.bio || '',
    location: artistData.artist.location || '',
  });

  const [newSocialLinks, updateNewSocialLinks] =
    useRecordState<IUpdateSocialLink>({
      X:
        retrieveSocialLink(artistData.artist.socialLinks || [], 'X')
          ?.url || '',
      Instagram:
        retrieveSocialLink(
          artistData.artist.socialLinks || [],
          'Instagram',
        )?.url || '',
      TikTok:
        retrieveSocialLink(artistData.artist.socialLinks || [], 'TikTok')
          ?.url || '',
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

  const [
    collaborators,
    pushCollaborators,
    replaceCollaborators,
    removeCollaborators,
  ] = useArrayState<string>(
    artistData.artist.collaborators?.map(({ name }) => name) || [],
  );

  const nextStep = () => {
    navigate(
      makePath([Paths.clubs, slug || '', 'edit', Paths.musicAndLinks]),
      {
        state: {
          previousLocation,
        },
      },
    );
  };

  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNewSocialLinks({ [e.target.name]: e.target.value });
  };

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        const formattedLinks: ISocialLink[] = (
          Object.keys(newSocialLinks) as SocialProvider[]
        )
          // .filter((name) => newSocialLinks[name]?.length)
          .map((name: SocialProvider) => ({
            provider: name,
            url: newSocialLinks[name] as string,
          }));

        // const currentXURL =
        //   retrieveSocialLink(artistData.artist.socialLinks || [], 'X')
        //     ?.url || '';
        // const currentTikTokURL =
        //   retrieveSocialLink(artistData.artist.socialLinks || [], 'TikTok')
        //     ?.url || '';
        // const currentInstagramURL =
        //   retrieveSocialLink(
        //     artistData.artist.socialLinks || [],
        //     'Instagram',
        //   )?.url || '';

        await updateArtistProfile({
          ...profile,
          socialLinks: formattedLinks,
          collaborators: collaborators,
        }).then(() => nextStep());
      }}
    >
      <VStack
        overflowY='auto'
        pr={4}
        className='thin-scrollbar'
        gap={4}
        flex={1}
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
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            name='artistName'
            label='Display Name'
            placeholder='Display Name'
          />
          <InputTextField
            value={profile.username}
            onChange={(e) => updateProfile({ username: e.target.value })}
            name='username'
            label='Username'
            placeholder='@username'
            errorText={UsernameErrorText}
          />
          <VStack gap={4}>
            <HStack color='white700' gap={1} items='center'>
              <Text weight={500} size={2} as='label'>
                Custom URL
              </Text>
              <InformationTooltip
                side='right'
                align='start'
                container={
                  document.getElementById('page-dialog-container') ||
                  document.body
                }
                description='Something useful.'
              />
            </HStack>

            <VStack gap={1}>
              <InputGroup>
                <InputGroupLeftElement>
                  <Text color='white900'>
                    https://holdrclub.com/clubs/
                  </Text>
                </InputGroupLeftElement>
                <Input
                  variant='unstyled'
                  maxLength={25}
                  value={clubUrl}
                  onChange={handleClubUrlChange}
                  color='white500'
                />
                <InputGroupRightElement pl={4}>
                  <AnimatePresence>
                    {loadingCUU && (
                      <Center position='absolute' t={0} b={0} r='1rem'>
                        <CircularProgress
                          bgColor='base400'
                          colorTheme='white500'
                          thickness={2}
                          isIndeterminate
                          size={20}
                        />
                      </Center>
                    )}
                  </AnimatePresence>
                </InputGroupRightElement>
              </InputGroup>
              {!resultCUU && (
                <Text size={1} weight={500} color='danger300'>
                  That URL is already taken
                </Text>
              )}
            </VStack>
          </VStack>
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
              Collaborators
            </TextGroupHeading>
            <TextGroupSubheading size={1} color='white700'>
              Enter any announcements you want to make to your fans
            </TextGroupSubheading>
          </TextGroup>
          {collaborators.length > 0 && (
            <FlatList
              gap={4}
              direction='vertical'
              data={collaborators}
              renderItem={(name, idx) => (
                <InputGroup>
                  <Input
                    placeholder='Add collaborator'
                    variant='unstyled'
                    maxLength={75}
                    value={name}
                    onChange={(e) =>
                      replaceCollaborators(idx, e.target.value)
                    }
                    color='white500'
                  />
                  <InputGroupRightElement pl={4}>
                    <Center position='absolute' t={0} b={0} r={0} pr={3}>
                      <CloseButton
                        onClick={() =>
                          removeCollaborators((_, _idx) => _idx !== idx)
                        }
                        type='button'
                        css={{ width: '1rem !important' }}
                        size='sm'
                        className={makeButtonLarger('1rem')}
                        colorTheme='white700'
                      />
                    </Center>
                  </InputGroupRightElement>
                </InputGroup>
              )}
              keyExtractor={(_, idx) => `announcement-${idx}`}
            />
          )}
          {collaborators.length <= 5 && (
            <Button
              type='button'
              onClick={() => {
                pushCollaborators('');
              }}
              variant='ghost'
              leftIcon='add'
              size='sm'
              colorTheme='white700'
              radius={1}
              css={{
                fontSize: '$1 !important',
              }}
            >
              Add collaborator
            </Button>
          )}
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

      <HStack
        bgColor='#30304b'
        position='sticky'
        b={0}
        gap={2}
        justify='flex-end'
        py={4}
        pr='10px'
      >
        <Button
          disabled={loading}
          type='button'
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
          onClick={() => navigate(previousLocation)}
        >
          Cancel
        </Button>
        <Button
          disabled={
            !isLengthGreaterThanZero(profile.username) ||
            !isLengthGreaterThanZero(profile.name) ||
            isLengthGreaterThanZero(TikTokURLErrorText) ||
            isLengthGreaterThanZero(InstagramURLErrorText) ||
            isLengthGreaterThanZero(XURLErrorText)
          }
          isLoading={loading}
          type='submit'
          loadingText='Continue'
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
EditArtistClubBioPage.displayName = 'EditArtistClubBioPage';

export default EditArtistClubBioPage;
