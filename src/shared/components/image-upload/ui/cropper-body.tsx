import { CropperBodyProps } from '../types/image-upload.types';
import { Box } from '@holdr-ui/react';
import ImageCropper from './image-cropper';

function CropperBody({
  aspect = 1,
  chosenImage,
  zoom,
  setZoom,
  setCroppedAreaPixels,
}: CropperBodyProps) {
  return (
    <Box w='100%' h={'calc(100% - 100px)'} position='relative'>
      <ImageCropper
        aspect={aspect}
        image={chosenImage}
        zoom={zoom}
        setZoom={setZoom}
        setCroppedAreaPixels={setCroppedAreaPixels}
      />
    </Box>
  );
}
CropperBody.displayName = 'CropperBody';

export default CropperBody;
