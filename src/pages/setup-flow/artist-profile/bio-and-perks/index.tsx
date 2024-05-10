import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  HStack,
  mergeStyles,
  Skeleton,
  Textarea,
  useGeneralContext,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  arrayFrom,
  customInputStyles,
  makePath,
  Paths,
  textAreaClassName,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import {
  IClub,
  useGetClubPerks,
  usePresetPerks,
  useUpdateBioAndPerks,
} from '../../../../features';
import { ChangeEvent, Fragment, useEffect } from 'react';

interface PerkOptionProps {
  isSelected: boolean;
  onSelect: (value: number) => void;
  label: string;
  id: number;
}

function PerkOption({ isSelected, onSelect, label, id }: PerkOptionProps) {
  return (
    <Box
      role='checkbox'
      onClick={() => onSelect(id)}
      className='perk-option'
      fontSize={1}
      px={2}
      py={1}
      color={isSelected ? '#30304b' : 'purple100'}
      borderColor={isSelected ? '#30304b' : 'purple100'}
      border={1}
      radius='full'
      bgColor={isSelected ? 'purple100' : '#30304b'}
    >
      {label}
    </Box>
  );
}

interface IAboutMeState {
  bio: string;
  perks: number[];
}

function PerksLoading() {
  return (
    <HStack gap={2} wrap='wrap' css={{ opacity: 0.25 }}>
      {arrayFrom(9).map((idx) => (
        <Box radius='full' key={idx} overflow='hidden'>
          <Skeleton theme='dark' h='28px' w='100px' />
        </Box>
      ))}
    </HStack>
  );
}

function PerkList({
  selected,
  onSelect,
}: {
  selected: number[];
  onSelect: (next: Partial<IAboutMeState>) => void;
}) {
  const { loading, data, error } = usePresetPerks();

  if (error) {
    // should we show the error?
  }

  if (loading) {
    return <PerksLoading />;
  }

  return (
    <Fragment>
      {data && (
        <HStack gap={2} wrap='wrap'>
          {data.presetPerks.map(({ id, label }) => {
            const isSelected =
              selected.findIndex((item) => item === id) > -1;

            const insert = (value: number) =>
              onSelect({ perks: [...selected, value] });

            const remove = (value: number) =>
              onSelect({
                perks: selected.filter((item) => item !== value),
              });

            return (
              <PerkOption
                isSelected={isSelected}
                onSelect={(value) =>
                  isSelected ? remove(value) : insert(value)
                }
                key={id}
                id={id}
                label={label}
              />
            );
          })}
        </HStack>
      )}
    </Fragment>
  );
}

function BioAndPerksView() {
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

  if (loadingPerks) {
    return <PerksLoading />;
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
        <PerkList selected={state.perks} onSelect={update} />
      </VStack>
      <HStack
        justify='flex-end'
        position='absolute'
        b='1.5rem'
        l='3rem'
        r='3rem'
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
