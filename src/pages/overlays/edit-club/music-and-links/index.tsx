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
  ExternalLinkTypeEnum,
  IAnnouncement,
  IExternalLink,
  InformationTooltip,
  isMatchingPattern,
  makeButtonLarger,
  makePath,
  matchesPattern,
  MusicReleasePreview,
  Paths,
  PatternErrorMessage,
  Patterns,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
  useArrayState,
  usePreviousLocation,
} from '../../../../shared';
import {
  IMusicRelease,
  SearchSpotifyTrack,
  useSaveArtistDetails,
  useSuspenseGetArtist,
  useSuspenseGetArtistDetails,
} from '../../../../features';
import { FlatList } from '../../../../tmp/flat-list';
import { useRef } from 'react';
import {
  InputGroup,
  InputGroupRightElement,
} from '../../../../tmp/input-group';
import { useNavigate, useParams } from 'react-router-dom';
import { omit } from 'lodash';

export const Maximum = {
  NumberOfArtistPicks: 3,
  NumberOfAnnouncements: 3,
  NumberOfMerchLinks: 2,
  NumberOfEventLinks: 2,
  NumberOfOtherLinks: 2,
  NumberOfCollaborators: 5,
};

function EditArtistClubMusicAndLinksPage() {
  const ref = useRef<HTMLDivElement>();

  const { slug } = useParams();

  const navigate = useNavigate();

  const previousLocation = usePreviousLocation(
    makePath([Paths.clubs, slug || '']),
  );

  const { data: artistData } = useSuspenseGetArtist({
    slug,
  });

  const { saveArtistDetails, loading } = useSaveArtistDetails();

  const nextStep = () => {
    navigate(makePath([Paths.clubs, slug || '', 'edit', Paths.auction]), {
      state: {
        previousLocation,
      },
    });
  };

  const { data } = useSuspenseGetArtistDetails(artistData.artist.id);

  const [
    announcements,
    pushAnnouncement,
    replaceAnnouncement,
    removeAnnouncement,
  ] = useArrayState<IAnnouncement>(data.announcements);

  const [releases, pushMusicRelease, , removeMusicRelease] =
    useArrayState<IMusicRelease>(
      data.artistPicks.map((release) => ({
        ...omit(release, '__typename'),
        externalIds: release.externalIds.map((item) => ({
          ...omit(item, '__typename'),
        })),
      })),
    );

  const [
    externalLinks,
    pushExternalLink,
    replaceExternalLink,
    removeExternalLink,
  ] = useArrayState<IExternalLink>(data.externalArtistLinks);

  const filterLink = (type: ExternalLinkTypeEnum) =>
    externalLinks.filter((item) => item.type === type);

  const scrollToBottom = () => {
    /** Missing solution*/
  };

  return (
    <VStack role='form' h='100%'>
      <VStack
        overflowY='auto'
        pr={4}
        className='thin-scrollbar'
        gap={4}
        flex={1}
        id='music-container'
        innerRef={ref}
        h='100%'
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
                onSelect={(item, clearValue) => {
                  console.log({
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
                  });

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
                  });

                  if (clearValue) clearValue();
                }}
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
                <InputGroup>
                  <Input
                    placeholder='Add announcement'
                    variant='unstyled'
                    maxLength={75}
                    value={item.description}
                    onChange={(e) =>
                      replaceAnnouncement(idx, {
                        ...item,
                        description: e.target.value,
                      })
                    }
                    color='white500'
                  />
                  <InputGroupRightElement pl={4}>
                    <Center position='absolute' t={0} b={0} r={0} pr={3}>
                      <CloseButton
                        onClick={() =>
                          removeAnnouncement((_, _idx) => _idx !== idx)
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
              keyExtractor={(item, idx) => `announcement-${idx}`}
            />
          )}
          {announcements.length < Maximum.NumberOfAnnouncements && (
            <Button
              type='button'
              onClick={() => {
                pushAnnouncement({
                  id: -1,
                  description: '',
                  createdAt: new Date(),
                });
                scrollToBottom();
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

          {externalLinks.length > 0 && (
            <FlatList
              gap={4}
              direction='vertical'
              data={externalLinks}
              renderItem={(item, idx) => {
                const errorText = isMatchingPattern(
                  item.url,
                  Patterns.URL,
                  PatternErrorMessage.invalid('URL'),
                );

                return (
                  <VStack>
                    <VStack>
                      <Select
                        value={item.type}
                        onValueChange={(value) =>
                          replaceExternalLink(idx, {
                            ...item,
                            type: value as ExternalLinkTypeEnum,
                          })
                        }
                      >
                        <SelectTrigger
                          radius={0}
                          placeholder='Type'
                          css={{
                            whiteSpace: 'nowrap',
                            borderLeftWidth: '1px',
                            borderRightWidth: '1px',
                            borderTopWidth: '1px',
                            borderColor: 'rgba(152, 152, 255, 0.10)',
                            background: 'rgba(152, 152, 255, 0.15)',

                            borderTopRightRadius: '$1',
                            borderBottomRightRadius: '$0',
                            borderTopLeftRadius: '$1',
                            borderBottomLeftRadius: '$0',
                          }}
                        />
                        <SelectContent zIndex={20} sticky='always'>
                          <SelectItemList
                            _active={{ color: '$purple200' }}
                            _hover={{
                              background: 'rgba(14, 14, 27, 0.50)',
                            }}
                            _highlighted={{
                              background: 'rgba(14, 14, 27, 0.50)',
                            }}
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
                              boxShadow:
                                '0px 4px 12px 0px rgba(14, 14, 27, 0.08)',
                              background: 'rgba(152, 152, 255, 0.1)',
                              backdropFilter: 'blur(40px)',
                              border: '1px solid rgba(152, 152, 255, 0.1)',
                              borderTop: 'none',
                            }}
                          >
                            <SelectItem
                              py={2}
                              radius={1}
                              value={ExternalLinkTypeEnum.Event}
                              label='Upcoming shows'
                            />
                            <SelectItem
                              py={2}
                              radius={1}
                              value={ExternalLinkTypeEnum.Merch}
                              label='Merchandise'
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
                      <InputGroup
                        px={4}
                        borderColor='transparent'
                        bgColor='transparent'
                        css={{
                          borderLeftWidth: '1px',
                          borderRightWidth: '1px',
                          borderTopWidth: '1px',
                          borderColor: 'rgba(152, 152, 255, 0.10)',
                          backgroundColor:
                            'rgba(152, 152, 255, 0.15) !important',
                          '&:focus': {
                            border:
                              '1px solid rgba(152, 152, 255, 1) !important',
                            backgroundColor: 'transparent',
                          },
                          borderTopRightRadius: '0',
                          borderBottomRightRadius: '$1',
                          borderTopLeftRadius: '$0',
                          borderBottomLeftRadius: '$1',
                        }}
                      >
                        <Input
                          variant='unstyled'
                          placeholder='Paste link'
                          value={item.url}
                          onChange={(e) =>
                            replaceExternalLink(idx, {
                              ...item,
                              url: e.target.value,
                            })
                          }
                          color='white500'
                        />
                        <InputGroupRightElement pl={4}>
                          <Center>
                            <CloseButton
                              onClick={() =>
                                removeExternalLink(
                                  (_, _idx) => _idx !== idx,
                                )
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
                    </VStack>
                    {errorText && errorText.length > 0 && (
                      <Text
                        size={1}
                        color='danger300'
                        css={{ marginTop: '$1' }}
                      >
                        {errorText}
                      </Text>
                    )}
                  </VStack>
                );
              }}
              keyExtractor={(item, idx) => `ext-link-${idx}`}
            />
          )}
          {filterLink(ExternalLinkTypeEnum.Event).length <=
            Maximum.NumberOfEventLinks &&
            filterLink(ExternalLinkTypeEnum.Merch).length <=
              Maximum.NumberOfMerchLinks &&
            filterLink(ExternalLinkTypeEnum.Other).length <=
              Maximum.NumberOfOtherLinks && (
              <Button
                type='button'
                onClick={() => {
                  pushExternalLink({
                    id: 1,
                    url: '',
                    type: ExternalLinkTypeEnum.Other,
                  });
                  scrollToBottom();
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
                Add link
              </Button>
            )}
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
          variant='ghost'
          radius={1}
          type='button'
          colorTheme='purple200'
          css={{ px: '28px' }}
          onClick={() => navigate(previousLocation)}
        >
          Cancel
        </Button>
        <Button
          isLoading={loading}
          disabled={
            announcements.length > Maximum.NumberOfAnnouncements ||
            filterLink(ExternalLinkTypeEnum.Event).length >
              Maximum.NumberOfEventLinks ||
            filterLink(ExternalLinkTypeEnum.Merch).length >
              Maximum.NumberOfMerchLinks ||
            filterLink(ExternalLinkTypeEnum.Other).length >
              Maximum.NumberOfOtherLinks ||
            releases.length > Maximum.NumberOfArtistPicks ||
            announcements.reduce(
              (acc, next) => acc || next.description.length === 0,
              false,
            ) ||
            externalLinks.reduce(
              (acc, next) =>
                acc ||
                next.url.length === 0 ||
                !matchesPattern(next.url, Patterns.URL),
              false,
            )
          }
          type='button'
          loadingText='Continue'
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
          onClick={async () => {
            await saveArtistDetails({
              announcements: announcements.map((item) => item.description),
              releases: releases.map((release) => ({
                ...omit(release, 'id'),
                externalIds: release.externalIds.map((item) => ({
                  ...omit(item, 'id'),
                })),
              })),
              links: externalLinks.map((item) => ({
                type: item.type,
                url: item.url,
              })),
            }).then(() => nextStep());
          }}
        >
          Continue
        </Button>
      </HStack>
    </VStack>
  );
}
EditArtistClubMusicAndLinksPage.displayName =
  'EditArtistClubMusicAndLinksPage';

export default EditArtistClubMusicAndLinksPage;
