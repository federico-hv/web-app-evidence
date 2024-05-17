import { useNavigate } from 'react-router-dom';
import {
  Button,
  HStack,
  mergeStyles,
  Textarea,
  useGeneralContext,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  Head,
  makePath,
  Paths,
  textAreaClassName,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  usePreviousLocation,
} from '../../../../shared';
import {
  IClub,
  useGetClubPerks,
  useUpdateBioAndPerks,
} from '../../../../features';
import { ChangeEvent, useEffect } from 'react';
import { IAboutMeState } from './shared';
import { PerkList, PerksListLoader } from './ui';

function BioAndPerksView() {
  const previousLocation = usePreviousLocation('/');
  const { state: club } = useGeneralContext<IClub>();

  const { updateBioAndPerks, loading: loadingUpdate } =
    useUpdateBioAndPerks();

  const {
    loading: loadingPerks,
    data,
    error: errorPerks,
  } = useGetClubPerks(club.id);

  const [state, update] = useRecordState<IAboutMeState>({
    bio: club.artist.bio,
    perks: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      update({ perks: data.clubPerks.map((item) => item.id) });
    }
  }, [data]);

  if (errorPerks) {
    // show error message
  }

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
          value={state.bio}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            update({ bio: e.target.value })
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

        {loadingPerks ? (
          <PerksListLoader />
        ) : (
          <PerkList selected={state.perks} onSelect={update} />
        )}
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
                Paths.setupArtist.uploadPhoto,
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
          isLoading={loadingUpdate}
          loadingText={loadingUpdate ? 'Continue' : 'Continue'}
          onClick={async () => {
            await updateBioAndPerks(state).then(() =>
              navigate(
                makePath([
                  Paths.setupProfile,
                  Paths.artist,
                  Paths.setupArtist.socialMediaAccounts,
                ]),
                {
                  state: {
                    previousLocation,
                  },
                },
              ),
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
BioAndPerksView.displayName = 'BioAndPerksView';

export default BioAndPerksView;
