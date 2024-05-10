import { ChangeEvent } from 'react';
import { Box, HStack, Icon } from '@holdr-ui/react';
import { Slider } from '../styles/image-upload.styles';
import { CropperFooterProps } from '../types/image-upload.types';

function CropperFooter({ zoom, setZoom }: CropperFooterProps) {
  return (
    <HStack
      gap={5}
      items='center'
      py={3}
      mx='auto'
      w={{ '@bp1': '95%', '@bp3': '75%' }}
    >
      <Icon name='subtract-line' color='base300' size='lg' />
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
      <Icon name='add' color='base300' size='lg' />
    </HStack>
  );
}
CropperFooter.displayName = 'CropperFooter';

export default CropperFooter;
