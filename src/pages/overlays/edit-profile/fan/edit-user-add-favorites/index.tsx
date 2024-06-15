import { useNavigate, useParams } from 'react-router-dom';
import { makePath, usePreviousLocation } from '../../../../../shared';
import {
  IProfile,
  SearchSpotifyArtist,
  SearchSpotifyTrack,
  useRemoveFavoriteArtist,
  useRemoveFavoriteSong,
  useSaveFavoriteArtist,
  useSaveFavoriteSong,
} from '../../../../../features';
import {
  Box,
  Button,
  CloseButton,
  hexToRGB,
  HStack,
  Icon,
  Image,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { FlatList } from '../../../../../tmp/flat-list';

function EditUserAddFavoritesPage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const { removeFavoriteSong, loading: loadingRFS } =
    useRemoveFavoriteSong();
  const { saveFavoriteSong, loading: loadingSFS } = useSaveFavoriteSong();

  const { saveFavoriteArtist, loading: loadingSFA } =
    useSaveFavoriteArtist();
  const { removeFavoriteArtist, loading: loadingRFA } =
    useRemoveFavoriteArtist();

  const { state: profile } = useGeneralContext<IProfile>();

  const nextStep = () => {
    navigate(previousLocation);
  };

  const previousStep = () => {
    navigate(makePath([username || '', 'edit', 'profile']), {
      state: {
        previousLocation,
      },
    });
  };

  return (
    <VStack h='calc(100%)'>
      <VStack
        overflow='auto'
        className='thin-scrollbar'
        h='100%'
        gap={6}
        pr='10px'
      >
        <VStack gap={2}>
          <HStack color='white700' gap={1} items='center'>
            <Text size={1} as='label'>
              Favourite Track
            </Text>
            <Tooltip>
              <TooltipTrigger
                display='flex'
                css={{ alignItems: 'center' }}
              >
                <Icon name='information-outline' />
              </TooltipTrigger>

              <TooltipContent
                arrowWidth={0}
                arrowHeight={0}
                maxWidth={250}
                sideOffset={-16}
                side='right'
                align='start'
                fontSize={1}
                container={
                  document.getElementById('page-dialog-container') ||
                  document.body
                }
                bgColor='#202032'
                border={1}
                borderColor={hexToRGB('#9898FF', 0.25)}
              >
                Search for your favorite artists on Spotify and share it on
                you Bio page for others to see.
              </TooltipContent>
            </Tooltip>
          </HStack>
          {profile.favoriteSong ? (
            <HStack
              p={2}
              gap={4}
              justify='space-between'
              radius={1}
              w='250px'
              items='center'
              bgColor='rgba(152, 152, 255, 0.15)'
            >
              <HStack items='center' gap={2}>
                <Box shrink={0}>
                  <Image
                    radius={1}
                    src={profile.favoriteSong.coverImage}
                    css={{
                      size: '40px',
                    }}
                  />
                </Box>

                <VStack>
                  <Text weight={500} noOfLines={1}>
                    {profile.favoriteSong.name}
                  </Text>
                  <Text
                    size={1}
                    weight={500}
                    noOfLines={1}
                    color='white700'
                  >
                    {profile.favoriteSong.artists}
                  </Text>
                </VStack>
              </HStack>
              <Box>
                <CloseButton
                  loadingText=''
                  isLoading={loadingRFS}
                  onClick={async () => {
                    await removeFavoriteSong();
                  }}
                  size='sm'
                  colorTheme='white500'
                />
              </Box>
            </HStack>
          ) : (
            <SearchSpotifyTrack
              onSelect={async (item) => {
                await saveFavoriteSong({
                  name: item.name,
                  coverImage: item.images[0].url,
                  artists: item.artists.join(', '),
                  externalIds: [
                    {
                      externalId: item.id,
                      provider: 'Spotify',
                      externalUrl: item.url,
                    },
                  ],
                });
              }}
            />
          )}
        </VStack>

        <VStack gap={2}>
          <HStack color='white700' gap={1} items='center'>
            <Text size={1} as='label'>
              Favourite Musicians
            </Text>
            <Tooltip>
              <TooltipTrigger
                display='flex'
                css={{ alignItems: 'center' }}
              >
                <Icon name='information-outline' />
              </TooltipTrigger>

              <TooltipContent
                arrowWidth={0}
                arrowHeight={0}
                maxWidth={250}
                sideOffset={-16}
                side='right'
                align='start'
                fontSize={1}
                container={
                  document.getElementById('page-dialog-container') ||
                  document.body
                }
                bgColor='#202032'
                border={1}
                borderColor={hexToRGB('#9898FF', 0.25)}
              >
                Search for your favorite artists on Spotify and share it on
                you Bio page for others to see.
              </TooltipContent>
            </Tooltip>
          </HStack>
          <VStack gap={3}>
            {profile.favoriteArtists.length < 5 && (
              <SearchSpotifyArtist
                disabled={profile.favoriteArtists.length >= 5}
                onSelect={async (item, clearValue) => {
                  await saveFavoriteArtist({
                    name: item.name,
                    image: item.images[0].url,
                    externalIds: [
                      {
                        externalId: item.id,
                        externalUrl: item.url,
                        provider: 'Spotify',
                      },
                    ],
                  });
                  if (clearValue) clearValue();
                }}
              />
            )}
            {profile.favoriteArtists &&
              profile.favoriteArtists.length > 0 && (
                <FlatList
                  gap={2}
                  wrap='wrap'
                  data={profile.favoriteArtists}
                  renderItem={(item) => (
                    <HStack
                      p={2}
                      gap={4}
                      justify='space-between'
                      radius={1}
                      w='244px'
                      items='center'
                      bgColor='rgba(152, 152, 255, 0.15)'
                    >
                      <HStack items='center' gap={2}>
                        <Box shrink={0}>
                          <Image
                            radius={1}
                            src={item.image}
                            alt={item.name}
                            css={{
                              size: '40px',
                            }}
                          />
                        </Box>
                        <Text weight={500} noOfLines={1}>
                          {item.name}
                        </Text>
                      </HStack>
                      <Box>
                        <CloseButton
                          onClick={async () => {
                            await removeFavoriteArtist(item.id);
                          }}
                          size='sm'
                          colorTheme='white500'
                        />
                      </Box>
                    </HStack>
                  )}
                  keyExtractor={(item) => item.externalIds[0].externalId}
                />
              )}
          </VStack>
        </VStack>
      </VStack>
      <HStack gap={2} justify='flex-end' mt={6} pr='10px'>
        <Button
          onClick={previousStep}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Back
        </Button>
        <Button
          onClick={nextStep}
          radius={1}
          colorTheme='purple500'
          css={{ px: '28px' }}
        >
          Done
        </Button>
      </HStack>
    </VStack>
  );
}
EditUserAddFavoritesPage.displayName = 'EditUserAddFavoritesPage';

export default EditUserAddFavoritesPage;
