import React, { useCallback, useState } from 'react';
import Cropper from 'react-easy-crop';
import { ImageCropperProps } from '../types/image-cropper.types';

function ImageCropper({
  image,
  zoom,
  setZoom,
  setCroppedAreaPixels,
  aspect = 1,
}: ImageCropperProps) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback(
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    [setCroppedAreaPixels],
  );

  return (
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspect}
      showGrid={false}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
}
ImageCropper.displayName = 'ImageCropper';

export default ImageCropper;
