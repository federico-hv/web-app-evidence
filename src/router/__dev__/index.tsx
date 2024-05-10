import {
  Avatar,
  Box,
  Circle,
  Icon,
  Input,
  Square,
  VStack,
} from '@holdr-ui/react';
import { Route, Routes } from 'react-router';
import { imageFileToUrl } from '../../shared/components/image-upload/utilities';
import { ImageUploadContext } from '../../shared/components/image-upload/context';
import { ChangeEvent, Fragment, useState } from 'react';
import { ImageUpload } from '../../shared';

function ImageUploadTest() {
  const [value, setValue] = useState<string>();

  return (
    <VStack p={4} gap={6}>
      <Box>Image upload test</Box>
      <Box w='fit-content'>
        <ImageUpload
          onChange={(item) => {
            setValue(URL.createObjectURL(item));
          }}
          title='Update avatar'
          name='avatar'
          // placeholder={profile.avatar}
        >
          <ImageUploadContext.Consumer>
            {({ name, src }) => (
              <Fragment>
                {!src ? (
                  <Square radius={2} size={75} bgColor='purple800'>
                    <Circle size={24} bgColor='purple900'>
                      <Icon name='add' size='lg' />
                    </Circle>
                  </Square>
                ) : (
                  <Avatar
                    key={src}
                    variant='squircle'
                    src={src}
                    css={{ size: 75 }}
                  />
                )}
              </Fragment>
            )}
          </ImageUploadContext.Consumer>
        </ImageUpload>

        {/*<Square*/}
        {/*  as='label'*/}
        {/*  radius={2}*/}
        {/*  size={75}*/}
        {/*  bgColor='purple800'*/}
        {/*  position='relative'*/}
        {/*>*/}
        {/*  <Input*/}
        {/*    accept='image/*'*/}
        {/*    onChange={(e: ChangeEvent<any>) => {*/}
        {/*      const upload = e.target.files[0];*/}

        {/*      setValue(URL.createObjectURL(upload));*/}
        {/*    }}*/}
        {/*    type='file'*/}
        {/*    hidden*/}
        {/*  />*/}
        {/*  {!value ? (*/}
        {/*    <Circle size={24} bgColor='purple900'>*/}
        {/*      <Icon name='add' size='lg' />*/}
        {/*    </Circle>*/}
        {/*  ) : (*/}
        {/*    <Avatar key={value} src={value} />*/}
        {/*  )}*/}
        {/*</Square>*/}
      </Box>
    </VStack>
  );
}

export const DevRoutes = () => (
  <Routes>
    <Route path='image-upload' element={<ImageUploadTest />} />
  </Routes>
);
