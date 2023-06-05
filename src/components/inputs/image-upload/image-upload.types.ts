import { Dispatch, ReactNode, SetStateAction } from 'react';

export interface ImageUploadProps {
  name: string;
  title: string;
  placeholder?: string;
  children?: ReactNode;
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
  chosenImage: string;
  zoom: number;
  setZoom: Dispatch<SetStateAction<number>>;
  setCroppedAreaPixels: Dispatch<SetStateAction<any>>;
}
