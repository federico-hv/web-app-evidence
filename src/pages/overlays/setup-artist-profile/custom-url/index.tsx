import { useNavigate } from 'react-router-dom';
import { Box, Button, HStack, VStack } from '@holdr-ui/react';
import {
  FieldLengths,
  handleFieldError,
  InputLoadingIndicator,
  InputTextField,
  makePath,
  Paths,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import { ChangeEvent, useState } from 'react';
import { useClubContext, useUpdateClub } from '../../../../features';
import { useDebounceIsUniqueClubUrl } from '../../../../features';
import { SectionHeader } from '../ui';

function CustomURLView() {
  const previousLocation = usePreviousLocation('/');

  const [checkIsUnique, { loading, result }] =
    useDebounceIsUniqueClubUrl();

  const { updateClub, loading: loadingMutation } = useUpdateClub();

  const club = useClubContext();

  const [url, setURL] = useState<string>(club.url ?? '');

  const navigate = useNavigate();

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^\w]/gm, '');

    setURL(value);

    checkIsUnique(value, club.id);
  };

  const clubUrlError =
    !result && club.url !== url
      ? 'The club URL you have entered is already taken'
      : handleFieldError(url, {
          keyName: 'Club URL',
        });

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <SectionHeader
          title='Custom URL'
          subtitle='Create your own custom URL to easily share with your fans'
        />
        <InputTextField
          name='url'
          label='Custom URL'
          onChange={handleOnChange}
          maxLength={FieldLengths.url.max}
          tooltip='A custom URL to share with your fans.'
          value={url}
          leftElement={
            <Box color='white700' css={{ whiteSpace: 'nowrap' }}>
              https://holdrclub.com/clubs/
            </Box>
          }
          rightElement={<InputLoadingIndicator loading={loading} />}
          errorText={clubUrlError}
        />
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
          onClick={() =>
            navigate(
              makePath([
                Paths.setupArtists,
                Paths.setupArtist.socialMediaAccounts,
              ]),
              {
                state: {
                  previousLocation,
                },
              },
            )
          }
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Go back
        </Button>
        <Button
          isLoading={loadingMutation}
          loadingText='Continue'
          disabled={!result}
          onClick={async () => {
            // TODO: Check uniqueness here as well

            if (url.length > 0) {
              await updateClub({
                url: url,
              });
            }
            navigate(
              makePath([
                Paths.setupArtists,
                Paths.setupArtist.connectOnboarding,
              ]),
              {
                state: {
                  previousLocation,
                },
              },
            );
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
CustomURLView.displayName = 'CustomURLView';

export default CustomURLView;
