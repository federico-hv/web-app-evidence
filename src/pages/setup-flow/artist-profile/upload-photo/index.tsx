import { useNavigate } from 'react-router-dom';
import {
  ImageUpload,
  LiveTag,
  makePath,
  Paths,
  Squircle,
  TextGroup,
  TextGroupHeading,
  TextGroupSubheading,
} from '../../../../shared';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  Center,
  hexToRGB,
  HStack,
  Icon,
  IconButton,
  Image,
  Text,
  useGeneralContext,
  VStack,
} from '@holdr-ui/react';
import { Fragment, useState } from 'react';
import { ImageUploadContext } from '../../../../shared/components/image-upload/context';
import {
  IClub,
  useUpdateClub,
  useUpdateAvatar,
} from '../../../../features';

function AvatarPlaceholder() {
  return (
    <Box as='label' w='fit-content' h='fit-content' position='relative'>
      <Squircle size={75} />
      <Center
        position='absolute'
        t={0}
        l={0}
        w='100%'
        h='100%'
        _hover={{
          '&:hover .image-add-icon': {
            backgroundColor: hexToRGB('#1A1A29', 0.5),
          },
        }}
      >
        <Center
          className='image-add-icon'
          p={1}
          bgColor='#1A1A29'
          radius='full'
        >
          <Icon color='white500' name='add' />
        </Center>
      </Center>
    </Box>
  );
}

function ChangeProfileAvatar() {
  const { state } = useGeneralContext<IClub>();

  const { updateAvatar } = useUpdateAvatar();

  const [, setValue] = useState<string>();

  return (
    <Box h='fit-content' w='fit-content'>
      <ImageUpload
        onChange={async (item) => {
          setValue(URL.createObjectURL(item));
          await updateAvatar(item);
        }}
        title='Update avatar'
        name='avatar'
        placeholder={state.artist.avatar}
      >
        <ImageUploadContext.Consumer>
          {({ name, src }) => (
            <Fragment>
              {!src ? (
                <AvatarPlaceholder />
              ) : (
                <Avatar
                  variant='squircle'
                  src={src}
                  key={src}
                  css={{ size: 75 }}
                />
              )}
            </Fragment>
          )}
        </ImageUploadContext.Consumer>
      </ImageUpload>
    </Box>
  );
}

function ChangeClubImage() {
  const { state } = useGeneralContext<IClub>();

  const { updateClub } = useUpdateClub();

  const [, setValue] = useState<string>();

  return (
    <Card
      radius={2}
      w={205}
      css={{ border: '1px solid rgba(152, 152, 255, 0.15)' }}
    >
      <CardBody
        position='relative'
        h={182}
        bgColor='rgba(152, 152, 255, 0.15)'
      >
        <HStack
          position='absolute'
          t={0}
          l={0}
          r={0}
          p={2}
          zIndex={20}
          items='center'
          justify='space-between'
        >
          <LiveTag />
          <IconButton
            size='sm'
            colorTheme='darkTint500'
            icon='eye-show'
            ariaLabel='add to watchlist'
          />
        </HStack>
        <ImageUpload
          aspect={1.12}
          onChange={async (item) => {
            setValue(URL.createObjectURL(item));
            await updateClub({ coverImage: item });
          }}
          title='Edit auction image'
          name='coverImage'
          placeholder={state.coverImage}
        >
          <ImageUploadContext.Consumer>
            {({ src }) => (
              <Fragment>
                {!src ? (
                  <Center position='relative'>
                    <Center
                      position='absolute'
                      t={0}
                      l={0}
                      w='100%'
                      h='100%'
                    >
                      <Center
                        className='image-add-icon'
                        p={1}
                        bgColor='#1A1A29'
                        radius='full'
                      >
                        <Icon color='white500' name='add' />
                      </Center>
                    </Center>
                  </Center>
                ) : (
                  <Box id='imagess' h='100%' w='100%'>
                    <Image
                      fallback={<Fragment />}
                      alt='clubs banner image'
                      key={src}
                      src={src}
                    />
                  </Box>
                )}
              </Fragment>
            )}
          </ImageUploadContext.Consumer>
        </ImageUpload>
      </CardBody>
      <CardFooter p={3} gap={2}>
        <Text>Artist name</Text>
        <TextGroup gap={0}>
          <TextGroupSubheading casing='uppercase' size={1}>
            Entry price
          </TextGroupSubheading>
          <TextGroupSubheading size={3} weight={500}>
            $0.00 USD
          </TextGroupSubheading>
        </TextGroup>
      </CardFooter>
    </Card>
  );
}

function ChangeClubBannerImage() {
  const { state } = useGeneralContext<IClub>();

  const [, setValue] = useState<string>();

  const { updateClub } = useUpdateClub();

  return (
    <Box
      w='full'
      h={148}
      overflow='hidden'
      radius={2}
      bgColor='rgba(152, 152, 255, 0.15)'
      css={{ border: '1px solid rgba(152, 152, 255, 0.15)' }}
    >
      <ImageUpload
        aspect={2}
        onChange={async (item) => {
          setValue(URL.createObjectURL(item));
          await updateClub({ bannerImage: item });
        }}
        title='Edit banner image'
        name='bannerImage'
        placeholder={state.bannerImage}
      >
        <ImageUploadContext.Consumer>
          {({ src }) => (
            <Fragment>
              {!src ? (
                <Center position='relative'>
                  <Center
                    position='absolute'
                    t={0}
                    l={0}
                    w='100%'
                    h='100%'
                  >
                    <Center
                      className='image-add-icon'
                      p={1}
                      bgColor='#1A1A29'
                      radius='full'
                    >
                      <Icon color='white500' name='add' />
                    </Center>
                  </Center>
                </Center>
              ) : (
                <Box id='imagess' h='100%' w='100%'>
                  <Image
                    fallback={<Fragment />}
                    alt='clubs banner image'
                    key={src}
                    src={src}
                  />
                </Box>
              )}
            </Fragment>
          )}
        </ImageUploadContext.Consumer>
      </ImageUpload>
    </Box>
  );
}

function UploadPhotoView() {
  const navigate = useNavigate();

  return (
    <VStack gap={9} pl={2} h='100%'>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Profile</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image for your profile photo
          </TextGroupSubheading>
        </TextGroup>
        <ChangeProfileAvatar />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Auction Card</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add an image that will be visible for your fans on the Clubs
            page
          </TextGroupSubheading>
        </TextGroup>
        <ChangeClubImage />
      </VStack>
      <VStack gap={4}>
        <TextGroup gap={0}>
          <TextGroupHeading size={4}>Banner</TextGroupHeading>
          <TextGroupSubheading size={1} color='white700'>
            Add a banner image that willy be displayed on your member’s
            page
          </TextGroupSubheading>
        </TextGroup>
        <ChangeClubBannerImage />
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
                Paths.setupArtist.aboutMeAndPerks,
              ]),
            )
          }
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
UploadPhotoView.displayName = 'UploadPhotoView';

export default UploadPhotoView;
