import { Fragment, useState } from 'react';
import { Avatar, Box, Center, hexToRGB, Icon } from '@holdr-ui/react';
import { ImageUpload, Squircle } from '../../../../../shared';
import {
  useCurrentArtist,
  useSuspenseGetArtist,
  useUpdateAvatar,
} from '../../../../../features';
import { ImageUploadContext } from '../../../../../shared/components/image-upload/context';

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
  const currentArtist = useCurrentArtist();

  const { data: artistData } = useSuspenseGetArtist({
    id: currentArtist?.id,
  });

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
        placeholder={artistData.artist.avatar}
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
ChangeProfileAvatar.displayName = 'ChangeProfileAvatar';

export default ChangeProfileAvatar;
