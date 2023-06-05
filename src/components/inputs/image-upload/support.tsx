import { ChangeEvent } from 'react';
import { Box, Button, Heading, HStack, Icon } from '@holdr-ui/react';
import { Slider } from './image-upload.styles';
import { ImageCropper } from '../../support';
import {
  CropperDialogBodyProps,
  CropperDialogFooterProps,
  CropperDialogHeaderProps,
} from './image-upload.types';
export function CropperDialogFooter({
  zoom,
  setZoom,
}: CropperDialogFooterProps) {
  return (
    <HStack
      gap={5}
      items='center'
      py={3}
      mx='auto'
      w={{ '@bp1': '95%', '@bp3': '75%' }}
    >
      <Icon name='subtract-line' color='base300' size='xl' />
      <Box flex={1} h='1.5rem'>
        <Slider
          aria-label='zoom in and out of image'
          type='range'
          value={zoom}
          min={1}
          max={3}
          step={0.000001}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setZoom(parseFloat(e.currentTarget.value));
          }}
        />
      </Box>
      <Icon name='add' color='base300' size='xl' />
    </HStack>
  );
}

export function CropperDialogHeader({
  saveImage,
  title,
}: CropperDialogHeaderProps) {
  return (
    <HStack items='center' flex={1} justify='space-between'>
      <Heading casing='capitalize' id='channels-modal__heading' as='h5'>
        {title}
      </Heading>
      <Button onClick={saveImage} size={{ '@bp1': 'sm', '@bp2': 'base' }}>
        Apply
      </Button>
    </HStack>
  );
}

export function CropperDialogBody({
  chosenImage,
  zoom,
  setZoom,
  setCroppedAreaPixels,
}: CropperDialogBodyProps) {
  return (
    <Box w='100%' h={420} position='relative'>
      <ImageCropper
        image={chosenImage}
        zoom={zoom}
        setZoom={setZoom}
        setCroppedAreaPixels={setCroppedAreaPixels}
      />
    </Box>
  );
}
