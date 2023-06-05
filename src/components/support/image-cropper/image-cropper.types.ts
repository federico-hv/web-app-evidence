import { Dispatch, SetStateAction } from 'react';

export interface ImageCropperProps {
  image?: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  setCroppedAreaPixels: Dispatch<SetStateAction<any>>;
}
