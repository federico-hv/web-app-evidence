import {
  Box,
  Center,
  Dialog,
  Input,
  useDisclosure,
} from '@holdr-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { ImageUploadProps } from './types/image-upload.types';
import { CropperBody, CropperFooter, CropperHeader } from './ui';
import { ImageUploadContextProvider } from './context';
import { useCroppedImage, useImageUpload } from './hooks';
import { getCroppedImage } from './utilities';

function ImageUpload({
  disabled,
  onChange,
  aspect,
  name,
  title,
  children,
  placeholder = '',
}: ImageUploadProps) {
  // used for dialog control
  const { isOpen, onOpen, onClose } = useDisclosure(false);

  // use hook to control image upload
  const {
    displayedImage,
    setDisplayedImage,
    imageType,
    chosenImage,
    onChange: imageUploadOnChange,
    resetChosenImage,
  } = useImageUpload(placeholder);

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
        if (onChange) onChange(croppedImage.file);
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
    onChange,
    setDisplayedImage,
  ]);

  return (
    <>
      <Box position='relative' overflow='hidden' h='100%' w='100%'>
        <Center h='100%' w='100%' as='label'>
          <Input
            disabled={disabled}
            id={name}
            name={name}
            hidden
            type='file'
            css={{
              display: 'none',
              cursor: disabled ? undefined : 'pointer',
            }}
            accept='image/jpeg,image/png,image/webp'
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              imageUploadOnChange(event);
              event.currentTarget.value = '';
              onOpen(); // open dialog
            }}
          />

          <Center
            fontSize={7}
            position='absolute'
            w='100%'
            h='100%'
            zIndex={50}
          />

          <ImageUploadContextProvider
            value={{
              src: displayedImage,
              name: name,
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
          <Dialog.Overlay zIndex={50} />
          <Dialog.Content
            bgColor='#30304B'
            h={{ '@bp1': 'calc(100vh - 150px)', '@bp3': 575 }}
            maxHeight={{ '@bp1': 'calc(100vh - 100px)', '@bp3': '85vh' }}
            radius={3}
            maxWidth={500}
            t={{ '@bp1': 0, '@bp3': '50%' }}
            w={{ '@bp1': '100vw', '@bp2': '95vw', '@bp3': '90vw' }}
            zIndex={50}
          >
            <Dialog.Header>
              <CropperHeader title={title} saveImage={saveImage} />
            </Dialog.Header>
            <Dialog.Body h={550}>
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
