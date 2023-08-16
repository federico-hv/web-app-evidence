import {
  Box,
  Center,
  Circle,
  Dialog,
  Icon,
  Input,
  useDisclosure,
} from '@holdr-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { ImageUploadProps } from './types/image-upload.types';
import { CropperBody, CropperFooter, CropperHeader } from './ui';
import { useField } from 'formik';
import { removeButtonCSS } from './styles/image-upload.styles';
import { ImageUploadContextProvider } from './context';
import { useCroppedImage, useImageUpload } from './hooks';
import { getCroppedImage, imageFileToUrl } from './utilities';

function ImageUpload({
  aspect,
  name,
  title,
  children,
  placeholder = '',
}: ImageUploadProps) {
  // used for dialog control
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  // handle updating image file in global form-input state
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
  }, [
    onClose,
    resetZoom,
    chosenImage,
    croppedAreaPixels,
    imageType,
    setAvatarValue,
    setDisplayedImage,
  ]);

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

      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        onOpen={onOpen}
        ariaDescribedBy='channels-modal__heading'
      >
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content
            h={{ '@bp1': 'calc(100vh - 150px)', '@bp3': 650 }}
            maxHeight={{ '@bp1': 'calc(100vh - 100px)', '@bp3': '85vh' }}
            radius={3}
            maxWidth={650}
            t={{ '@bp1': 0, '@bp3': '50%' }}
            w={{ '@bp1': '100vw', '@bp2': '95vw', '@bp3': '90vw' }}
          >
            <Dialog.Header>
              <CropperHeader title={title} saveImage={saveImage} />
            </Dialog.Header>
            <Dialog.Body>
              <CropperBody
                aspect={aspect}
                setZoom={setZoom}
                zoom={zoom}
                chosenImage={chosenImage}
                setCroppedAreaPixels={setCroppedAreaPixels}
              />
            </Dialog.Body>
            <Dialog.Footer>
              <CropperFooter setZoom={setZoom} zoom={zoom} />
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
}
export default ImageUpload;
