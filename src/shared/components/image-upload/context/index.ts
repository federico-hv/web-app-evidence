import { createContext } from 'react';
import { IImageUploadContext } from './types';

const ImageUploadContext = createContext<IImageUploadContext>({
  src: '',
  name: '',
});

const ImageUploadContextProvider = ImageUploadContext.Provider;

export { ImageUploadContext, ImageUploadContextProvider };
