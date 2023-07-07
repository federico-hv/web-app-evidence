import {
  Box,
  Center,
  Circle,
  Icon,
  Input,
  useDisclosure,
} from '@holdr-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { ImageUploadProps } from './image-upload.types';
import {
  CustomDialog1,
  CustomDialog1Body,
  CustomDialog1Footer,
  CustomDialog1Header,
} from '../../dialog';
import {
  CropperDialogBody,
  CropperDialogFooter,
  CropperDialogHeader,
} from './support';
import { useCroppedImage, useImageUpload } from '../../../hooks';
import { getCroppedImage, imageFileToUrl } from '../../../utilities';
import { useField } from 'formik';
import { removeButtonCSS } from './image-upload.styles';
import { ImageUploadContextProvider } from '../../../contexts';

function ImageUpload({
  aspect,
  name,
  title,
  children,
  placeholder = '',
}: ImageUploadProps) {
  // used for dialog control
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  // handle updating image file in global form state
  const [field, meta, helpers] = useField(name);
  const setAvatarValue = helpers.setValue;
  // use hook to control image
  const {
    displayedImage,
    setDisplayedImage,
    imageType,
    chosenImage,
    onChange,
    resetChosenImage,
  } = useImageUpload(imageFileToUrl(field.value) || placeholder);
  // use hook to control cropper
  const {
    zoom,
    setZoom,
    resetZoom,
    setCroppedAreaPixels,
    croppedAreaPixels,
  } = useCroppedImage();

  // close the dialog
  const closeDialog = () => {
    resetChosenImage();
    resetZoom();
    onClose();
  };

  // save the image
  const saveImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage(
        chosenImage,
        croppedAreaPixels,
        imageType,
      );
      if (croppedImage) {
        setAvatarValue(croppedImage.file);
        setDisplayedImage(croppedImage.url);
      }
    } catch (e) {
      console.error(e);
    }
    onClose();

    resetZoom();
  }, [croppedAreaPixels]);

  return (
    <>
      <Box position='relative' overflow='hidden'>
        <Center h='100%' w='100%' as='label'>
          <Input
            id={name}
            name={name}
            hidden
            type='file'
            css={{ display: 'none' }}
            accept='image/jpeg,image/png,image/webp'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              onChange(event);
              onOpen(); // open dialog
            }}
          />

          <Center
            fontSize={7}
            position='absolute'
            w='100%'
            h='100%'
            zIndex={50}
          >
            <Circle
              size={40}
              bgColor='darkTint300'
              className={removeButtonCSS()}
            >
              <Icon
                color='primary400'
                size='base'
                name='camera-fill'
                aria-label='change image'
              />
            </Circle>
          </Center>

          <ImageUploadContextProvider
            value={{
              src: displayedImage,
              name: name,
              error: meta.error,
            }}
          >
            {children}
          </ImageUploadContextProvider>
        </Center>
      </Box>

      <CustomDialog1 isOpen={isOpen} onClose={closeDialog} onOpen={onOpen}>
        <CustomDialog1Header>
          <CropperDialogHeader title={title} saveImage={saveImage} />
        </CustomDialog1Header>
        <CustomDialog1Body>
          <CropperDialogBody
            aspect={aspect}
            setZoom={setZoom}
            zoom={zoom}
            chosenImage={chosenImage}
            setCroppedAreaPixels={setCroppedAreaPixels}
          />
        </CustomDialog1Body>
        <CustomDialog1Footer>
          <CropperDialogFooter setZoom={setZoom} zoom={zoom} />
        </CustomDialog1Footer>
      </CustomDialog1>
    </>
  );
}
export default ImageUpload;
