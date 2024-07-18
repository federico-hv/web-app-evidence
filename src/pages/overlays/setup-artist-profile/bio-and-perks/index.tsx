import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  mergeStyles,
  Text,
  Textarea,
  useOnValueChange,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  makePath,
  Paths,
  textAreaClassName,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import {
  useClubContext,
  useCurrentArtist,
  usePerksContext,
  useSuspenseGetArtist,
  useUpdateBioAndPerks,
} from '../../../../features';
import { ChangeEvent, useState } from 'react';
import { difference, isEqual } from 'lodash';
import { SelectPredefinedPerks } from './ui';

function BioAndPerksView() {
  const currentArtist = useCurrentArtist();

  const { data: artistData } = useSuspenseGetArtist({
    id: currentArtist?.id,
  });

  const previousLocation = usePreviousLocation('/');
  const club = useClubContext();
  const { clubPerks } = usePerksContext();

  const { value: bio, handleOnValueChange } = useOnValueChange(
    artistData.artist.bio || '',
  );

  const [selectedPerks, setSelectedPerks] = useState<number[]>(
    clubPerks.map(({ id }) => id),
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
    const hasBioChanged = !isEqual(bio, artistData.artist.bio);

    const havePerksChanged =
      [
        ...difference(
          selectedPerks,
          clubPerks.map(({ id }) => id),
        ),
        ...difference(
          clubPerks.map(({ id }) => id),
          selectedPerks,
        ),
      ].length > 0;

    if (hasBioChanged || havePerksChanged) {
      console.log(selectedPerks);
      await updateBioAndPerks(club.id, {
        perks: selectedPerks,
        bio: bio,
      });
    }
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
        <Textarea
          value={bio}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            handleOnValueChange(e.target.value)
          }
          className={mergeStyles([
            textAreaClassName(),
            customInputStyles(),
          ])}
          radius={2}
          maxLines={5}
          colorTheme='white500'
          placeholder='Share your story with your fans'
          /*_placeholder={{}}*/
          /*css={{}}*/
        />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Perks</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Choose what perks you would like to offer to your fans
          </TextGroupSubheading>
        </TextGroup>

        {selectedPerks.length < 3 && (
          <Box>
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
