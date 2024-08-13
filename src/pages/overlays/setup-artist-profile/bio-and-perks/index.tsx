import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  Text,
  useOnValueChange,
  VStack,
} from '@holdr-ui/react';
import {
  FieldLengths,
  makePath,
  Paths,
  TextareaField,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import {
  useClubContext,
  useCurrentArtist,
  useSuspenseGetArtist,
  useSuspenseGetClubPerks,
  useUpdateBioAndPerks,
} from '../../../../features';
import { useState } from 'react';
import { SelectPredefinedPerks } from './ui';

function BioAndPerksView() {
  const currentArtist = useCurrentArtist();

  const { data: artistData } = useSuspenseGetArtist({
    id: currentArtist?.id,
  });

  const previousLocation = usePreviousLocation('/');
  const club = useClubContext();

  const { data: clubPerksData } = useSuspenseGetClubPerks(club.id);

  const { value: bio, handleOnValueChange } = useOnValueChange(
    artistData.artist.bio || '',
  );

  const [selectedPerks, setSelectedPerks] = useState<number[]>(
    clubPerksData.clubPerks.perks.map(({ id }) => id),
  );

  const { updateBioAndPerks, loading: loadingUpdate } =
    useUpdateBioAndPerks();

  const navigate = useNavigate();

  const previousStep = () =>
    navigate(
      makePath([Paths.setupArtists, Paths.setupArtist.uploadPhoto]),
      {
        state: {
          previousLocation,
        },
      },
    );

  const nextStep = () =>
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
    );

  const saveBioAndPerks = async () => {
    await updateBioAndPerks(club.id, {
      perks: selectedPerks,
      bio: bio,
    });
  };

  return (
    <VStack gap={9} pl={2} h='100%' overflow='auto'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>About Me</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Introduce yourself to your fans and share your music journey,
            and what inspires your artistry
          </TextGroupSubheading>
        </TextGroup>

        <TextareaField
          id='bio'
          name='bio'
          label='About'
          value={bio}
          onChange={(e) => handleOnValueChange(e.target.value)}
          placeholder='Let people know a little about yourself and your musical interests.'
          maxLength={FieldLengths.artist.bio.max}
        />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Perks</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Choose what perks you would like to offer to your fans
          </TextGroupSubheading>
        </TextGroup>

        {/** ⚠️ Disable when live auction is running*/}
        {selectedPerks.length < 3 && (
          <Box mb={4}>
            <Text size={1} color='danger200' weight={300}>
              Please select at least 3 perks
            </Text>
          </Box>
        )}

        <SelectPredefinedPerks
          values={selectedPerks}
          onChange={(next: number[]) => setSelectedPerks(next)}
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
          onClick={() => previousStep()}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '40px' }}
        >
          Go back
        </Button>
        <Button
          disabled={selectedPerks.length < 3}
          isLoading={loadingUpdate}
          loadingText={loadingUpdate ? 'Continue' : 'Continue'}
          onClick={async () => {
            await saveBioAndPerks().then(() => nextStep());
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
BioAndPerksView.displayName = 'BioAndPerksView';

export default BioAndPerksView;
