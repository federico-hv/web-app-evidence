import { Box, Center, Icon, Image } from '@holdr-ui/react';
import { useClubContext, useUpdateClub } from '../../../../../features';
import { Fragment, useState } from 'react';
import { ImageUpload } from '../../../../../shared';
import { ImageUploadContext } from '../../../../../shared/components/image-upload/context';

function ChangeClubBannerImage() {
  const club = useClubContext();

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
        placeholder={club.bannerImage}
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

export default ChangeClubBannerImage;
