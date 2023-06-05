import { Box, Center, Input, useDisclosure } from '@holdr-ui/react';
import React, { ChangeEvent, useCallback } from 'react';
import { ImageUploadProps } from './image-upload.types';
import {
  CustomDialog1,
  CustomDialog1Body,
  CustomDialog1Footer,
  CustomDialog1Header,
} from '../../dialogs';
import {
  CropperDialogBody,
  CropperDialogFooter,
  CropperDialogHeader,
} from './support';
import { useCroppedImage, useImageUpload } from 'hooks';
import { getCroppedImage } from 'utilities';

function ImageUpload({
  name,
  title,
  children,
  placeholder = '',
}: ImageUploadProps) {
  // used for dialog control
  const { isOpen, onOpen, onClose } = useDisclosure(false);
  // handle updating image file in global form state
  // const [field, _, helpers] = useField(name);
  // const setAvatarValue = helpers.setValue;
  // use hook to control image
  const {
    displayedImage,
    setDisplayedImage,
    imageType,
    chosenImage,
    onChange,
    resetChosenImage,
    // removeDisplayedImage,
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

  // remove the image being used
  // const removeImage = (e: any) => {
  //   e.stopPropagation();
  //   removeDisplayedImage();
  //   // setAvatarValue(null);
  // };

  // save the image
  const saveImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImage(
        chosenImage,
        croppedAreaPixels,
        imageType,
      );
      if (croppedImage) {
        // setAvatarValue(croppedImage.file);
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
      <Box onClick={onOpen} position='relative' overflow='hidden'>
        <Center as='label'>
          {!displayedImage && (
            <Input
              id={name}
              name={name}
              hidden
              type='file'
              css={{ display: 'none' }}
              accept='image/jpeg,image/png'
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                onChange(event);
                onOpen(); // open dialog
              }}
            />
          )}

          {/*{!displayedImage && (*/}
          {/*  <Center fontSize={7}>*/}
          {/*    <Icon name='camera-fill' color='base400' />*/}
          {/*  </Center>*/}
          {/*)}*/}
          {/*</Center>*/}
          {/*{displayedImage && (*/}
          {/*  <Image src={displayedImage} alt='avatar' size={125} />*/}
          {/*)}*/}
          {/*{displayedImage && (*/}
          {/*  <Center*/}
          {/*    bgColor='clearTint300'*/}
          {/*    position='absolute'*/}
          {/*    h='100%'*/}
          {/*    w='100%'*/}
          {/*  >*/}
          {/*    <IconButton*/}
          {/*      type='button'*/}
          {/*      boxShadow='none'*/}
          {/*      colorTheme='darkTint300'*/}
          {/*      icon='close'*/}
          {/*      ariaLabel='remove current image'*/}
          {/*      className={removeButtonCSS()}*/}
          {/*      onClick={removeImage}*/}
          {/*    />*/}
        </Center>

        {children}
      </Box>
      <CustomDialog1 isOpen={isOpen} onClose={closeDialog} onOpen={onOpen}>
        <CustomDialog1Header>
          <CropperDialogHeader title={title} saveImage={saveImage} />
        </CustomDialog1Header>
        <CustomDialog1Body>
          <CropperDialogBody
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
