import {
  Box,
  Button,
  Center,
  CloseButton,
  HStack,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectItemList,
  SelectTrigger,
  Text,
  VStack,
} from '@holdr-ui/react';
import {
  customInputStyles,
  ExternalLinkTypeEnum,
  IAnnouncement,
  IExternalLink,
  InformationTooltip,
  makeButtonLarger,
  MusicReleasePreview,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  voidFn,
} from '../../../../shared';
import {
  IMusicRelease,
  SearchSpotifyTrack,
  useClubContext,
  useSuspenseGetArtistDetails,
} from '../../../../features';
import { FlatList } from '../../../../tmp/flat-list';
import InputTextField from '../../../../shared/components/text-field';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';

export const Maximum = {
  NumberOfArtistPicks: 3,
  NumberOfAnnouncements: 3,
  NumberOfMerchLinks: 2,
  NumberOfEventLinks: 2,
  NumberOfOtherLinks: 2,
  NumberOfCollaborators: 5,
};

function TextAndOptionInputGroupWithClose({
  textField,
  selectField,
  onRemove,
}: {
  onRemove?: VoidFunction;
  textField: {
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  };
  selectField: {
    value?: string;
    onValueChange?: (e: string) => void;
  };
}) {
  return (
    <HStack>
      <Select
        value={selectField.value}
        onValueChange={selectField.onValueChange}
      >
        <SelectTrigger
          radius={0}
          placeholder='Type'
          css={{
            whiteSpace: 'nowrap',
            border: '1px solid rgba(152, 152, 255, 0.10)',
            background: 'rgba(152, 152, 255, 0.1)',

            borderTopRightRadius: '$0',
            borderBottomRightRadius: '$0',
            borderTopLeftRadius: '$1',
            borderBottomLeftRadius: '$1',
          }}
        />
        <SelectContent zIndex={20} sticky='always'>
          <SelectItemList
            _active={{ color: '$purple200' }}
            _hover={{ background: 'rgba(14, 14, 27, 0.50)' }}
            _highlighted={{ background: 'rgba(14, 14, 27, 0.50)' }}
            // w={180}
            divider={
              <Box
                h='1px'
                w='100%'
                css={{
                  background: 'rgba(152, 152, 255, 0.1)',
                }}
              />
            }
            position='relative'
            css={{
              boxShadow: '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
              background: 'rgba(152, 152, 255, 0.1)',
              backdropFilter: 'blur(40px)',
              // borderBottomLeftRadius: '$2',
              // borderBottomRightRadius: '$2',
              border: '1px solid rgba(152, 152, 255, 0.1)',
              borderTop: 'none',
            }}
          >
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Event}
              label='Event'
            />
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Merch}
              label='Merch'
            />
            <SelectItem
              py={2}
              radius={1}
              value={ExternalLinkTypeEnum.Other}
              label='Other'
            />
          </SelectItemList>
        </SelectContent>
      </Select>
      <HStack position='relative' w='100%' gap={2} items='center'>
        <Input
          value={textField.value}
          onChange={textField.onChange}
          color='white500'
          className={customInputStyles()}
          css={{
            paddingInlineEnd: '$10',
            borderTopRightRadius: '$1',
            borderBottomRightRadius: '$1',
            borderTopLeftRadius: '$0',
            borderBottomLeftRadius: '$0',
          }}
        />
        <CloseButton
          onClick={onRemove}
          type='button'
          css={{
            position: 'absolute',
            right: '$3',
            width: '1rem !important',
          }}
          size='sm'
          className={makeButtonLarger('1rem')}
          colorTheme='white700'
        />
      </HStack>
    </HStack>
  );
}

function InputTextFieldWithClose({
  value,
  onChange,
  onRemove,
}: {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemove?: VoidFunction;
}) {
  return (
    <HStack position='relative' w='100%' items='center'>
      <InputTextField
        name=''
        value={value}
        onChange={onChange}
        placeholder='Add announcement'
        css={{ paddingInlineEnd: '$10' }}
      />
      <Center position='absolute' t={0} b={0} r={0} pr={3}>
        <CloseButton
          onClick={onRemove}
          type='button'
          css={{ width: '1rem !important' }}
          size='sm'
          className={makeButtonLarger('1rem')}
          colorTheme='white700'
        />
      </Center>
    </HStack>
  );
}

type ItemFn<T> = (item: T, idx?: number) => void;

function useArrayState<T>(
  initialState = [] as T[],
): [
  T[],
  ItemFn<T>,
  (idx: number, item: T) => void,
  (filter: ItemFn<T>) => void,
  Dispatch<SetStateAction<T[]>>,
] {
  const [state, set] = useState<T[]>(initialState);

  const push = (item: T) => set((prev) => [...prev, item]);
  const remove = (filter: (item: T, idx: number) => void) =>
    set((prev) => prev.filter(filter));
  const replace = (idx: number, item: T) =>
    set((prev) => [...prev.slice(0, idx), item, ...prev.slice(idx + 1)]);

  return [state, push, replace, remove, set];
}

function EditArtistClubMusicAndLinksPage() {
  const club = useClubContext();

  const { data } = useSuspenseGetArtistDetails(club.artist.id);

  const [
    announcements,
    pushAnnouncement,
    replaceAnnouncement,
    removeAnnouncement,
  ] = useArrayState<IAnnouncement>(data.announcements);

  const [releases, pushMusicRelease, , removeMusicRelease] =
    useArrayState<IMusicRelease>(data.artistPicks);

  const [
    externalLinks,
    pushExternalLink,
    replaceExternalLink,
    removeExternalLink,
  ] = useArrayState<IExternalLink>(data.externalArtistLinks);

  const filterLink = (type: ExternalLinkTypeEnum) =>
    externalLinks.filter((item) => item.type === type);

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
            {"Artist's Picks"}
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Choose the songs you want to display on your club page
          </TextGroupSubheading>
        </TextGroup>

        <VStack gap={2}>
          <HStack color='white700' gap={2} items='center'>
            <Text weight={500} size={2} as='label'>
              Artist Pick
            </Text>
            <InformationTooltip
              side='right'
              align='start'
              container={
                document.getElementById('page-dialog-container') ||
                document.body
              }
              description='Search for your songs on Spotify that you want to highlight.'
            />
          </HStack>
          {releases.length < 3 && (
            <SearchSpotifyTrack
              onSelect={(item) =>
                pushMusicRelease({
                  id: -1,
                  name: item.name,
                  coverImage: item.images[0].url,
                  artists: item.artists.join(', '),
                  externalIds: [
                    {
                      id: -1,
                      externalId: item.id,
                      provider: 'Spotify',
                      externalUrl: item.url,
                    },
                  ],
                })
              }
            />
          )}
          <FlatList
            gap={2}
            wrap='wrap'
            data={releases}
            renderItem={(item, idx) => (
              <MusicReleasePreview
                onClick={() =>
                  removeMusicRelease((_, _idx) => _idx !== idx)
                }
                loading={false}
                image={item.coverImage}
                name={item.name}
                artists={item.artists}
                w={240}
              />
            )}
            keyExtractor={(item) => item.name}
          />
        </VStack>
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Announcements
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter any announcements you want to make to your fans
          </TextGroupSubheading>
        </TextGroup>
        {announcements.length > 0 && (
          <FlatList
            gap={4}
            direction='vertical'
            data={announcements}
            renderItem={(item, idx) => (
              <InputTextFieldWithClose
                value={item.description}
                onRemove={() =>
                  removeAnnouncement((_, _idx) => _idx !== idx)
                }
                onChange={(e) =>
                  replaceAnnouncement(idx, {
                    ...item,
                    description: e.target.value,
                  })
                }
              />
            )}
            keyExtractor={(item, idx) => `announcement-${idx}`}
          />
        )}
        {announcements.length < 3 && (
          <Button
            type='button'
            onClick={() =>
              pushAnnouncement({
                id: -1,
                description: '',
                createdAt: new Date(),
              })
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
            Add announcement
          </Button>
        )}
      </VStack>

      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading as='h2' size={3} weight={500}>
            Links
          </TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Enter any links you want to make your fans to have access to
          </TextGroupSubheading>
          <HStack gap={2}>
            {filterLink(ExternalLinkTypeEnum.Other).length >
              Maximum.NumberOfOtherLinks && (
              <TextGroupSubheading size={1} color='danger300'>
                You cannot have more than {Maximum.NumberOfOtherLinks}{' '}
                {ExternalLinkTypeEnum.Other.toLowerCase()} links.
              </TextGroupSubheading>
            )}
            {filterLink(ExternalLinkTypeEnum.Merch).length >
              Maximum.NumberOfOtherLinks && (
              <TextGroupSubheading size={1} color='danger300'>
                You cannot have more than {Maximum.NumberOfMerchLinks}{' '}
                {ExternalLinkTypeEnum.Merch.toLowerCase()} links.
              </TextGroupSubheading>
            )}
            {filterLink(ExternalLinkTypeEnum.Event).length >
              Maximum.NumberOfEventLinks && (
              <TextGroupSubheading size={1} color='danger300'>
                You cannot have more than {Maximum.NumberOfEventLinks}{' '}
                {ExternalLinkTypeEnum.Event.toLowerCase()} links.
              </TextGroupSubheading>
            )}
          </HStack>
        </TextGroup>

        <FlatList
          gap={4}
          direction='vertical'
          data={externalLinks}
          renderItem={(item, idx) => (
            <TextAndOptionInputGroupWithClose
              onRemove={() =>
                removeExternalLink((_, _idx) => idx !== _idx)
              }
              textField={{
                value: item.url,
                onChange: (e) =>
                  replaceExternalLink(idx, {
                    ...item,
                    url: e.target.value,
                  }),
              }}
              selectField={{
                value: item.type,
                onValueChange: (value) =>
                  replaceExternalLink(idx, {
                    ...item,
                    type: value as ExternalLinkTypeEnum,
                  }),
              }}
            />
          )}
          keyExtractor={(item, idx) => `ext-link-${idx}`}
        />
        {filterLink(ExternalLinkTypeEnum.Event).length <=
          Maximum.NumberOfEventLinks &&
          filterLink(ExternalLinkTypeEnum.Merch).length <=
            Maximum.NumberOfMerchLinks &&
          filterLink(ExternalLinkTypeEnum.Other).length <=
            Maximum.NumberOfOtherLinks && (
            <Button
              type='button'
              onClick={() =>
                pushExternalLink({
                  id: 1,
                  url: '',
                  type: ExternalLinkTypeEnum.Other,
                })
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
              Add link
            </Button>
          )}
      </VStack>
    </VStack>
  );
}
EditArtistClubMusicAndLinksPage.displayName =
  'EditArtistClubMusicAndLinksPage';

export default EditArtistClubMusicAndLinksPage;
