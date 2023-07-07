import { Dispatch, ReactElement, SetStateAction } from 'react';

export interface ImageUploadProps {
  aspect?: number;
  name: string;
  title: string;
  placeholder?: string;
  children?: ReactElement;
}

export interface CropperDialogFooterProps {
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
}

export interface CropperDialogHeaderProps {
  saveImage: VoidFunction;
  title?: string;
}

export interface CropperDialogBodyProps {
  aspect?: number;
  chosenImage: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  setCroppedAreaPixels: Dispatch<SetStateAction<any>>;
}
