import {
  Box,
  Button,
  CircularProgress,
  CloseButton,
  HStack,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  FieldLengths,
  handleFieldError,
  InputLoadingIndicator,
  InputTextField,
  makePath,
  missingField,
  parseSocialLinks,
  Paths,
  Patterns,
  removeFromArray,
  replaceInArray,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useNavigateWithPreviousLocation,
  usePreviousLocation,
} from '../../../../shared';
import {
  retrieveSocialLink,
  useClubContext,
  useDebounceIsUniqueClubUrl,
  useSuspenseGetArtist,
  useUpdateArtistProfile,
} from '../../../../features';
import { ChangeEvent } from 'react';
import { useParams } from 'react-router-dom';
import { FlatList } from '../../../../tmp/flat-list';

function EditArtistClubBioPage() {
  const { updateArtistProfile, loading } = useUpdateArtistProfile();

  const { slug } = useParams();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const club = useClubContext();

  const [isClubURLUnique, { loading: loadingCUU, result: resultCUU }] =
    useDebounceIsUniqueClubUrl();

  const handleOnChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    replaceNotMatching?: {
      [Symbol.replace](string: string, replaceValue: string): string;
    },
  ) => {
    update({
      [e.target.name]: replaceNotMatching
        ? e.target.value.replace(replaceNotMatching, '')
        : e.target.value,
    });
  };

  const [state, update] = useRecordState({
    username: artistData.artist.username,
    name: artistData.artist.name,
    bio: artistData.artist.bio || '',
    location: artistData.artist.location || '',
    clubUrl: club.url,
    collaborators:
      artistData.artist.collaborators?.map(({ name }) => name) || [],
    xUrl:
      retrieveSocialLink(artistData.artist.socialLinks || [], 'X')?.url ||
      '',
    instagramUrl:
      retrieveSocialLink(artistData.artist.socialLinks || [], 'Instagram')
        ?.url || '',
    tiktokUrl:
      retrieveSocialLink(artistData.artist.socialLinks || [], 'TikTok')
        ?.url || '',
  });

  const socialURLErrors = {
    instagram: handleFieldError(state.instagramUrl, {
      keyName: 'Instagram URL',
      pattern: {
        value: Patterns.InstagramURL,
        message: 'Enter a valid Instagram URL',
      },
    }),
    x: handleFieldError(state.xUrl, {
      keyName: 'X URL',
      pattern: {
        value: Patterns.XURL,
        message: 'Enter a valid X URL',
      },
    }),
    tiktok: handleFieldError(state.tiktokUrl, {
      keyName: 'TikTok URL',
      pattern: {
        value: Patterns.TikTokURL,
        message: 'Enter a valid TikTok URL',
      },
    }),
  };

  const clubUrlError =
    !resultCUU && club.url !== state.clubUrl
      ? 'The club URL you have entered is already taken'
      : handleFieldError(state.clubUrl, {
          keyName: 'Club URL',
        });

  const navigate = useNavigateWithPreviousLocation(previousLocation);

  return (
    <VStack
      as='form'
      h='100%'
      onSubmit={async (e) => {
        e.preventDefault();

        const socialLinks = parseSocialLinks(state);

        const collaborators = state.collaborators.filter(
          (item) => item.length !== 0,
        );

        await updateArtistProfile({
          name: state.name,
          username: state.username,
          bio: state.bio || '',
          location: state.location || '',
          url: state.clubUrl,
          socialLinks: socialLinks,
          collaborators: collaborators,
        }).then(() => {
          navigate(
            makePath([
              Paths.clubs,
              slug || '',
              'edit',
              Paths.musicAndLinks,
            ]),
          );
        });
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
            value={state.name}
            onChange={handleOnChange}
            name='name'
            label='Artist Name'
            placeholder='name'
            minLength={FieldLengths.displayName.min}
            maxLength={FieldLengths.displayName.max}
          />
          {/*<InputTextField*/}
          {/*  value={state.username}*/}
          {/*  onChange={(e) => handleOnChange(e, /[^\w]/gm)}*/}
          {/*  name='username'*/}
          {/*  label='Username'*/}
          {/*  placeholder='username'*/}
          {/*  errorText={usernameError}*/}
          {/*  leftElement={*/}
          {/*    <Box color='white700' pr='4px'>*/}
          {/*      @*/}
          {/*    </Box>*/}
          {/*  }*/}
          {/*  rightElement={<InputLoadingIndicator loading={loadingCUU} />}*/}
          {/*/>*/}
          <InputTextField
            name='clubUrl'
            label='Custom URL'
            onChange={async (e) => {
              handleOnChange(e, /[^[a-zA-Z]+/gm);
              await isClubURLUnique(e.target.value, club.id);
            }}
            maxLength={FieldLengths.url.max}
            tooltip='A custom URL to share with your fans.'
            value={state.clubUrl}
            leftElement={
              <Box w={204} color='white700'>
                https://holdrclub.com/clubs/
              </Box>
            }
            rightElement={<InputLoadingIndicator loading={loadingCUU} />}
            errorText={clubUrlError}
          />
          <TextareaField
            id='bio'
            name='bio'
            label='About'
            value={state.bio}
            onChange={handleOnChange}
            placeholder='Let people know a little about yourself and your musical interests.'
            maxLength={FieldLengths.bio.max}
          />
          <InputTextField
            value={state.location}
            onChange={handleOnChange}
            name='location'
            label='Based In'
            placeholder='Enter your location'
            maxLength={FieldLengths.location.max}
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
          {state.collaborators.length > 0 && (
            <FlatList
              gap={4}
              direction='vertical'
              data={state.collaborators}
              renderItem={(value, idx) => {
                const textError = handleFieldError(
                  state.collaborators[idx],
                  {
                    keyName: 'Collaborator',
                    min: {
                      length: FieldLengths.collaborator.min,
                      message: "Enter the collaborator's name",
                    },
                  },
                );
                return (
                  <InputTextField
                    name='collaborator'
                    value={value}
                    minLength={FieldLengths.collaborator.min}
                    maxLength={FieldLengths.collaborator.max}
                    onChange={(e) =>
                      update({
                        collaborators: replaceInArray(
                          state.collaborators,
                          e.target.value,
                          idx,
                        ),
                      })
                    }
                    errorText={textError}
                    rightElement={
                      <CloseButton
                        onClick={() =>
                          update({
                            collaborators: removeFromArray(
                              state.collaborators,
                              (_, _idx) => _idx !== idx,
                            ),
                          })
                        }
                        type='button'
                        css={{
                          width: '1rem !important',
                          height: '1rem !important',
                        }}
                        size='sm'
                        colorTheme='white700'
                      />
                    }
                  />
                );
              }}
              keyExtractor={(_, idx) => `announcement-${idx}`}
            />
          )}
          {state.collaborators.length <= 5 && (
            <Button
              type='button'
              onClick={() =>
                update({ collaborators: [...state.collaborators, ''] })
              }
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
            name='instagramUrl'
            label='Instagram URL'
            tooltip='Enter your Instagram URL to allow other users to connect with you.'
            placeholder='Enter your Instgram link'
            value={state.instagramUrl}
            onChange={handleOnChange}
            errorText={socialURLErrors.instagram}
          />
          <InputTextField
            name='tiktokUrl'
            label='TikTok URL'
            tooltip='Enter your TikTok URL to allow other users to connect with you.'
            placeholder='Enter your TikTok link'
            value={state.tiktokUrl}
            onChange={handleOnChange}
            errorText={socialURLErrors.tiktok}
          />
          <InputTextField
            name='xUrl'
            label='X URL'
            tooltip='Enter your X URL to allow other users to connect with you.'
            placeholder='Enter your X link'
            value={state.xUrl}
            onChange={handleOnChange}
            errorText={socialURLErrors.x}
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
          Close
        </Button>
        <Button
          disabled={
            missingField({ username: state.username }) ||
            state.collaborators.reduce(
              (acc, item) => item.length < 3 || acc,
              false,
            )
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
