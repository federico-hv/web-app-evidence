import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { ImageCropperProps } from './image-cropper.types';

function ImageCropper({
  image,
  zoom,
  setZoom,
  setCroppedAreaPixels,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [],
  );

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1}
      showGrid={false}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}
ImageCropper.displayName = 'ImageCropper';

export default ImageCropper;
