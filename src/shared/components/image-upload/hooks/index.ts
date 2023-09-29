import { ChangeEvent, useState } from 'react';
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

export const useImageUpload = (currentImage: string) => {
  // image state
  const [chosenImage, setChosenImage] = useState('');
  const [displayedImage, setDisplayedImage] = useState(currentImage);
  const [imageType, setImageType] = useState('');

  const resetChosenImage = () => setChosenImage('');
  const removeDisplayedImage = () => setDisplayedImage('');

  const onChange = (event: ChangeEvent<any>) => {
    const imageUpload = event.target.files[0];
    // manage internal state
    setImageType(imageUpload.type);
    setChosenImage(URL.createObjectURL(imageUpload));
  };

  return {
    displayedImage,
    setDisplayedImage,
    chosenImage,
    imageType,
    onChange,
    resetChosenImage,
    removeDisplayedImage,
  };
};
