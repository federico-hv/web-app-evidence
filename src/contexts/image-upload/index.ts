import { createContext } from 'react';
import { IImageUploadContext } from './image-upload.types';

const ImageUploadContext = createContext<IImageUploadContext>({
  src: '',
  name: '',
  error: '',
});

const ImageUploadContextProvider = ImageUploadContext.Provider;

export { ImageUploadContext, ImageUploadContextProvider };
