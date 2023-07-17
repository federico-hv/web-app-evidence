import { createContext } from 'react';
import { IImageUploadContext } from './types';

const ImageUploadContext = createContext<IImageUploadContext>({
  src: '',
  name: '',
  error: '',
});

const ImageUploadContextProvider = ImageUploadContext.Provider;

export { ImageUploadContext, ImageUploadContextProvider };
