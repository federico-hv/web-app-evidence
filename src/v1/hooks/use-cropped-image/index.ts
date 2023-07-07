import { useState } from 'react';
export const useCroppedImage = () => {
  // cropped image state
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const resetZoom = () => setZoom(1);

  return {
    zoom,
    setZoom,
    resetZoom,
    setCroppedAreaPixels,
    croppedAreaPixels,
  };
};
