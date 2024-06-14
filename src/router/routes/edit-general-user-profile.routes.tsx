import { Route, Routes } from 'react-router';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  CloseButton,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  hexToRGB,
  HStack,
  Icon,
  Image,
  mergeStyles,
  StackDivider,
  Text,
  Textarea,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  useDisclosure,
  useGeneralContext,
  useRecordState,
  VStack,
} from '@holdr-ui/react';
import {
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  customInputStyles,
  GQLRenderer,
  ImageUpload,
  ISocialLink,
  makePath,
  NavigateWithPreviousLocation,
  Patterns,
  SocialProvider,
  textAreaClassName,
  usePreviousLocation,
} from '../../shared';
import { SetupStep } from '../../pages/overlays/artist-profile/ui';
import { ChangeEvent, Fragment, useState } from 'react';
import TextInputField from '../../pages/overlays/artist-profile/social-media-accounts/ui/text-input-field';
import { ProfileProvider } from '../../pages/profile/shared';
import {
  IProfile,
  SearchSpotifyArtist,
  SearchSpotifyTrack,
  useRemoveFavoriteArtist,
  useRemoveFavoriteSong,
  useSaveFavoriteArtist,
  useSaveFavoriteSong,
  useUpdateAvatar,
  useUpdateProfileAndLinks,
} from '../../features';
import {
  isMatchingPattern,
  PatternErrorMessage,
} from '../../pages/overlays/artist-profile/social-media-accounts/ui/social-links.form';
import { ImageUploadContext } from '../../shared/components/image-upload/context';
import { FlatList } from '../../tmp/flat-list';

const MaxFieldLength = {
  FanProfile: {
    Bio: 250,
  },
};

function retrieveSocialLink(
  links: ISocialLink[],
  provider: SocialProvider,
): ISocialLink | undefined {
  const socialLink = links.find((item) => item.provider === provider);

  return socialLink;
}

/**
 * Loading a dialog page without a previous location renders the
 * dialog on top of an empty page. To circumvent this, we provide
 * this component, which takes a previous location to use as a placeholder.
 *
 * @param default
 *
 */
export function LoadWithoutPreviousLocation({
  default: previousLocation,
}: {
  default: string;
}) {
  const location = useLocation();

  if (!location.state?.previousLocation) {
    return (
      <Navigate to={location.pathname} state={{ previousLocation }} />
    );
  }

  return <Fragment />;
}

function ChangeAvatar() {
  const [, setValue] = useState<string>();

  const { updateAvatar } = useUpdateAvatar();

  const { state: profile } = useGeneralContext<IProfile>();

  return (
    <Box w='100px' h='100px' ml={-10}>
      {/* Sneaky way to stop cutting of content*/}
      <ImageUpload
        onChange={async (item) => {
          setValue(URL.createObjectURL(item));
          await updateAvatar(item);
        }}
        title='Update avatar'
        name='avatar'
        placeholder={profile.avatar}
      >
        <ImageUploadContext.Consumer>
          {({ name, src }) => (
            <Avatar
              src={src}
              key={src}
              size={75}
              fallbackTextSize={6}
              fallbackBgColor='rgba(185, 185, 255, 0.30)'
              name='Elena Gilbert'
            >
              <AvatarBadge
                t={-10}
                border={1}
                borderColor='rgba(152, 152, 255, 0.35)'
                size={30}
                bgColor='#232338'
              >
                <Icon color='purple200' name='edit-outline' />
              </AvatarBadge>
            </Avatar>
          )}
        </ImageUploadContext.Consumer>
      </ImageUpload>
    </Box>
  );
}

function EditGeneralUserProfileDialog() {
  const disclosure = useDisclosure(true);
  const navigate = useNavigate();
  const location = useLocation();

  const { username } = useParams();

  const paths = location.pathname.split('/').filter((path) => path.length);
  const currentPath = paths[paths.length - 1];

  if (!username) {
    return <Fragment />;
  }

  return (
    <Fragment>
      <LoadWithoutPreviousLocation default={`/${username}/bio`} />
      <GQLRenderer>
        <ProfileProvider>
          <Dialog
            {...disclosure}
            onClose={() =>
              navigate(location.state?.previousLocation || '/')
            }
          >
            <DialogPortal>
              <DialogOverlay zIndex={15} />
              <DialogContent
                zIndex={20}
                className='setup-account'
                w={881}
                h={724}
                maxHeight='90vh'
                bgColor='#30304B'
                overflow='auto'
                css={{
                  userSelect: 'none',
                }}
              >
                <DialogBody
                  h='100%'
                  zIndex={50}
                  py={0}
                  px={48}
                  id='page-dialog-container'
                >
                  <HStack
                    h='100%'
                    css={{ gap: '48px' }}
                    divider={
                      <StackDivider
                        width={1}
                        color={hexToRGB('#9898FF', 0.1)}
                      />
                    }
                  >
                    <Box py={48} basis={182}>
                      <ChangeAvatar />

                      <VStack gap={6} mt={9}>
                        <SetupStep
                          number={1}
                          path={makePath([username, 'edit', 'profile'])}
                          description='My Profile'
                          active={
                            currentPath === 'profile' ||
                            currentPath === 'favourites' ||
                            currentPath === 'credit-card'
                          }
                        />
                        <SetupStep
                          number={2}
                          path={makePath([username, 'edit', 'favourites'])}
                          description='Add Favourites'
                          active={
                            currentPath === 'favourites' ||
                            currentPath === 'credit-card'
                          }
                        />
                        {/*<SetupStep*/}
                        {/*  number={3}*/}
                        {/*  path={makePath([*/}
                        {/*    username,*/}
                        {/*    'edit',*/}
                        {/*    'credit-card',*/}
                        {/*  ])}*/}
                        {/*  description='Setup Credit Card'*/}
                        {/*  active={currentPath === 'credit-card'}*/}
                        {/*/>*/}
                      </VStack>
                    </Box>

                    <Box py={48} flex={1}>
                      <Outlet />
                    </Box>
                  </HStack>
                </DialogBody>
              </DialogContent>
            </DialogPortal>
          </Dialog>
        </ProfileProvider>
      </GQLRenderer>
    </Fragment>
  );
}

export interface ITinyProfile {
  username: string;
  displayName: string;
  avatar?: string;
  bio?: string;
  location?: string;
}

export interface IUpdateSocialLink {
  X?: string;
  Instagram?: string;
  TikTok?: string;
}

function EditGeneralUserProfileView() {
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');
  const { username } = useParams();
  const { state: profile } = useGeneralContext<IProfile>();

  const { loading, updateProfileAndLinks } = useUpdateProfileAndLinks();

  const [newProfile, updateNewProfile] = useRecordState<ITinyProfile>({
    username: profile.username || '',
    displayName: profile.displayName || '',
    location: profile.location || '',
    bio: profile.bio || '',
  });
  const [newSocialLinks, updateNewSocialLinks] =
    useRecordState<IUpdateSocialLink>({
      X: retrieveSocialLink(profile.socialLinks, 'X')?.url || '',
      Instagram:
        retrieveSocialLink(profile.socialLinks, 'Instagram')?.url || '',
      TikTok: retrieveSocialLink(profile.socialLinks, 'TikTok')?.url || '',
    });

  const nextStep = () => {
    navigate(makePath([username || '', 'edit', 'favourites']), {
      state: {
        previousLocation,
      },
    });
  };

  const handleProfileChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    updateNewProfile({ [e.target.name]: e.target.value });
  };
  const handleSocialLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateNewSocialLinks({ [e.target.name]: e.target.value });
  };

  const isLengthGreaterThanZero = (arr: any | undefined): boolean => {
    if (arr === undefined) {
      return false;
    }
    return arr.length > 0;
  };

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
    newProfile.username,
    Patterns.Username,
    PatternErrorMessage.invalidCharacters(
      'username',
      'alphanumeric characters',
    ),
  );

  return (
    <VStack h='calc(100%)'>
      <VStack overflow='auto' className='thin-scrollbar' gap={6} pr='10px'>
        <TextInputField
          maxLength={25}
          name='username'
          label='Username'
          placeholder='username'
          value={newProfile.username}
          onChange={handleProfileChange}
          errorText={UsernameErrorText}
        />
        <TextInputField
          name='displayName'
          maxLength={75}
          label='Display Name'
          placeholder='Enter your display name'
          value={newProfile.displayName}
          onChange={handleProfileChange}
        />
        <VStack gap={2}>
          <Text color='white700' size={1} as='label' htmlFor='bio'>
            About
          </Text>
          <Box position='relative'>
            <Textarea
              id='bio'
              name='bio'
              className={mergeStyles([
                textAreaClassName(),
                customInputStyles(),
              ])}
              radius={1}
              maxLines={6}
              maxLength={MaxFieldLength.FanProfile.Bio}
              colorTheme='white500'
              placeholder='Let people know a little about yourself and your musical interests.'
              value={newProfile.bio}
              onChange={handleProfileChange}
            />
            <Box
              position='absolute'
              b='8px'
              r='8px'
              fontSize={1}
              color='white800'
            >
              {newProfile.bio?.length}/{MaxFieldLength.FanProfile.Bio}
            </Box>
          </Box>
        </VStack>
        <TextInputField
          name='location'
          maxLength={75}
          label='Based in'
          placeholder='Enter your location'
          value={newProfile.location}
          onChange={handleProfileChange}
        />
        <TextInputField
          name='Instagram'
          label='Instagram URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your Instgram link'
          value={newSocialLinks.Instagram}
          onChange={handleSocialLinkChange}
          errorText={InstagramURLErrorText}
        />
        <TextInputField
          name='TikTok'
          label='TikTok URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your TikTok link'
          value={newSocialLinks.TikTok}
          onChange={handleSocialLinkChange}
          errorText={TikTokURLErrorText}
        />
        <TextInputField
          name='X'
          label='X URL'
          tooltip='Enter your Instagram URL to allow other users to connect with you.'
          placeholder='Enter your X link'
          value={newSocialLinks.X}
          onChange={handleSocialLinkChange}
          errorText={XURLErrorText}
        />
      </VStack>
      <HStack gap={2} justify='flex-end' mt={6} pr='10px'>
        <Button
          disabled={loading}
          onClick={() => navigate(previousLocation)}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Cancel
        </Button>
        <Button
          disabled={
            isLengthGreaterThanZero(TikTokURLErrorText) ||
            isLengthGreaterThanZero(InstagramURLErrorText) ||
            isLengthGreaterThanZero(XURLErrorText)
          }
          isLoading={loading}
          loadingText='Continue'
          onClick={async () => {
            const formattedLinks: ISocialLink[] = (
              Object.keys(newSocialLinks) as SocialProvider[]
            )
              // .filter((name) => newSocialLinks[name]?.length)
              .map((name: SocialProvider) => ({
                provider: name,
                url: newSocialLinks[name] as string,
              }));

            const currentXURL =
              retrieveSocialLink(profile.socialLinks, 'X')?.url || '';
            const currentTikTokURL =
              retrieveSocialLink(profile.socialLinks, 'TikTok')?.url || '';
            const currentInstagramURL =
              retrieveSocialLink(profile.socialLinks, 'Instagram')?.url ||
              '';

            if (
              profile.bio !== newProfile.bio ||
              profile.username !== newProfile.username ||
              profile.location !== newProfile.location ||
              profile.displayName !== newProfile.displayName ||
              currentXURL !== (newSocialLinks.X || '') ||
              currentInstagramURL !== (newSocialLinks.Instagram || '') ||
              currentTikTokURL !== (newSocialLinks.TikTok || '')
            ) {
              await updateProfileAndLinks(newProfile, formattedLinks);
            }

            // update URL if username is updated

            nextStep();
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

function EditGeneralUserAddFavouritesView() {
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

function EditGeneralUserSetupCCView() {
  return <div>credit card</div>;
}

const EditGeneralUserProfileRoutes = () => (
  <Routes>
    <Route element={<EditGeneralUserProfileDialog />}>
      <Route
        path=''
        element={
          <NavigateWithPreviousLocation to='profile' fallback='/' />
        }
      />
      <Route path='profile' element={<EditGeneralUserProfileView />} />
      <Route
        path='favourites'
        element={<EditGeneralUserAddFavouritesView />}
      />
      {/*<Route path='credit-card' element={<EditGeneralUserSetupCCView />} />*/}
    </Route>
  </Routes>
);

export default EditGeneralUserProfileRoutes;
