import { useState } from 'react';

export const useImageUpload = (currentImage: string) => {
  // image state
  const [chosenImage, setChosenImage] = useState('');
  const [displayedImage, setDisplayedImage] = useState(currentImage);
  const [imageType, setImageType] = useState('');

  const resetChosenImage = () => setChosenImage('');
  const removeDisplayedImage = () => setDisplayedImage('');

  const onChange = (event: any) => {
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
