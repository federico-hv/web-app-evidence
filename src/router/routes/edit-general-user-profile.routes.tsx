import { Route, Routes } from 'react-router';
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Dialog,
  DialogBody,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  hexToRGB,
  HStack,
  Icon,
  mergeStyles,
  StackDivider,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from '@holdr-ui/react';
import {
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import {
  customInputStyles,
  makePath,
  NavigateWithPreviousLocation,
  textAreaClassName,
  usePreviousLocation,
} from '../../shared';
import { SetupStep } from '../../pages/setup-flow/artist-profile/ui';
import { Fragment } from 'react';
import TextInputField from '../../pages/setup-flow/artist-profile/social-media-accounts/ui/text-input-field';

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
    <Dialog
      {...disclosure}
      onClose={() => navigate(location.state?.previousLocation || '/')}
    >
      <DialogPortal>
        <DialogOverlay zIndex={20} />
        <DialogContent
          zIndex={20}
          className='setup-account'
          w={881}
          h={724}
          maxHeight='90vh'
          bgColor='#30304B'
          overflow='auto'
        >
          <DialogBody h='100%' zIndex={50} py={0} px={48}>
            <HStack
              h='100%'
              css={{ gap: '48px' }}
              divider={
                <StackDivider width={1} color={hexToRGB('#9898FF', 0.1)} />
              }
            >
              <Box py={48} basis={182}>
                <Avatar
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
                <VStack gap={6} mt={9}>
                  <SetupStep
                    number={1}
                    path={makePath([username, 'edit', 'profile'])}
                    description='Profile'
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
                  <SetupStep
                    number={3}
                    path={makePath([username, 'edit', 'credit-card'])}
                    description='Setup Credit Card'
                    active={currentPath === 'credit-card'}
                  />
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
  );
}

function EditGeneralUserProfileView() {
  const { username } = useParams();
  const navigate = useNavigate();
  const previousLocation = usePreviousLocation('/');

  const nextStep = () => {
    navigate(makePath([username || '', 'edit', 'favourites']), {
      state: {
        previousLocation,
      },
    });
  };

  return (
    <VStack h='calc(100%)'>
      <VStack overflow='auto' className='thin-scrollbar' gap={6} pr='10px'>
        <TextInputField
          name='username'
          label='Username'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='@username'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <TextInputField
          name='displayName'
          label='Display Name'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your display name'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <VStack gap={2}>
          <Text color='white700' size={1} as='label' htmlFor='about'>
            About
          </Text>
          <Box position='relative'>
            <Textarea
              id='about'
              className={mergeStyles([
                textAreaClassName(),
                customInputStyles(),
              ])}
              radius={2}
              maxLines={5}
              maxLength={150}
              colorTheme='white500'
              placeholder='Share your story with your fans'
              /*_placeholder={{}}*/
              /*css={{}}*/
            />
            <Box
              position='absolute'
              t='4px'
              r='8px'
              fontSize={1}
              color='white800'
            >
              0/150
            </Box>
          </Box>
        </VStack>
        <TextInputField
          name='location'
          label='Based in'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your location'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <TextInputField
          name='instagramURL'
          label='Instagram URL'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your Instgram link'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <TextInputField
          name='tiktokURL'
          label='TikTok URL'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your TikTok link'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <TextInputField
          name='xURL'
          label='X URL'
          // value={state.links.instagramURL}
          // tooltip='Enter your Instagram URL for your fans to connect with you'
          placeholder='Enter your X link'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
      </VStack>
      <HStack gap={2} justify='flex-end' mt={6} pr='10px'>
        <Button
          onClick={() => navigate(previousLocation)}
          variant='ghost'
          radius={1}
          colorTheme='purple200'
          css={{ px: '28px' }}
        >
          Cancel
        </Button>
        <Button
          onClick={nextStep}
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

  const nextStep = () => {
    navigate(makePath([username || '', 'edit', 'credit-card']), {
      state: {
        previousLocation,
      },
    });
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
        <TextInputField
          name='favoriteSong'
          label='Favorite Song'
          // value={state.links.instagramURL}
          tooltip='Search for your favorite song on Spotify and share it on you Bio page for others to see.'
          placeholder='Search for song on Spotify'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
        <TextInputField
          name='favouriteMusician'
          label='Favourite Musician'
          // value={state.links.instagramURL}
          tooltip='Search for your favorite artists on Spotify and share it on you Bio page for others to see.'
          placeholder='Search for Spotify artist'
          // onChange={handleOnChange}
          // errorText={isPlatformURL(
          //   'instagramURL',
          //   state.links.instagramURL,
          // )}
        />
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
          Continue
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
      <Route path='credit-card' element={<EditGeneralUserSetupCCView />} />
    </Route>
  </Routes>
);

export default EditGeneralUserProfileRoutes;
